import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { BRANDS, GROUPS, REGIONS, SOURCES } from '../src/data.js';
import { FIRST_YEAR as firstYear, REMAINDER_NAME, compositionAt, flaggedShare, idKey, sankeyGraph, yearOf } from '../src/model.js';
import { LANGS, UI } from '../src/i18n.js';

const used = new Set();
const errors = [];
const check = (ok, msg) => ok || errors.push(msg);

const CJK = /[\u3000-\u9fff\uff00-\uffef]/;
const isLocalized = (v) => v !== null && typeof v === 'object' && Object.keys(v).sort().join() === [...LANGS].sort().join()
  && LANGS.every((l) => typeof v[l] === 'string' && v[l].trim()) && !CJK.test(v.en);
const text = (v, where) => check(typeof v === 'string' ? v.trim() && !CJK.test(v) : isLocalized(v),
  `${where}: text must be a CJK-free string or { zh, en } with a CJK-free en, got ${JSON.stringify(v)}`);

text(REMAINDER_NAME, 'REMAINDER_NAME');
for (const [code, r] of Object.entries(REGIONS)) text(r.label, `REGIONS.${code}.label`);

const flatKeys = (o, prefix = '') => Object.entries(o).flatMap(([k, v]) => typeof v === 'object' ? flatKeys(v, `${prefix}${k}.`) : [`${prefix}${k}`]);
const leaves = (o) => Object.values(o).flatMap((v) => typeof v === 'object' ? leaves(v) : [v]);
for (const l of LANGS) check(JSON.stringify(flatKeys(UI[l]).sort()) === JSON.stringify(flatKeys(UI.zh).sort()), `UI.${l} keys differ from UI.zh`);
// functions take up to three args; probe them so interpolated templates are checked too
for (const v of leaves(UI.en)) check(!CJK.test(typeof v === 'function' ? v('x', 'x', 'x') : v), `UI.en has CJK text: ${typeof v === 'function' ? v('x', 'x', 'x') : v}`);

for (const brand of [...BRANDS, ...Object.values(GROUPS)].map((b) => ({ id: b.name, origin: 'UNDISCLOSED', events: [], ...b }))) {
  check(REGIONS[brand.origin], `${brand.id}: unknown origin ${brand.origin}`);
  text(brand.name, `${brand.id}: name`);
  if (brand.summary !== undefined) text(brand.summary, `${brand.id}: summary`);
  brand.eras.forEach((era, i) => {
    text(era.parent, `${brand.id}@${era.from}: parent`);
    check(i === 0 || era.from > brand.eras[i - 1].from, `${brand.id}: eras out of order at ${era.from}`);
    check(REGIONS[era.parentOrigin], `${brand.id}@${era.from}: unknown parentOrigin`);
    check(!era.inheritFrom || GROUPS[era.inheritFrom] || BRANDS.some((b) => b.id === era.inheritFrom), `${brand.id}@${era.from}: unknown inheritFrom ${era.inheritFrom}`);
    for (const holders of [era.defaultHolders ?? [], ...era.snapshots.map((s) => s.holders)]) {
      const sum = holders.reduce((s, h) => s + h.pct, 0);
      check(sum <= 100.05, `${brand.id}@${era.from}: holders sum to ${sum}`);
      for (const h of holders) {
        check(REGIONS[h.origin], `${brand.id}: holder ${idKey(h.name)} has unknown origin ${h.origin}`);
        text(h.name, `${brand.id}@${era.from}: holder name`);
        if (h.note !== undefined) text(h.note, `${brand.id}: note of ${idKey(h.name)}`);
      }
    }
    for (const s of era.snapshots) {
      text(s.basis, `${brand.id}: snapshot ${s.asOf} basis`);
      used.add(s.source);
      check(SOURCES[s.source], `${brand.id}: snapshot ${s.asOf} cites missing source ${s.source}`);
      check(yearOf(s.asOf) >= era.from, `${brand.id}: snapshot ${s.asOf} predates its era ${era.from}`);
    }
  });
  for (const ev of brand.events) {
    const title = idKey(ev.title);
    text(ev.title, `${brand.id}: event "${title}" title`);
    text(ev.summary, `${brand.id}: event "${title}" summary`);
    check(ev.sources.length > 0, `${brand.id}: event "${title}" has no source`);
    for (const key of ev.sources) {
      used.add(key);
      check(SOURCES[key], `${brand.id}: event "${title}" cites missing source ${key}`);
    }
  }
}

