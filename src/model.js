import { BRANDS, GROUPS, REGIONS } from './data.js';

export const REMAINDER_NAME = { zh: '其他公開市場股東（未逐一揭露）', en: 'Other public-market shareholders (not individually disclosed)' };

// Node ids must not change with the language, so they are keyed on the zh text.
export const idKey = (v) => typeof v === 'string' ? v : v.zh;

const byId = Object.fromEntries(BRANDS.map((b) => [b.id, b]));
const owners = { ...GROUPS, ...byId };
const yearOf = (date) => Number(String(date).slice(0, 4));

function eraAt(brand, year) {
  return brand.eras.filter((e) => e.from <= year).at(-1) ?? null;
}

export function compositionAt(brand, year) {
  const era = eraAt(brand, year);
  if (!era) return null;
  if (era.inheritFrom) {
    const owner = owners[era.inheritFrom];
    return { ...compositionAt(owner, year), inheritedFrom: owner.name };
  }
  const snapshot = era.snapshots.filter((s) => yearOf(s.asOf) <= year).at(-1) ?? null;
  const holders = snapshot ? snapshot.holders : era.defaultHolders;
  const disclosed = holders.reduce((sum, h) => sum + h.pct, 0);
  const remainder = Math.round((100 - disclosed) * 10) / 10;
  return {
    era,
    snapshot,
    holders: remainder > 0 ? [...holders, { name: REMAINDER_NAME, origin: 'UNDISCLOSED', pct: remainder }] : holders,
  };
}

export function flaggedShare(composition) {
  return composition.holders.filter((h) => REGIONS[h.origin].flagged).reduce((s, h) => s + h.pct, 0);
}

export function sankeyGraph(year, focusBrandId = null) {
  const nodes = new Map();
  const links = new Map();
  const node = (id, props) => {
    if (!nodes.has(id)) nodes.set(id, { id, ...props });
    return id;
  };
  const link = (source, target, value) => {
    const key = `${source}→${target}`;
    const prev = links.get(key);
    links.set(key, { source, target, value: (prev?.value ?? 0) + value });
  };

  for (const brand of focusBrandId ? [byId[focusBrandId]] : BRANDS) {
    const comp = compositionAt(brand, year);
    if (!comp) continue;
    const brandId = node(`brand:${brand.id}`, { kind: 'brand', label: brand.name, brandId: brand.id, region: brand.origin });
    const parentId = node(`parent:${idKey(comp.era.parent)}`, { kind: 'parent', label: comp.era.parent, region: comp.era.parentOrigin });
    link(parentId, brandId, 100);
    for (const h of comp.holders) {
      const holderId = node(`holder:${idKey(h.name)}`, { kind: 'holder', label: h.name, region: h.origin });
      const regionId = node(`region:${h.origin}`, { kind: 'region', label: REGIONS[h.origin].label, region: h.origin });
      link(regionId, holderId, h.pct);
      link(holderId, parentId, h.pct);
    }
  }
  return { nodes: [...nodes.values()], links: [...links.values()] };
}

export function brandsTouching(nodeId, year) {
  const [kind, ...rest] = nodeId.split(':');
  const key = rest.join(':');
  return BRANDS.flatMap((brand) => {
    const comp = compositionAt(brand, year);
    if (!comp) return [];
    const matches = comp.holders.filter((h) =>
      (kind === 'holder' && idKey(h.name) === key) || (kind === 'region' && h.origin === key) || kind === 'parent');
    if (kind === 'parent' && idKey(comp.era.parent) !== key) return [];
    const pct = kind === 'parent' ? 100 : matches.reduce((s, h) => s + h.pct, 0);
    return pct > 0 ? [{ brand, pct, holders: matches }] : [];
  });
}

export function dealCount(brand, type) {
  return brand.events.filter((e) => e.type === type).length;
}

const nodeLabels = new Map([
  ...Object.entries(REGIONS).map(([code, r]) => [`region:${code}`, r.label]),
  [`holder:${idKey(REMAINDER_NAME)}`, REMAINDER_NAME],
  ...Object.values(owners).flatMap((o) => o.eras).flatMap((e) => [
    [`parent:${idKey(e.parent)}`, e.parent],
    ...[...(e.defaultHolders ?? []), ...e.snapshots.flatMap((s) => s.holders)].map((h) => [`holder:${idKey(h.name)}`, h.name]),
  ]),
]);
export const nodeLabel = (id) => nodeLabels.get(id);

export const FIRST_YEAR = Math.min(...BRANDS.map((b) => b.eras[0].from));

export { BRANDS, REGIONS, byId, yearOf };
