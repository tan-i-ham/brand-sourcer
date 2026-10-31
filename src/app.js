import { BRANDS, REGIONS, SOURCES } from './data.js';
import { FIRST_YEAR, brandsTouching, byId, compositionAt, dealCount, flaggedShare, nodeLabel, sankeyGraph, yearOf } from './model.js';
import { LANGS, UI, localize } from './i18n.js';

const state = { year: 2026, selected: null, lang: 'zh' };
const tx = (v) => localize(v, state.lang);
const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
const regionColor = (region) => REGIONS[region].flagged ? css('--flagged') : region === 'UNDISCLOSED' ? css('--undisclosed') : css('--other');
const fmtPct = (p) => `${p.toFixed(1)}%`;
const fmtUSD = (v) => v >= 1e9 ? `US$${(v / 1e9).toFixed(2)}B` : v >= 1e6 ? `US$${(v / 1e6).toFixed(1)}M` : `US$${(v / 1e3).toFixed(0)}K`;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const logo = (brand) => `<img class="logo" src="assets/logos/${brand.id}.svg" alt="">`;

const yearInput = document.getElementById('year');
const yearOut = document.getElementById('year-out');
const panel = document.getElementById('panel');
const playBtn = document.getElementById('play');
yearInput.min = FIRST_YEAR;

function readHash() {
  const p = new URLSearchParams(location.hash.slice(1));
  if (p.has('year')) state.year = Math.min(2026, Math.max(FIRST_YEAR, Number(p.get('year')) || 2026));
  if (p.has('brand') && byId[p.get('brand')]) state.selected = `brand:${p.get('brand')}`;
  if (LANGS.includes(p.get('lang'))) state.lang = p.get('lang');
}

function writeHash() {
  const p = new URLSearchParams({ year: state.year });
  if (state.selected?.startsWith('brand:')) p.set('brand', state.selected.slice(6));
  if (state.lang !== 'zh') p.set('lang', state.lang);
  history.replaceState(null, '', `#${p}`);
}

function setYear(year) {
  state.year = year;
  yearInput.value = year;
  yearOut.textContent = year;
  render();
}

function setLang(lang) {
  state.lang = lang;
  render();
}

function select(id) {
  state.selected = id === state.selected && id.startsWith('brand:') ? null : id;
  render();
}

function renderStatic() {
  const u = UI[state.lang];
  document.documentElement.lang = state.lang === 'zh' ? 'zh-Hant-TW' : 'en';
  document.title = u.title;
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = u[el.dataset.i18n]; });
  document.querySelectorAll('[data-i18n-label]').forEach((el) => el.setAttribute('aria-label', u[el.dataset.i18nLabel]));
  document.querySelectorAll('.lang-toggle button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.lang === state.lang));
  playBtn.textContent = timer ? u.pause : u.play;
}

function renderCards() {
  const u = UI[state.lang];
  const el = document.getElementById('cards');
  el.innerHTML = BRANDS.map((b) => {
    const comp = compositionAt(b, state.year);
    const cn = comp ? flaggedShare(comp) : 0;
    const active = state.selected === `brand:${b.id}`;
    return `<button class="card${active ? ' active' : ''}" data-id="brand:${b.id}" ${comp ? '' : 'disabled'}>
      ${logo(b)}
      <div class="name">${esc(tx(b.name))}</div>
      <div class="meta">${esc(tx(REGIONS[b.origin].label))} · ${b.founded}</div>
      <div class="cn${cn > 0 ? ' hit' : ''}">${comp ? u.chinaCapital(fmtPct(cn)) : u.dataFrom(b.eras[0].from)}</div>
    </button>`;
  }).join('');
  el.querySelectorAll('.card:not([disabled])').forEach((c) => c.addEventListener('click', () => select(c.dataset.id)));
}

