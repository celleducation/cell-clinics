import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import test from 'node:test';

// Test-only vendor identifiers; this VM cannot perform network requests.
function harness(env = {}) {
  const events = new Map();
  const scripts = [];
  let reloads = 0;
  const document = {
    cookie: '',
    addEventListener: (name, fn) => events.set(name, fn),
    removeEventListener: name => events.delete(name),
    getElementById: id => scripts.find(script => script.id === id),
    createElement: () => ({}),
    head: {appendChild: script => scripts.push(script)},
  };
  const window = {location: {hostname: 'example.test', reload: () => reloads++}};
  let consent;
  function load(file) {
    const exports = {};
    const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
      compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020},
    }).outputText;
    vm.runInNewContext(source, {exports, document, window, process: {env},
      require: name => name === 'react' ? {useEffect: fn => fn()} : consent});
    return exports;
  }
  consent = load('lib/consent.ts');
  load('components/ConsentScripts.tsx').ConsentScripts();
  return {scripts, window, consent, document, reloads: () => reloads,
    update: accepted => events.get('cookieyes_consent_update')({detail: {accepted}})};
}
test('no IDs: no optional vendors even with a consent event', () => {
  const h = harness(); h.update(['analytics', 'advertisement']);
  assert.equal(h.scripts.length, 0);
  assert.equal(h.consent.hasConsent('statistics'), true);
  assert.equal(h.consent.hasConsent('necessary'), true);
});
test('configured IDs: initial refusal and reject all load no vendors', () => {
  const h = harness({NEXT_PUBLIC_COOKIEYES_ID:'test', NEXT_PUBLIC_GA_ID:'G-TEST', NEXT_PUBLIC_META_PIXEL_ID:'TEST'});
  assert.equal(h.scripts.length, 0); h.update(['necessary']);
  assert.equal(h.scripts.length, 0);
  assert.equal(h.consent.hasConsent('marketing'), false);
  const first = Array.from(h.window.dataLayer[0]);
  assert.deepEqual(first.slice(0,2), ['consent','default']);
  assert.ok(Object.values(first[2]).every(value => value === 'denied'));
});
test('statistics loads only GA, once; withdrawal disables and reloads', () => {
  const h = harness({NEXT_PUBLIC_COOKIEYES_ID:'test', NEXT_PUBLIC_GA_ID:'G-TEST', NEXT_PUBLIC_META_PIXEL_ID:'TEST'});
  h.update(['necessary','analytics']); h.update(['necessary','analytics']);
  assert.deepEqual(h.scripts.map(s => s.id), ['consented-ga']);
  h.update(['necessary']);
  assert.equal(h.window['ga-disable-G-TEST'], true);
  assert.equal(h.reloads(), 1);
});
test('marketing loads only Meta; withdrawal revokes', () => {
  const h = harness({NEXT_PUBLIC_COOKIEYES_ID:'test', NEXT_PUBLIC_GA_ID:'G-TEST', NEXT_PUBLIC_META_PIXEL_ID:'TEST'});
  h.update(['necessary','advertisement']);
  assert.deepEqual(h.scripts.map(s => s.id), ['consented-meta']);
  h.update(['necessary']);
  assert.equal(h.window.fbq.queue.at(-1)[1], 'revoke');
  assert.equal(h.reloads(), 1);
});
