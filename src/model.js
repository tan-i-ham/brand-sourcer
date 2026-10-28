import { BRANDS, REGIONS } from './data.js';

export const REMAINDER_NAME = '其他公開市場股東（未逐一揭露）';

const byId = Object.fromEntries(BRANDS.map((b) => [b.id, b]));
const yearOf = (date) => Number(String(date).slice(0, 4));

function eraAt(brand, year) {
  return brand.eras.filter((e) => e.from <= year).at(-1) ?? null;
}

export function compositionAt(brand, year) {
  const era = eraAt(brand, year);
  if (!era) return null;
  if (era.inheritFrom) {
    const inherited = compositionAt(byId[era.inheritFrom], year);
    return { ...inherited, era, inheritedFrom: byId[era.inheritFrom].name };
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

export function sankeyGraph(year) {
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

  for (const brand of BRANDS) {
    const comp = compositionAt(brand, year);
    if (!comp) continue;
    const brandId = node(`brand:${brand.id}`, { kind: 'brand', label: brand.name, brandId: brand.id, region: brand.origin });
    const parentId = node(`parent:${comp.era.parent}`, { kind: 'parent', label: comp.era.parent, region: comp.era.parentOrigin });
    link(parentId, brandId, 100);
    for (const h of comp.holders) {
      const holderId = node(`holder:${h.name}`, { kind: 'holder', label: h.name, region: h.origin });
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
      (kind === 'holder' && h.name === key) || (kind === 'region' && h.origin === key) || kind === 'parent');
    if (kind === 'parent' && comp.era.parent !== key) return [];
    const pct = kind === 'parent' ? 100 : matches.reduce((s, h) => s + h.pct, 0);
    return pct > 0 ? [{ brand, pct, holders: matches }] : [];
  });
}

export const EVENT_TYPES = {
  founded: '創立',
  acquired: '收購／易主',
  stake: '入股／持股變動',
  divested: '出售／減持',
  ipo: '上市',
  rights: '商標權',
  rename: '更名',
  note: '備註',
};

export function dealCount(brand, type) {
  return brand.events.filter((e) => e.type === type).length;
}

export { BRANDS, REGIONS, byId, yearOf };
