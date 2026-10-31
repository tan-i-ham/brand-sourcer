import assert from 'node:assert/strict';
import { createReadStream, existsSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = fileURLToPath(new URL('..', import.meta.url));
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml' };
const server = createServer((req, res) => {
  const file = join(root, normalize(new URL(req.url, 'http://x').pathname === '/' ? '/index.html' : new URL(req.url, 'http://x').pathname));
  if (!file.startsWith(root) || !existsSync(file)) { res.writeHead(404).end(); return; }
  res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' });
  createReadStream(file).pipe(res);
}).listen(0);
await new Promise((resolve) => server.once('listening', resolve));
const base = `http://localhost:${server.address().port}/`;

const CJK = /[　-鿿＀-￯]/;
const failures = [];
const fail = (where, msg) => failures.push(`${where}: ${msg}`);

// Everything a reader can see or hear, minus the language toggle and source citations (titles and publishers stay in the original language).
const visibleText = (page) => page.evaluate(() => {
  const clone = document.body.cloneNode(true);
  clone.querySelectorAll('.lang-toggle, .srcs, script, style').forEach((el) => el.remove());
  const labels = [...clone.querySelectorAll('[aria-label]')].map((el) => el.getAttribute('aria-label'));
  return `${document.title}\n${document.documentElement.lang}\n${clone.textContent}\n${labels.join('\n')}`;
});

async function scan(page, where, lang) {
  const text = await visibleText(page);
  if (lang === 'en') {
    const bad = text.split('\n').flatMap((l) => l.match(/\S*[　-鿿＀-￯]\S*/g) ?? []);
    if (bad.length) fail(where, `CJK in en: ${[...new Set(bad)].join(' ')}`);
  }
  if (/undefined|\[object Object\]/.test(text)) fail(where, 'undefined or [object Object] in text');
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
page.on('pageerror', (e) => fail('page', e.message));

await page.goto(base);
await page.waitForSelector('.card');
assert.equal(await page.getAttribute('html', 'lang'), 'zh-Hant-TW', 'default lang is zh-Hant-TW');
assert.equal(await page.title(), '品牌資本溯源 Brand Sourcer', 'default title is zh');
assert.equal(await page.getAttribute('.lang-toggle [data-lang=zh]', 'aria-pressed'), 'true', 'zh button pressed by default');
assert.ok(!(await page.evaluate(() => location.hash)).includes('lang'), 'default hash omits lang');
assert.ok(CJK.test(await visibleText(page)), 'default view is Chinese');

await page.click('.lang-toggle [data-lang=en]');
assert.equal(await page.getAttribute('html', 'lang'), 'en');
assert.equal(await page.title(), 'Brand Sourcer');
assert.equal(await page.getAttribute('.lang-toggle [data-lang=en]', 'aria-pressed'), 'true');
assert.ok((await page.evaluate(() => location.hash)).includes('lang=en'), 'hash records lang=en');
assert.equal(await page.textContent('#play'), '▶ Play');
await page.click('#play');
assert.equal(await page.textContent('#play'), '❚❚ Pause', 'play label while playing, en');
await page.click('.lang-toggle [data-lang=zh]');
assert.equal(await page.textContent('#play'), '❚❚ 暫停', 'play label while playing, zh');
await page.click('#play');
assert.equal(await page.textContent('#play'), '▶ 播放');
await page.click('.lang-toggle [data-lang=en]');

const setYear = (year) => page.evaluate((y) => {
  const input = document.getElementById('year');
  input.value = y;
  input.dispatchEvent(new Event('input'));
}, year);

for (const year of [1950, 1990, 2005, 2015, 2021, 2026]) {
  await setYear(year);
  await scan(page, `en ${year}`, 'en');
  const ids = await page.$$eval('.card:not([disabled])', (cs) => cs.map((c) => c.dataset.id));
  for (const id of ids) {
    await page.click(`.card[data-id="${id}"]`);
    await scan(page, `en ${year} ${id}`, 'en');
  }
  if (await page.isVisible('#show-all')) await page.click('#show-all');
  if (year === 2021 || year === 2026) {
    const count = await page.locator('#sankey g.node').count();
    for (let i = 0; i < count; i++) {
      await page.locator('#sankey g.node').nth(i).dispatchEvent('click');
      await scan(page, `en ${year} node ${i}`, 'en');
      if (await page.isVisible('#show-all')) await page.click('#show-all');
    }
  }
}

await page.goto('about:blank');
await page.goto(`${base}#lang=en&year=2021&brand=on`);
await page.waitForSelector('.card');
assert.equal(await page.getAttribute('html', 'lang'), 'en', 'hash lang=en loads English');
assert.match(await page.textContent('#panel'), /Hillhouse/, 'On 2021 panel names Hillhouse');
await scan(page, 'hash load', 'en');

await page.goto('about:blank');
await page.goto(`${base}#lang=fr&year=2021`);
await page.waitForSelector('.card');
assert.equal(await page.getAttribute('html', 'lang'), 'zh-Hant-TW', 'unknown lang falls back to zh');

await browser.close();
server.close();
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log('ok: no CJK in the English UI across brands, years and node panels');
