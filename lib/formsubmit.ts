// Existing delivery provider; use only server-side after all form validation.
// Fixed public origin: do not forward user-controlled Referer/Origin headers,
// query parameters, guard tokens or other request metadata to the provider.
const FORM_SITE = "https://cell-clinics.com/";

export async function sendViaFormSubmit(fields: Record<string, string | undefined>, subject: string, replyTo: string) {
  try {
    const response = await fetch("https://formsubmit.co/ajax/info@cell-education.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", Accept: "application/json",
        Origin: "https://cell-clinics.com", Referer: FORM_SITE
      },
      signal: AbortSignal.timeout(15000),
      body: JSON.stringify({
        ...Object.fromEntries(Object.entries(fields).filter(([, value]) => value !== undefined && value !== "")),
        _subject: subject, _replyto: replyTo, _template: "table", _captcha: "false",
        // FormSubmit requires the form URL when no browser referrer is present:
        // https://formsubmit.co/help ("Unable to submit form").
        _url: FORM_SITE
      })
    });
    if (!response.ok) {
      console.error("Form delivery failed", {provider: "formsubmit", reason: "http", status: response.status});
      return false;
    }
    const result = await response.json() as {success?: boolean | string; message?: string};
    // An activation request is not a confirmed inquiry delivery.
    if (/activat|confirm/i.test(result.message || "")) {
      console.error("Form delivery failed", {provider: "formsubmit", reason: "activation-required"});
      return false;
    }
    const accepted = result.success === true || result.success === "true";
    if (!accepted) {
      // Fixed diagnostic codes only; never log contact data or raw responses.
      const reason = /web server|HTML files/i.test(result.message || "") ? "missing-form-url" : "not-acknowledged";
      console.error("Form delivery failed", {provider: "formsubmit", reason});
    }
    return accepted;
  } catch {
    console.error("Form delivery failed", {provider: "formsubmit", reason: "network-or-response"});
    return false;
  }
}
