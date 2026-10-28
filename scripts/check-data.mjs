import assert from 'node:assert/strict';
import { BRANDS, REGIONS, SOURCES } from '../src/data.js';
import { compositionAt, sankeyGraph, yearOf } from '../src/model.js';

const used = new Set();
const errors = [];
const check = (ok, msg) => ok || errors.push(msg);

for (const brand of BRANDS) {
  check(REGIONS[brand.origin], `${brand.id}: unknown origin ${brand.origin}`);
  brand.eras.forEach((era, i) => {
    check(i === 0 || era.from > brand.eras[i - 1].from, `${brand.id}: eras out of order at ${era.from}`);
    check(REGIONS[era.parentOrigin], `${brand.id}@${era.from}: unknown parentOrigin`);
    for (const holders of [era.defaultHolders ?? [], ...era.snapshots.map((s) => s.holders)]) {
      const sum = holders.reduce((s, h) => s + h.pct, 0);
      check(sum <= 100.05, `${brand.id}@${era.from}: holders sum to ${sum}`);
      for (const h of holders) check(REGIONS[h.origin], `${brand.id}: holder ${h.name} has unknown origin ${h.origin}`);
    }
    for (const s of era.snapshots) {
      used.add(s.source);
      check(SOURCES[s.source], `${brand.id}: snapshot ${s.asOf} cites missing source ${s.source}`);
      check(yearOf(s.asOf) >= era.from, `${brand.id}: snapshot ${s.asOf} predates its era ${era.from}`);
    }
  });
  for (const ev of brand.events) {
    check(ev.sources.length > 0, `${brand.id}: event "${ev.title}" has no source`);
    for (const key of ev.sources) {
      used.add(key);
      check(SOURCES[key], `${brand.id}: event "${ev.title}" cites missing source ${key}`);
    }
  }
}

for (const key of Object.keys(SOURCES)) check(used.has(key), `source ${key} is never cited`);
for (const [key, s] of Object.entries(SOURCES)) check(/^https:\/\//.test(s.url), `source ${key} has a non-https url`);

for (let year = 1964; year <= 2026; year++) {
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
assert.equal(compositionAt(BRANDS.find((b) => b.id === 'hoka'), 2010).era.parent, 'HOKA One One SAS', 'Hoka is French-owned before Deckers');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`ok: ${BRANDS.length} brands, ${Object.keys(SOURCES).length} sources, years 1964-2026`);
