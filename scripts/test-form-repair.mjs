// Execute the actual TS route/components with isolated dependencies.
// All outgoing delivery requests are mocked: no emails, no production requests.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import ts from 'typescript';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';

const require = createRequire(import.meta.url);
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const cache = new Map();
function load(file, overrides = {}) {
  const filename = resolve(root, file);
  if (!Object.keys(overrides).length && cache.has(filename)) return cache.get(filename);
  const source = ts.transpileModule(readFileSync(filename, 'utf8'), {
    compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX}
  }).outputText;
  const testModule = {exports: {}};
  const scopedRequire = name => {
    if (Object.hasOwn(overrides, name)) return overrides[name];
    if (name.startsWith('@/')) return load(name.slice(2) + '.ts');
    return require(name);
  };
  new Function('require', 'module', 'exports', source)(scopedRequire, testModule, testModule.exports);
  if (!Object.keys(overrides).length) cache.set(filename, testModule.exports);
  return testModule.exports;
}

const messages = JSON.parse(readFileSync(resolve(root, 'messages/de.json'), 'utf8'));
const translations = {useTranslations: (namespace = '') => key =>
  `${namespace ? namespace + '.' : ''}${key}`.split('.').reduce((value, part) => value[part], messages)};
for (const [file, name] of [['PatientInquiryForm', 'PatientInquiryForm'], ['PartnerApplicationForm', 'PartnerApplicationForm']]) {
  for (const failed of [false, true]) {
    const component = load(`components/${file}.tsx`, {
      'next-intl': translations,
      './useFormChallenge': {useFormChallenge: () => ({token: failed ? '' : 'test-token', failed, retry() {}})}
    })[name];
    const html = renderToStaticMarkup(React.createElement(component));
    assert.ok(!html.includes('class="form-error"'), 'No submission error before submitting');
    assert.equal(html.includes(messages.formApi.unavailable), failed);
    assert.equal(html.includes(messages.formApi.retry), failed);
    assert.equal(/type="submit" disabled/.test(html), failed);
  }
}

