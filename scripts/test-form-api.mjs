// Only rejection paths. Refuse public hosts; no email should ever be sent.
import assert from 'node:assert/strict';
import {setTimeout} from 'node:timers/promises';
const base = process.argv[2] || 'http://localhost:3012';
assert.ok(['localhost', '127.0.0.1'].includes(new URL(base).hostname), 'Local test server only');
const post = (kind, ip, body) => fetch(`${base}/api/${kind}-inquiry`, {
  method: 'POST', headers: {'content-type': 'application/json', 'x-form-test-ip': ip}, body: typeof body === 'string' ? body : JSON.stringify(body)
});
let number = 10;
for (const kind of ['patient', 'partner']) {
  const ip = `192.0.2.${number++}`;
  const challenge = await fetch(`${base}/api/${kind}-inquiry`, {headers: {'x-form-test-ip': ip}});
  assert.equal(challenge.status, 200);
  assert.match(challenge.headers.get('cache-control'), /no-store/);
  const {token} = await challenge.json();
  assert.equal((await post(kind, ip, {formToken: token, companyFax: ''})).status, 400, 'Too fast or incomplete, no email');
  await setTimeout(3100);
  assert.equal((await post(kind, ip, {formToken: token, companyFax: 'bot'})).status, 400, 'Honeypot');
  assert.equal((await post(kind, ip, {formToken: token, companyFax: '', notes: 'disallowed', email: 'invalid'})).status, 400, 'Unknown field / invalid email');
  assert.equal((await post(kind, ip, '{broken')).status, 400, 'Malformed JSON');
  assert.equal((await post(kind, ip, {formToken: token, companyFax: ''})).status, 400, 'Missing contact data and consent');
  const limited = await post(kind, ip, {});
  assert.equal(limited.status, 429);
  assert.ok(Number(limited.headers.get('retry-after')) > 0);
  console.log(`PASS ${kind}: challenge, rejection cases and HTTP 429. No valid submission sent.`);
}
