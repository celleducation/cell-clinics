// Schema-only tests: no requests, external services or emails are sent.
import assert from 'node:assert/strict';
import {patientInquirySchema} from '../lib/patient-inquiry.ts';

const contact = {name: 'Test Person', email: 'test@example.invalid', location: 'Berlin', consent: 'on', companyFax: '', formToken: 'schema-test-only'};
assert.equal(patientInquirySchema.safeParse(contact).success, true);
for (const field of ['symptoms', 'complaints', 'notes', 'message', 'interest', 'diagnosis', 'medication']) {
  assert.equal(patientInquirySchema.safeParse({...contact, [field]: 'not accepted'}).success, false, `${field} must be rejected`);
}
assert.equal(patientInquirySchema.safeParse({...contact, consent: undefined}).success, false);
assert.equal(patientInquirySchema.safeParse({...contact, companyFax: 'bot'}).success, false);
assert.equal(patientInquirySchema.safeParse(null).success, false);
console.log('PASS: contact-only schema, no symptom/free-text fields, consent and honeypot validation. No emails sent.');
