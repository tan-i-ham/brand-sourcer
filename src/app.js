import { BRANDS, REGIONS, SOURCES } from './data.js';
import { EVENT_TYPES, brandsTouching, byId, compositionAt, dealCount, flaggedShare, sankeyGraph, yearOf } from './model.js';

const state = { year: 2026, selected: null };
const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
const regionColor = (region) => REGIONS[region].flagged ? css('--flagged') : region === 'UNDISCLOSED' ? css('--undisclosed') : css('--other');
const fmtPct = (p) => `${p.toFixed(1)}%`;
const fmtUSD = (v) => v >= 1e9 ? `US$${(v / 1e9).toFixed(2)}B` : v >= 1e6 ? `US$${(v / 1e6).toFixed(1)}M` : `US$${(v / 1e3).toFixed(0)}K`;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

const yearInput = document.getElementById('year');
const yearOut = document.getElementById('year-out');
const panel = document.getElementById('panel');

function readHash() {
  const p = new URLSearchParams(location.hash.slice(1));
  if (p.has('year')) state.year = Math.min(2026, Math.max(1964, Number(p.get('year')) || 2026));
  if (p.has('brand') && byId[p.get('brand')]) state.selected = `brand:${p.get('brand')}`;
}

function writeHash() {
  const p = new URLSearchParams({ year: state.year });
  if (state.selected?.startsWith('brand:')) p.set('brand', state.selected.slice(6));
  history.replaceState(null, '', `#${p}`);
}

function setYear(year) {
  state.year = year;
  yearInput.value = year;
  yearOut.textContent = year;
  render();
}

function select(id) {
  state.selected = id;
  render();
}

function renderCards() {
  const el = document.getElementById('cards');
  el.innerHTML = BRANDS.map((b) => {
    const comp = compositionAt(b, state.year);
    const cn = comp ? flaggedShare(comp) : 0;
    const active = state.selected === `brand:${b.id}`;
    return `<button class="card${active ? ' active' : ''}" data-id="brand:${b.id}" ${comp ? '' : 'disabled'}>
      <div class="name">${esc(b.name)}</div>
      <div class="meta">${esc(REGIONS[b.origin].label.split(' ')[0])} · ${b.founded}</div>
      <div class="cn${cn > 0 ? ' hit' : ''}">${comp ? `中國資本 ${fmtPct(cn)}` : `${b.eras[0].from} 年後才有資料`}</div>
    </button>`;
  }).join('');
  el.querySelectorAll('.card:not([disabled])').forEach((c) => c.addEventListener('click', () => select(c.dataset.id)));
}

function renderSankey() {
  const container = document.getElementById('sankey');
  const graph = sankeyGraph(state.year);
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
    .append('title').text((l) => `${l.source.label} → ${l.target.label}\n${l.value.toFixed(1)}`);

  const node = svg.append('g').selectAll('g').data(nodes).join('g')
    .attr('class', (d) => `node${d.id === state.selected ? ' selected' : ''}`)
    .on('click', (_, d) => select(d.id));
  node.append('rect')
    .attr('x', (d) => d.x0).attr('y', (d) => d.y0)
    .attr('width', (d) => d.x1 - d.x0).attr('height', (d) => Math.max(1, d.y1 - d.y0))
    .attr('fill', (d) => d.kind === 'brand' ? css('--ink') : regionColor(d.region));
  node.append('title').text((d) => d.label);
  node.append('text')
    .attr('x', (d) => d.x1 + 6)
    .attr('y', (d) => (d.y0 + d.y1) / 2)
    .attr('dy', '0.35em')
    .attr('font-weight', (d) => d.kind === 'brand' ? 700 : 400)
    .text((d) => d.label);

  container.replaceChildren(svg.node());
}

function sourceList(keys) {
  return `<ol class="srcs">${keys.map((k) => {
    const s = SOURCES[k];
    return `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)}</a> <span class="kind">${esc(s.publisher)}${s.date ? `, ${esc(s.date)}` : ''}</span></li>`;
  }).join('')}</ol>`;
}

function compositionTable(comp) {
  return `<table>${comp.holders.map((h) => `<tr class="${REGIONS[h.origin].flagged ? 'flagged' : ''}">
      <td>${esc(h.name)}<div class="note">${esc(REGIONS[h.origin].label)}${h.note ? `｜${esc(h.note)}` : ''}</div></td>
      <td class="num">${fmtPct(h.pct)}</td></tr>`).join('')}</table>`;
}

const isFlaggedEvent = (e) => Boolean(REGIONS[e.counterpartyOrigin]?.flagged);