for (const brand of BRANDS) check(existsSync(new URL(`../assets/logos/${brand.id}.svg`, import.meta.url)), `${brand.id}: missing assets/logos/${brand.id}.svg`);

for (const key of Object.keys(SOURCES)) check(used.has(key), `source ${key} is never cited`);
for (const [key, s] of Object.entries(SOURCES)) check(/^https:\/\//.test(s.url), `source ${key} has a non-https url`);

for (let year = firstYear; year <= 2026; year++) {
  const { nodes, links } = sankeyGraph(year);
  for (const l of links) check(l.value > 0, `${year}: non-positive link ${l.source}→${l.target}`);
  for (const brand of BRANDS) {
    const comp = compositionAt(brand, year);
    if (!comp) continue;
    const total = comp.holders.reduce((s, h) => s + h.pct, 0);
    check(Math.abs(total - 100) < 0.05, `${brand.id}@${year}: composition sums to ${total}`);
    check(nodes.some((n) => n.id === `brand:${brand.id}`), `${brand.id}@${year}: missing from sankey`);
  }
}

assert.equal(compositionAt(BRANDS.find((b) => b.id === 'on'), 2021).holders.find((h) => h.origin === 'CN')?.pct, 5.1,
  'On at end of 2021 shows Hillhouse 5.1%');
assert.equal(compositionAt(BRANDS.find((b) => b.id === 'on'), 2026).holders.some((h) => h.origin === 'CN'), false,
  'On in 2026 shows no disclosed China capital');
assert.deepEqual(sankeyGraph(2026, 'on').nodes.filter((n) => n.kind === 'brand').map((n) => n.brandId), ['on'],
  'focusing a brand hides the other brands');
assert.equal(sankeyGraph(1990, 'converse').nodes.length, 0, 'a focused brand with no data that year yields an empty graph');
const brand = (id) => BRANDS.find((b) => b.id === id);
for (const id of ['arcteryx', 'salomon', 'wilson']) {
  assert.equal(Math.round(flaggedShare(compositionAt(brand(id), 2026)) * 10) / 10, 53.5, `${id} in 2026 shows 53.5% China capital via Amer Sports`);
  assert.equal(flaggedShare(compositionAt(brand(id), 2018)), 0, `${id} before the 2019 Anta deal shows no China capital`);
}
assert.equal(compositionAt(brand('arcteryx'), 2003).era.parent, 'adidas-Salomon AG', "Arc'teryx sits under adidas-Salomon in 2003");
assert.equal(flaggedShare(compositionAt(brand('mizuno'), 2026)), 0, 'Mizuno in 2026 lists no China capital among its top ten holders');
assert.equal(flaggedShare(compositionAt(brand('asics'), 2026)), 0, 'ASICS in 2026 lists no China capital among its top ten holders');
assert.equal(brand('asics').events.some((e) => REGIONS[e.counterpartyOrigin]?.flagged), false, 'selling Haglöfs to a Hong Kong buyer is not China capital in ASICS');
assert.equal(idKey(compositionAt(brand('mizuno'), 1950).era.parent), '水野兄弟商會', 'Mizuno is family-held before its 1961 listing');
assert.equal(compositionAt(BRANDS.find((b) => b.id === 'hoka'), 2010).era.parent, 'HOKA One One SAS', 'Hoka is French-owned before Deckers');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`ok: ${BRANDS.length} brands, ${Object.keys(SOURCES).length} sources, years ${firstYear}-2026`);