function renderSankey() {
  const container = document.getElementById('sankey');
  const focus = state.selected?.startsWith('brand:') ? state.selected.slice(6) : null;
  document.getElementById('show-all').hidden = !focus;
  const graph = sankeyGraph(state.year, focus);
  if (!graph.nodes.length) {
    container.innerHTML = `<p class="hint">${UI[state.lang].noDataYet(state.year, esc(tx(byId[focus].name)))}</p>`;
    return;
  }
  const width = Math.max(container.clientWidth, 760);
  const height = Math.max(420, graph.nodes.length * 26);
  const layout = d3.sankey()
    .nodeId((d) => d.id)
    .nodeWidth(14)
    .nodePadding(10)
    .nodeSort(null)
    .extent([[1, 8], [width - 130, height - 8]]);
  const { nodes, links } = layout({ nodes: graph.nodes.map((d) => ({ ...d })), links: graph.links.map((d) => ({ ...d })) });

  const svg = d3.create('svg').attr('width', width).attr('height', height).attr('viewBox', [0, 0, width, height]);

  const linkColor = (l) => l.target.kind === 'brand' ? css('--undisclosed') : regionColor(l.source.region);

  const touches = (l) => state.selected && (l.source.id === state.selected || l.target.id === state.selected);

  svg.append('g').selectAll('path').data(links).join('path')
    .attr('class', (l) => `link${touches(l) ? ' hl' : ''}`)
    .attr('d', d3.sankeyLinkHorizontal())
    .attr('stroke', linkColor)
    .attr('stroke-opacity', (l) => state.selected && !touches(l) ? 0.15 : 0.4)
    .attr('stroke-width', (l) => Math.max(1, l.width))
    .on('click', (_, l) => select(l.target.kind === 'brand' ? l.target.id : l.source.id))
    .append('title').text((l) => `${tx(l.source.label)} → ${tx(l.target.label)}\n${l.value.toFixed(1)}`);

  const node = svg.append('g').selectAll('g').data(nodes).join('g')
    .attr('class', (d) => `node${d.id === state.selected ? ' selected' : ''}`)
    .on('click', (_, d) => select(d.id));
  node.append('rect')
    .attr('x', (d) => d.x0).attr('y', (d) => d.y0)
    .attr('width', (d) => d.x1 - d.x0).attr('height', (d) => Math.max(1, d.y1 - d.y0))
    .attr('fill', (d) => d.kind === 'brand' ? css('--ink') : regionColor(d.region));
  node.append('title').text((d) => tx(d.label));
  node.append('text')
    .attr('x', (d) => d.x1 + 6)
    .attr('y', (d) => (d.y0 + d.y1) / 2)
    .attr('dy', '0.35em')
    .attr('font-weight', (d) => d.kind === 'brand' ? 700 : 400)
    .text((d) => tx(d.label));

  container.replaceChildren(svg.node());
}

function sourceList(keys) {
  return `<ol class="srcs">${keys.map((k) => {
    const s = SOURCES[k];
    return `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)}</a> <span class="kind">${esc(s.publisher)}${s.date ? `, ${esc(s.date)}` : ''}</span></li>`;
  }).join('')}</ol>`;
}

function compositionPie(comp) {
  const size = 180;
  const arc = d3.arc().innerRadius(size * 0.28).outerRadius(size / 2 - 2).padAngle(0.012).cornerRadius(2);
  const slices = d3.pie().sort(null).value((h) => h.pct)(comp.holders);
  return `<svg class="pie" viewBox="${-size / 2} ${-size / 2} ${size} ${size}" role="img" aria-label="${UI[state.lang].compositionAria(state.year)}">
    ${slices.map((s) => `<path d="${arc(s)}" fill="${regionColor(s.data.origin)}"><title>${esc(tx(s.data.name))}\n${fmtPct(s.data.pct)}</title></path>`).join('')}
    <text class="pie-center" dy="-0.2em">${fmtPct(flaggedShare(comp))}</text>
    <text class="pie-sub" dy="1.2em">${UI[state.lang].pieSub}</text>
  </svg>`;
}

function compositionTable(comp) {
  const { sep } = UI[state.lang];
  return `<table>${comp.holders.map((h) => `<tr class="${REGIONS[h.origin].flagged ? 'flagged' : ''}">
      <td><span class="sw" style="background:${regionColor(h.origin)}"></span>${esc(tx(h.name))}<div class="note">${esc(tx(REGIONS[h.origin].label))}${h.note ? `${sep}${esc(tx(h.note))}` : ''}</div></td>
      <td class="num">${fmtPct(h.pct)}</td></tr>`).join('')}</table>`;
}

const isFlaggedEvent = (e) => Boolean(REGIONS[e.counterpartyOrigin]?.flagged);

