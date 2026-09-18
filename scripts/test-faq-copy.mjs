import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFileSync} from 'node:fs';

// User explicitly approved these five existing questions/answers on 18 Sep 2026.
for (const locale of ['de', 'en', 'es']) {
  const approved = JSON.parse(execFileSync('git', ['show', `7f427d5:messages/${locale}.json`], {encoding: 'utf8'})).patient.faq;
  const current = JSON.parse(readFileSync(new URL(`../messages/${locale}.json`, import.meta.url), 'utf8')).patient.faq;
  assert.deepEqual(current, approved, `${locale}: use the approved wording verbatim, including headings`);
}
console.log('PASS: FAQ copy in DE/EN/ES matches the approved existing dataset exactly.');
