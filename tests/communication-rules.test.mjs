import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import test from 'node:test';

const walk = dir => fs.readdirSync(dir, {withFileTypes: true}).flatMap(entry => {
  const file = path.join(dir, entry.name);
  return entry.isDirectory() ? walk(file) : [file];
});

test('archived illustrations are neither public nor referenced in production HTML', () => {
  const archive = 'review-assets/communication-2026-10-21';
  const html = walk('.next/server/app').filter(f => f.endsWith('.html'));
  assert.ok(html.length > 0, 'Run build first');
  for (const file of walk(archive)) {
    const relative = path.relative(archive, file);
    assert.equal(fs.existsSync(path.join('public', relative)), false, relative);
    for (const page of html) {
      const source = fs.readFileSync(page, 'utf8');
      assert.ok(!source.includes('/' + relative) && !source.includes(encodeURIComponent('/' + relative)), `${page}: ${relative}`);
    }
  }
});

test('rendered pages do not include pre-consent Vimeo embeds', () => {
  for (const page of walk('.next/server/app').filter(f => f.endsWith('.html'))) {
    const html = fs.readFileSync(page, 'utf8');
    assert.doesNotMatch(html, /<iframe\b[^>]*src=["'][^"']*player\.vimeo\.com/i, page);
  }
});
