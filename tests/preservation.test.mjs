import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const manifest = JSON.parse(await readFile(new URL('../docs/preserved-assets.json', import.meta.url), 'utf8'));

for (const entry of manifest) {
  test(`preserves original ${entry.file} byte for byte`, async () => {
    const contents = await readFile(new URL(`../${entry.file}`, import.meta.url));
    assert.equal(createHash('sha256').update(contents).digest('hex'), entry.sha256);
  });
}