function brandPanel(brand) {
  const u = UI[state.lang];
  const comp = compositionAt(brand, state.year);
  const cn = comp ? flaggedShare(comp) : 0;
  const everFlagged = brand.events.some(isFlaggedEvent);
  const inherited = comp?.inheritedFrom ? u.inherited(esc(tx(brand.name)), esc(tx(comp.inheritedFrom))) : '';
  const basis = comp?.snapshot
    ? `${u.snapshotNote(inherited, esc(tx(comp.snapshot.basis)), esc(comp.snapshot.asOf))}${sourceList([comp.snapshot.source])}`
    : inherited || u.noHoldings;

  return `${logo(brand)}<h2>${esc(tx(brand.name))}</h2>
    <div class="note">${u.originLine(esc(tx(REGIONS[brand.origin].label)), brand.founded)}</div>
    <p>${esc(tx(brand.summary))}</p>
    <div class="stats">
      <div class="stat"><b>${dealCount(brand, 'acquired')}</b><span>${u.acquired}</span></div>
      <div class="stat"><b>${dealCount(brand, 'divested')}</b><span>${u.divested}</span></div>
      <div class="stat${cn > 0 ? ' hit' : ''}"><b>${fmtPct(cn)}</b><span>${u.chinaCapitalIn(state.year)}</span></div>
      <div class="stat${everFlagged ? ' hit' : ''}"><b>${everFlagged ? u.everYes : u.everNo}</b><span>${u.everFlagged}</span></div>
    </div>
    ${comp ? `<h3>${u.compositionHeading(state.year, esc(tx(comp.era.parent)))}</h3>${compositionPie(comp)}${compositionTable(comp)}<p class="note">${basis}</p>` : `<p class="hint">${u.noBrandData(state.year)}</p>`}
    <h3>${u.timelineHeading}</h3>
    <ol class="timeline">${brand.events.map((e) => {
      const y = yearOf(e.date);
      const deal = e.type === 'acquired' || e.type === 'divested';
      const flagged = isFlaggedEvent(e);
      return `<li class="${deal ? 'deal' : ''}${flagged ? ' flagged' : ''}${y === state.year ? ' current' : ''}">
        <button class="when" data-year="${y}">${esc(e.date)}</button><span class="tag">${u.eventType[e.type]}</span>
        <div><b>${esc(tx(e.title))}</b>${e.priceUSD ? `${u.sep}${fmtUSD(e.priceUSD)}` : ''}${e.stakePct ? `${u.sep}${e.stakePct}%` : ''}</div>
        <p>${esc(tx(e.summary))}</p>${sourceList(e.sources)}</li>`;
    }).join('')}</ol>`;
}

function nodePanel(id) {
  const u = UI[state.lang];
  const kind = id.split(':')[0];
  const rows = brandsTouching(id, state.year);
  return `<h2>${esc(tx(nodeLabel(id)))}</h2><div class="note">${u.nodeSubtitle(u.nodeKind[kind], state.year)}</div>
    <h3>${kind === 'parent' ? u.parentBrands : u.heldBrands}</h3>
    <table>${rows.map((r) => `<tr><td><a href="#" data-id="brand:${r.brand.id}">${esc(tx(r.brand.name))}</a></td><td class="num">${fmtPct(r.pct)}</td></tr>`).join('')}</table>
    <p class="hint">${u.nodeHint}</p>`;
}

function renderPanel() {
  if (!state.selected) {
    panel.innerHTML = `<h2>${UI[state.lang].emptyTitle}</h2><p class="hint">${UI[state.lang].emptyHint}</p>`;
    return;
  }
  panel.innerHTML = state.selected.startsWith('brand:') ? brandPanel(byId[state.selected.slice(6)]) : nodePanel(state.selected);
  panel.querySelectorAll('.when').forEach((b) => b.addEventListener('click', () => setYear(Number(b.dataset.year))));
  panel.querySelectorAll('a[data-id]').forEach((a) => a.addEventListener('click', (ev) => { ev.preventDefault(); select(a.dataset.id); }));
}

function render() {
  writeHash();
  renderStatic();
  renderCards();
  renderSankey();
  renderPanel();
}

let timer = null;
const stopPlaying = () => { clearInterval(timer); timer = null; renderStatic(); };
playBtn.addEventListener('click', () => {
  if (timer) return stopPlaying();
  if (state.year >= 2026) setYear(FIRST_YEAR);
  timer = setInterval(() => state.year >= 2026 ? stopPlaying() : setYear(state.year + 1), 350);
  renderStatic();
});
document.querySelectorAll('.lang-toggle button').forEach((b) => b.addEventListener('click', () => setLang(b.dataset.lang)));
document.getElementById('show-all').addEventListener('click', () => select(state.selected));
yearInput.addEventListener('input', () => setYear(Number(yearInput.value)));
window.addEventListener('resize', () => renderSankey());

readHash();
setYear(state.year);