process.env.NODE_ENV = 'production';
process.env.VERCEL = '1';
process.env.FORM_GUARD_SECRET = 'local-regression-test-secret-do-not-deploy';
delete process.env.RESEND_API_KEY;
const guard = load('lib/form-guard.ts');
const route = load('app/api/partner-inquiry/route.ts');
const patientRoute = load('app/api/patient-inquiry/route.ts');
const originalFetch = globalThis.fetch;
const deliveries = [];
let providerReply = {success: 'true', message: 'Form submitted successfully'};
let providerStatus = 200;
let resendReply = {id: 'test-email-id'};
let resendStatus = 200;
let resendThrows = false;
const resendDeliveries = [];
globalThis.fetch = async (url, options) => {
  if (url === 'https://api.resend.com/emails') {
    assert.equal(options.method, 'POST');
    const payload = JSON.parse(options.body);
    resendDeliveries.push(payload);
    if (resendThrows) throw new Error('Mock network failure');
    return Response.json(resendReply, {status: resendStatus});
  }
  assert.equal(url, 'https://formsubmit.co/ajax/info@cell-education.com');
  assert.equal(options.method, 'POST');
  assert.equal(options.headers.Origin, 'https://cell-clinics.com');
  assert.equal(options.headers.Referer, 'https://cell-clinics.com/');
  const payload = JSON.parse(options.body);
  assert.equal(payload._url, 'https://cell-clinics.com/', 'Server-side delivery must identify the form website');
  deliveries.push(payload);
  return Response.json(providerReply, {status: providerStatus});
};
try {
  const valid = {clinicName: 'Test Practice', country: 'Germany', clinicType: 'Practice', profession: 'Physician', primaryContact: 'Test Contact', email: 'test@example.invalid', consent: 'on', companyFax: ''};
  let index = 30;
  async function post(overrides = {}) {
    const ip = `192.0.2.${index++}`;
    const formToken = guard.issueFormToken('partner', ip, process.env.FORM_GUARD_SECRET, Date.now() - 4000);
    return route.POST(new Request('https://example.invalid/api/partner-inquiry', {
      method: 'POST', headers: {'content-type': 'application/json', 'x-forwarded-for': ip},
      body: JSON.stringify({...valid, formToken, ...overrides})
    }));
  }
  for (const invalid of [{companyFax: 'bot'}, {formToken: 'forged'}, {consent: ''}, {notes: 'not allowed'}]) {
    assert.equal((await post(invalid)).status, 400);
  }
  assert.equal(deliveries.length, 0, 'Rejected forms must never reach delivery');
  assert.equal((await post()).status, 200, 'No Resend key: existing provider can deliver server-side');
  const payload = deliveries[0];
  assert.equal(payload.Email, valid.email);
  assert.equal(payload._replyto, valid.email);
  for (const field of ['formToken', 'companyFax', 'notes', 'consent', 'Phone', 'Website']) assert.ok(!Object.hasOwn(payload, field));
  for (const reply of [{success: false}, {success: 'false'}, {}, {success: true, message: 'Please activate your form'}]) {
    providerReply = reply;
    assert.equal((await post()).status, 502, 'Never claim success without delivery acknowledgement');
  }
  providerReply = {success: true}; providerStatus = 503;
  assert.equal((await post()).status, 502);
  providerStatus = 200;
  const patient = {name: 'Test Person', email: 'test@example.invalid', location: 'Test City', consent: 'on', companyFax: ''};
  async function postPatient(overrides = {}) {
    const ip = `192.0.2.${index++}`;
    const formToken = guard.issueFormToken('patient', ip, process.env.FORM_GUARD_SECRET, Date.now() - 4000);
    return patientRoute.POST(new Request('https://example.invalid/api/patient-inquiry', {
      method: 'POST', headers: {'content-type': 'application/json', 'x-forwarded-for': ip, referer: 'https://attacker.invalid/?private=value'},
      body: JSON.stringify({...patient, formToken, ...overrides})
    }));
  }
  const beforeInvalid = deliveries.length;
  for (const invalid of [{companyFax: 'bot'}, {formToken: 'forged'}, {consent: ''}, {notes: 'not allowed'}, {_url: 'https://attacker.invalid'}]) {
    assert.equal((await postPatient(invalid)).status, 400);
  }
  assert.equal(deliveries.length, beforeInvalid);
  assert.equal((await postPatient()).status, 200);
  for (const field of ['formToken', 'companyFax', 'notes', 'consent']) assert.ok(!Object.hasOwn(deliveries.at(-1), field));
  for (const reply of [{success: false}, {}, {success: true, message: 'Please activate your form'}]) {
    providerReply = reply;
    assert.equal((await postPatient()).status, 502);
  }
  process.env.RESEND_API_KEY = 're_fake_test_key';
  delete process.env.PARTNER_INQUIRY_FROM;
  delete process.env.PARTNER_INQUIRY_TO;
  const formsubmitCount = deliveries.length;
  for (const send of [postPatient, post]) {
    resendReply = {id: 'test-email-id'}; resendStatus = 200; resendThrows = false;
    const beforeRejected = resendDeliveries.length;
    assert.equal((await send({formToken: 'forged'})).status, 400);
    assert.equal(resendDeliveries.length, beforeRejected);
    assert.equal((await send()).status, 200);
    const mail = resendDeliveries.at(-1);
    assert.equal(mail.from, 'Cell Clinics <forms@cell-education.com>');
    assert.equal(mail.to, 'info@cell-education.com');
    assert.equal(mail.reply_to, 'test@example.invalid');
    assert.ok(!mail.html.includes('formToken'));
    resendReply = {};
    assert.equal((await send()).status, 502, 'No success without provider message ID');
    resendReply = {name: 'validation_error', message: 'Mock rejection'}; resendStatus = 403;
    assert.equal((await send()).status, 502);
    resendThrows = true;
    assert.equal((await send()).status, 502);
    assert.equal(deliveries.length, formsubmitCount, 'No FormSubmit fallback while Resend is configured');
  }
} finally { globalThis.fetch = originalFetch; }
console.log('PASS: both forms distinguish preparation/submission; both guarded routes validate provider acknowledgements; Resend uses the verified sender and never falls back on failure; invalid requests cannot send. Providers mocked, zero emails.');