function brandPanel(brand) {
  const comp = compositionAt(brand, state.year);
  const cn = comp ? flaggedShare(comp) : 0;
  const everFlagged = brand.events.some(isFlaggedEvent);
  const basis = comp?.snapshot
    ? `${comp.snapshot.basis}，截至 ${comp.snapshot.asOf}。${sourceList([comp.snapshot.source])}`
    : comp?.inheritedFrom ? `${esc(brand.name)} 為 ${esc(comp.inheritedFrom)} 全資子公司，股東結構同母公司。` : '本期未找到逐一揭露的持股資料。';

  return `<h2>${esc(brand.name)}</h2>
    <div class="note">發源地：${esc(REGIONS[brand.origin].label)}｜創立：${brand.founded}</div>
    <p>${esc(brand.summary)}</p>
    <div class="stats">
      <div class="stat"><b>${dealCount(brand, 'acquired')}</b><span>收購／易主</span></div>
      <div class="stat"><b>${dealCount(brand, 'divested')}</b><span>出售／減持</span></div>
      <div class="stat${cn > 0 ? ' hit' : ''}"><b>${fmtPct(cn)}</b><span>${state.year} 年中國資本</span></div>
      <div class="stat${everFlagged ? ' hit' : ''}"><b>${everFlagged ? '曾有' : '無'}</b><span>歷史上中國資本</span></div>
    </div>
    ${comp ? `<h3>${state.year} 年資本組成｜母公司：${esc(comp.era.parent)}</h3>${compositionTable(comp)}<p class="note">${basis}</p>` : `<p class="hint">${state.year} 年尚無此品牌資料。</p>`}
    <h3>時間軸（點日期跳到該年）</h3>
    <ol class="timeline">${brand.events.map((e) => {
      const y = yearOf(e.date);
      const deal = e.type === 'acquired' || e.type === 'divested';
      const flagged = isFlaggedEvent(e);
      return `<li class="${deal ? 'deal' : ''}${flagged ? ' flagged' : ''}${y === state.year ? ' current' : ''}">
        <button class="when" data-year="${y}">${esc(e.date)}</button><span class="tag">${EVENT_TYPES[e.type]}</span>
        <div><b>${esc(e.title)}</b>${e.priceUSD ? `｜${fmtUSD(e.priceUSD)}` : ''}${e.stakePct ? `｜${e.stakePct}%` : ''}</div>
        <p>${esc(e.summary)}</p>${sourceList(e.sources)}</li>`;
    }).join('')}</ol>`;
}

function nodePanel(id) {
  const [kind, ...rest] = id.split(':');
  const label = rest.join(':');
  const title = kind === 'region' ? REGIONS[label].label : label;
  const kindLabel = { region: '資本來源地', holder: '股東', parent: '母公司' }[kind];
  const rows = brandsTouching(id, state.year);
  return `<h2>${esc(title)}</h2><div class="note">${kindLabel}｜${state.year} 年</div>
    <h3>${kind === 'parent' ? '旗下品牌' : '持有的品牌（佔該品牌資本）'}</h3>
    <table>${rows.map((r) => `<tr><td><a href="#" data-id="brand:${r.brand.id}">${esc(r.brand.name)}</a></td><td class="num">${fmtPct(r.pct)}</td></tr>`).join('')}</table>
    <p class="hint">點品牌名稱看完整時間軸與來源。</p>`;
}

function renderPanel() {
  if (!state.selected) {
    panel.innerHTML = `<h2>點選圖表</h2><p class="hint">點任一品牌、股東、母公司或來源地，查看資本組成、收購時間與參考資料。拖動年份可看股權隨時間的變化，例如把年份拉到 2021 看 On 上市前的股東。</p>`;
    return;
  }
  panel.innerHTML = state.selected.startsWith('brand:') ? brandPanel(byId[state.selected.slice(6)]) : nodePanel(state.selected);
  panel.querySelectorAll('.when').forEach((b) => b.addEventListener('click', () => setYear(Number(b.dataset.year))));
  panel.querySelectorAll('a[data-id]').forEach((a) => a.addEventListener('click', (ev) => { ev.preventDefault(); select(a.dataset.id); }));
}

function render() {
  writeHash();
  renderCards();
  renderSankey();
  renderPanel();
}

let timer = null;
document.getElementById('play').addEventListener('click', (ev) => {
  if (timer) { clearInterval(timer); timer = null; ev.target.textContent = '▶ 播放'; return; }
  if (state.year >= 2026) setYear(1964);
  ev.target.textContent = '❚❚ 暫停';
  timer = setInterval(() => {
    if (state.year >= 2026) { clearInterval(timer); timer = null; ev.target.textContent = '▶ 播放'; return; }
    setYear(state.year + 1);
  }, 350);
});
yearInput.addEventListener('input', () => setYear(Number(yearInput.value)));
window.addEventListener('resize', () => renderSankey());

readHash();
setYear(state.year);
