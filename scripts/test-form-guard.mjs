// Pure local tests; no requests to a mail service or production website.
import assert from 'node:assert/strict';
import {FormRateLimiter, issueFormToken, verifyFormToken, MIN_FILL_MS, TOKEN_TTL_MS, clientIp, checkFormSubmission, readFormBody} from '../lib/form-guard.ts';
import {partnerInquirySchema} from '../lib/partner-inquiry.ts';

const key = 'local-test-secret-not-a-production-secret';
const ip = '192.0.2.1';
const now = 1789725000000;
for (const kind of ['partner', 'patient']) {
  const token = issueFormToken(kind, ip, key, now);
  assert.equal(verifyFormToken(token, kind, ip, key, now + MIN_FILL_MS - 1), false);
  assert.equal(verifyFormToken(token, kind, ip, key, now + MIN_FILL_MS), true);
  assert.equal(verifyFormToken(token, kind, ip, key, now - 1), false);
  assert.equal(verifyFormToken(token, kind, ip, key, now + TOKEN_TTL_MS + 1), false);
  assert.equal(verifyFormToken(token, kind, '192.0.2.2', key, now + 5000), false);
  assert.equal(verifyFormToken(token, kind === 'partner' ? 'patient' : 'partner', ip, key, now + 5000), false);
  assert.equal(verifyFormToken(token, kind, ip, 'wrong-secret', now + 5000), false);
  assert.equal(verifyFormToken(token.replace(String(now), String(now - 60000)), kind, ip, key, now + 5000), false);
  for (const invalid of ['', null, {}, 'x'.repeat(1000), 'patient.123.a.b']) assert.equal(verifyFormToken(invalid, kind, ip, key, now), false);
}
const limits = new FormRateLimiter(2);
for (let i = 0; i < 5; i++) assert.equal(limits.take('ip-a', 5, now), 0);
assert.equal(limits.take('ip-a', 5, now), 3600);
assert.equal(limits.take('ip-b', 5, now), 0);
assert.equal(limits.take('ip-c', 5, now), 60, 'Do not evict counters under load');
assert.equal(limits.take('ip-a', 5, now + 3600000), 0);

const partner = {clinicName: 'Test Practice', country: 'Germany', clinicType: 'Practice', profession: 'Physician', primaryContact: 'Test Person', email: 'test@example.invalid', consent: 'on', companyFax: '', formToken: 'schema-only'};
assert.equal(partnerInquirySchema.safeParse(partner).success, true);
for (const field of ['notes', 'symptoms', 'complaints', 'message', 'diagnosis', 'medication']) assert.equal(partnerInquirySchema.safeParse({...partner, [field]: 'rejected'}).success, false);
for (const consent of [undefined, '', 'off', true, false]) assert.equal(partnerInquirySchema.safeParse({...partner, consent}).success, false);
assert.equal(partnerInquirySchema.safeParse({...partner, companyFax: 'bot'}).success, false);
assert.equal(partnerInquirySchema.safeParse({...partner, formToken: ''}).success, false);

process.env.NODE_ENV = 'production';
process.env.FORM_GUARD_SECRET = key;
process.env.VERCEL = '1';
assert.equal(clientIp(new Headers({'x-forwarded-for': ip})), ip);
assert.throws(() => clientIp(new Headers({'x-forwarded-for': '192.0.2.1, 192.0.2.2'})));
assert.throws(() => clientIp(new Headers()));
for (const kind of ['partner', 'patient']) {
  const request = new Request('https://example.invalid/api', {headers: {'x-forwarded-for': kind === 'patient' ? '192.0.2.3' : ip}});
  const client = kind === 'patient' ? '192.0.2.3' : ip;
  const token = issueFormToken(kind, client, key, Date.now() - 5000);
  assert.equal(checkFormSubmission(request, {companyFax: '', formToken: token}, kind), null);
  assert.equal(checkFormSubmission(request, {companyFax: 'bot', formToken: token}, kind).status, 400);
  assert.equal(checkFormSubmission(request, {formToken: token}, kind).status, 400);
  assert.equal(checkFormSubmission(request, {companyFax: '', formToken: ''}, kind).status, 400);
}
delete process.env.VERCEL;
delete process.env.FORM_TRUSTED_IP_HEADER;
assert.throws(() => clientIp(new Headers({'x-forwarded-for': ip})), 'Ignore untrusted forwarded header');
const bodyRequest = body => new Request('https://example.invalid', {method: 'POST', headers: {'content-type': 'application/json'}, body});
assert.equal(await readFormBody(bodyRequest('{bad')), null);
assert.equal(await readFormBody(bodyRequest(JSON.stringify({large: 'a'.repeat(20000)}))), null);
assert.deepEqual(await readFormBody(bodyRequest('{"ok":true}')), {ok: true});
console.log('PASS: both form kinds, signed timing/IP binding, tampering/expiry, honeypots, bounded IP rate limit, consent, strict partner fields, body limits. No emails sent.');
