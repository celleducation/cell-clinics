// Existing delivery provider; use only server-side after all form validation.
export async function sendViaFormSubmit(fields: Record<string, string | undefined>, subject: string, replyTo: string) {
  try {
    const response = await fetch("https://formsubmit.co/ajax/info@cell-education.com", {
      method: "POST",
      headers: {"Content-Type": "application/json", Accept: "application/json"},
      signal: AbortSignal.timeout(15000),
      body: JSON.stringify({
        ...Object.fromEntries(Object.entries(fields).filter(([, value]) => value !== undefined && value !== "")),
        _subject: subject, _replyto: replyTo, _template: "table", _captcha: "false"
      })
    });
    if (!response.ok) return false;
    const result = await response.json() as {success?: boolean | string; message?: string};
    // An activation request is not a confirmed inquiry delivery.
    if (/activat|confirm/i.test(result.message || "")) return false;
    return result.success === true || result.success === "true";
  } catch {
    return false;
  }
}
