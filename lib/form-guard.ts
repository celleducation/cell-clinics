import {createHmac, randomBytes, timingSafeEqual} from "node:crypto";
import {isIP} from "node:net";

export type FormKind = "patient" | "partner";
export const MIN_FILL_MS = 3000;
export const TOKEN_TTL_MS = 24 * 60 * 60 * 1000;
const WINDOW_MS = 60 * 60 * 1000;

// Shared by both routes within a Node process. Not a distributed Vercel quota:
// replicas/cold starts need a shared, first-party store before a global limit
// can be claimed. No IP addresses or form contents are retained here.
export class FormRateLimiter {
  private entries = new Map<string, {count: number; expires: number}>();
  private capacity: number;
  constructor(capacity = 10000) { this.capacity = capacity; }

  take(key: string, limit: number, now = Date.now()) {
    for (const [entryKey, entry] of this.entries) {
      if (entry.expires <= now) this.entries.delete(entryKey);
    }
    const entry = this.entries.get(key);
    if (entry) {
      if (entry.count >= limit) return Math.ceil((entry.expires - now) / 1000);
      entry.count += 1;
      return 0;
    }
    if (this.entries.size >= this.capacity) return 60; // Fail closed, no eviction bypass.
    this.entries.set(key, {count: 1, expires: now + WINDOW_MS});
    return 0;
  }
}

const globals = globalThis as typeof globalThis & {cellFormLimiter?: FormRateLimiter; cellFormDevSecret?: string};
const limiter = globals.cellFormLimiter ??= new FormRateLimiter();

function secret() {
  const configured = process.env.FORM_GUARD_SECRET || process.env.RESEND_API_KEY;
  if (configured && configured.length >= 32) return configured;
  if (process.env.NODE_ENV === "production") throw new Error("Form guard secret missing");
  return globals.cellFormDevSecret ??= randomBytes(32).toString("hex");
}

export function clientIp(headers: Headers) {
  // Trust only a header overwritten by the configured ingress, never arbitrary
  // x-forwarded-for supplied by a client to an unprotected Node server.
  const header = process.env.VERCEL === "1" ? "x-forwarded-for" : process.env.FORM_TRUSTED_IP_HEADER;
  if (!header) {
    if (process.env.NODE_ENV !== "production") return "127.0.0.1";
    throw new Error("Trusted client IP header missing");
  }
  const ip = headers.get(header)?.trim() || "";
  if (!isIP(ip)) throw new Error("Invalid trusted client IP");
  return ip;
}

function digest(value: string, key: string) {
  return createHmac("sha256", key).update(`cell-clinics-form-v1:${value}`).digest("hex");
}

export function issueFormToken(kind: FormKind, ip: string, key: string, now = Date.now()) {
  const payload = `${kind}.${now}.${randomBytes(16).toString("hex")}`;
  return `${payload}.${digest(`${payload}:${ip}`, key)}`;
}

export function verifyFormToken(token: unknown, kind: FormKind, ip: string, key: string, now = Date.now()) {
  if (typeof token !== "string" || token.length > 200) return false;
  const parts = token.split(".");
  if (parts.length !== 4 || parts[0] !== kind || !/^\d{13}$/.test(parts[1]) || !/^[a-f0-9]{32}$/.test(parts[2]) || !/^[a-f0-9]{64}$/.test(parts[3])) return false;
  const age = now - Number(parts[1]);
  if (age < MIN_FILL_MS || age > TOKEN_TTL_MS) return false;
  const expected = digest(`${parts.slice(0, 3).join(".")}:${ip}`, key);
  return timingSafeEqual(Buffer.from(parts[3], "hex"), Buffer.from(expected, "hex"));
}

function failure(status: number, retryAfter?: number) {
  return Response.json({error: status === 429 ? "Too many requests" : "Submission could not be verified"}, {
    status, headers: {"Cache-Control": "no-store", ...(retryAfter ? {"Retry-After": String(retryAfter)} : {})}
  });
}

export function formChallenge(request: Request, kind: FormKind) {
  try {
    const ip = clientIp(request.headers);
    const key = secret();
    const retry = limiter.take(`challenge:${digest(ip, key)}`, 30);
    if (retry) return failure(429, retry);
    return Response.json({token: issueFormToken(kind, ip, key)}, {headers: {"Cache-Control": "no-store"}});
  } catch {
    return failure(503);
  }
}

export function checkFormSubmission(request: Request, data: unknown, kind: FormKind): Response | null {
  try {
    const ip = clientIp(request.headers);
    const key = secret();
    const retry = limiter.take(`submit:${digest(ip, key)}`, 5);
    if (retry) return failure(429, retry);
    if (!data || typeof data !== "object" || Array.isArray(data)) return failure(400);
    const fields = data as Record<string, unknown>;
    if (fields.companyFax !== "" || !verifyFormToken(fields.formToken, kind, ip, key)) return failure(400);
    return null;
  } catch {
    return failure(503);
  }
}

export async function readFormBody(request: Request): Promise<unknown> {
  if (!request.headers.get("content-type")?.startsWith("application/json")) return null;
  const reader = request.body?.getReader();
  if (!reader) return null;
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const {done, value} = await reader.read();
      if (done) break;
      size += value.length;
      if (size > 16384) { await reader.cancel(); return null; }
      chunks.push(value);
    }
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return null;
  } finally {
    reader.releaseLock();
  }
}
