import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import test from 'node:test';

test('production HTML contains no internal review placeholders (run after build)', () => {
  const root = '.next/server/app';
  const walk = dir => fs.readdirSync(dir, {withFileTypes: true}).flatMap(entry => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
  const files = walk(root).filter(file => file.endsWith('.html'));
  assert.ok(files.length > 0, 'Build must exist');
  const failures = files.filter(file => /\[\[\s*(?:OFFEN|TODO)/i.test(fs.readFileSync(file, 'utf8')));
  assert.deepEqual(failures, [], 'Internal review markers must never be published');
});
