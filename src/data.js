export const REGIONS = {
  US: { label: '美國 United States' },
  CH: { label: '瑞士 Switzerland' },
  JP: { label: '日本 Japan' },
  FR: { label: '法國 France' },
  BR: { label: '巴西 Brazil' },
  UK: { label: '英國 United Kingdom' },
  DE: { label: '德國 Germany' },
  CA: { label: '加拿大 Canada' },
  FI: { label: '芬蘭 Finland' },
  CN: { label: '中國／香港 China / HK', flagged: true },
  UNDISCLOSED: { label: '未逐一揭露 Undisclosed' },
};

export const SOURCES = {
  on_f1: { title: 'On Holding AG Form F-1 (Principal and Selling Shareholders)', publisher: 'SEC EDGAR', date: '2021-08-24', kind: 'filing', url: 'https://www.sec.gov/Archives/edgar/data/1858985/000119312521253415/d175570df1.htm' },
  on_20f21: { title: 'On Holding AG Form 20-F FY2021 (Major Shareholders)', publisher: 'SEC EDGAR', date: '2022-03-18', kind: 'filing', url: 'https://www.sec.gov/Archives/edgar/data/1858985/000185898522000006/onholdingag-20211231.htm' },
  on_20f22: { title: 'On Holding AG Form 20-F FY2022 (Major Shareholders)', publisher: 'SEC EDGAR', date: '2023-03-21', kind: 'filing', url: 'https://www.sec.gov/Archives/edgar/data/1858985/000185898523000011/onholdingag-20221231.htm' },
  on_20f24: { title: 'On Holding AG Form 20-F FY2024 (Major Shareholders)', publisher: 'SEC EDGAR', date: '2025-03-04', kind: 'filing', url: 'https://www.sec.gov/Archives/edgar/data/1858985/000185898525000003/onholdingag-20241231.htm' },
  on_20f25: { title: 'On Holding AG Form 20-F FY2025 (Major Shareholders)', publisher: 'SEC EDGAR', date: '2026-03-03', kind: 'filing', url: 'https://www.sec.gov/Archives/edgar/data/1858985/000185898526000008/onholdingag-20251231.htm' },
  hh_13g_2022: { title: 'Schedule 13G by Hillhouse Investment Management / HHLR on On Holding (5.3%)', publisher: 'SEC EDGAR', date: '2022-02-14', kind: 'filing', url: 'https://www.sec.gov/Archives/edgar/data/1858985/000090266422001730/p22-0786sc13g.htm' },
  hh_13g_2023: { title: 'Schedule 13G/A by Hillhouse Investment Management / HHLR on On Holding (1.9%)', publisher: 'SEC EDGAR', date: '2023-02-14', kind: 'filing', url: 'https://www.sec.gov/Archives/edgar/data/1858985/000090266423001814/p23-0213sc13ga.htm' },
  hillhouse_wiki: { title: 'Hillhouse Investment', publisher: 'Wikipedia', kind: 'reference', url: 'https://en.wikipedia.org/wiki/Hillhouse_Investment' },
  on_ipo_news: { title: 'Swiss shoemaker On valued at over $11 bn in NYSE debut', publisher: 'Business Today (Reuters)', date: '2021-09-16', kind: 'news', url: 'https://www.businesstoday.in/latest/corporate/story/swiss-shoemaker-on-valued-at-over-11-bn-in-nyse-debut-306830-2021-09-16' },

  hoka_wiki: { title: 'Hoka (brand)', publisher: 'Wikipedia', kind: 'reference', url: 'https://en.wikipedia.org/wiki/Hoka_(brand)' },
  hoka_pbt: { title: 'Deckers makes run for athletes with Hoka', publisher: 'Pacific Coast Business Times', date: '2013-04-05', kind: 'news', url: 'https://www.pacbiztimes.com/2013/04/05/deckers-makes-run-for-athletes-with-hoka/' },
  hoka_nooz: { title: 'Deckers acquires Hoka One One', publisher: 'Noozhawk', date: '2013', kind: 'news', url: 'https://www.noozhawk.com/?p=37229' },
  hoka_barchart: { title: 'Is the sky the limit for Deckers Outdoor stock?', publisher: 'Barchart', kind: 'news', url: 'https://www.barchart.com/story/news/21640519/is-the-sky-the-limit-for-deckers-outdoor-stock' },
  deck_proxy26: { title: 'Deckers Brands 2026 Proxy Statement (Security Ownership)', publisher: 'SEC EDGAR', date: '2026-07-24', kind: 'filing', url: 'https://www.sec.gov/Archives/edgar/data/910521/000091052126000018/deck-20260724.htm' },

  nke_wiki: { title: 'Nike, Inc.', publisher: 'Wikipedia', kind: 'reference', url: 'https://en.wikipedia.org/wiki/Nike,_Inc.' },
  nke_proxy26: { title: 'NIKE, Inc. 2026 Proxy Statement (Stock Holdings of Certain Owners)', publisher: 'SEC EDGAR', date: '2026-07-15', kind: 'filing', url: 'https://www.sec.gov/Archives/edgar/data/320187/000032018726000089/nke-20260715.htm' },
  nke_converse_8k: { title: 'NIKE 8-K: agreement to acquire Converse', publisher: 'SEC EDGAR', date: '2003-07', kind: 'filing', url: 'https://www.sec.gov/Archives/edgar/data/0000320187/000032018703000104/l9_20038-k.txt' },
  nke_10k03: { title: 'NIKE 10-K FY2003 (Converse acquisition, $305M cash)', publisher: 'SEC EDGAR', date: '2003-08', kind: 'filing', url: 'https://www.sec.gov/Archives/edgar/data/0000320187/000119312503031022/d10k.htm' },
  nke_umbro: { title: 'Iconix completes Umbro’s 225 million dollars acquisition', publisher: 'FashionUnited', date: '2012-12-05', kind: 'news', url: 'https://fashionunited.uk/v1/fashion/iconix-completes-umbroas-225-million-dollars-acquisition/2012120512109' },
  nke_colehaan: { title: 'NIKE, Inc. announces sale of Cole Haan to Apax Partners', publisher: 'NIKE press release (Mynewsdesk)', date: '2012-11-16', kind: 'company', url: 'https://www.mynewsdesk.com/dk/nike_denmark/pressreleases/nike-inc-announces-sale-of-cole-haan-to-apax-partners-828626' },
  nke_colehaan_globe: { title: 'Nike to sell Cole Haan brand', publisher: 'The Boston Globe', date: '2012-11-17', kind: 'news', url: 'https://www.bostonglobe.com/business/2012/11/17/nike-sell-cole-haan-brand-for/I3h0voiikr2auiu70Bg6PL/story.html' },
  nke_10q13: { title: 'NIKE 10-Q (Cole Haan and Umbro divestitures)', publisher: 'SEC EDGAR', date: '2013-01', kind: 'filing', url: 'https://www.sec.gov/Archives/edgar/data/0000320187/000119312513008172/d433378d10q.htm' },
  nke_10k09: { title: 'NIKE 10-K FY2009 (sale of Bauer Hockey)', publisher: 'SEC EDGAR', date: '2009-07', kind: 'filing', url: 'https://www.sec.gov/Archives/edgar/data/0000320187/000119312509155951/d10k.htm' },
  nke_bauer_news: { title: 'Nike sells Bauer', publisher: 'FashionUnited', date: '2008-04-29', kind: 'news', url: 'https://fashionunited.uk/news/fashion/nike-sells-bauer/2008042933727' },
  nke_10q08: { title: 'NIKE 10-Q FY2008 (sale of Starter to Iconix)', publisher: 'SEC EDGAR', date: '2008-01', kind: 'filing', url: 'https://www.sec.gov/Archives/edgar/data/0000320187/000032018709000006/f10q090107.htm' },
  nke_10k20: { title: 'NIKE 10-K FY2020 (sale of Hurley)', publisher: 'SEC EDGAR', date: '2020-07', kind: 'filing', url: 'https://www.sec.gov/Archives/edgar/data/0000320187/000032018720000047/nke-531202010k.htm' },

  tnf_wiki: { title: 'The North Face', publisher: 'Wikipedia', kind: 'reference', url: 'https://en.wikipedia.org/wiki/The_North_Face' },
  tompkins_wiki: { title: 'Douglas Tompkins', publisher: 'Wikipedia', kind: 'reference', url: 'https://en.wikipedia.org/wiki/Douglas_Tompkins' },
  klopp_archive: { title: 'Kenneth “Hap” Klopp papers (finding aid)', publisher: 'Utah State University Special Collections', kind: 'reference', url: 'https://usu.libraryhost.com/repositories/2/resources/2930' },
  tnf_s1: { title: 'The North Face, Inc. Form S-1 (1994 asset purchase by TNF Holdings)', publisher: 'SEC EDGAR', date: '1996', kind: 'filing', url: 'https://www.sec.gov/Archives/edgar/data/0001013749/000091205796023876/0000912057-96-023876.txt' },
  tnf_10k96: { title: 'The North Face, Inc. 10-K FY1996 (IPO, Nasdaq: TNFI)', publisher: 'SEC EDGAR', date: '1997', kind: 'filing', url: 'https://www.sec.gov/Archives/edgar/data/0001013749/000091205797010838/0000912057-97-010838.txt' },
  tnf_tender: { title: 'The North Face SC TO-T/A: VF tender offer results', publisher: 'SEC EDGAR', date: '2000-05', kind: 'filing', url: 'https://www.sec.gov/Archives/edgar/data/0001013749/000095010300000651/0000950103-00-000651.txt' },
  tnf_sbd: { title: 'The North Face acquired by VF Corp in cash deal', publisher: 'Sports Business Daily', date: '2000-04-10', kind: 'news', url: 'https://www.sportsbusinessdaily.com/Daily/Issues/2000/04/10/Finance/THE-NORTH-FACE-ACQUIRED-BY-VF-CORP-IN-$254M-CASH-DEAL.aspx' },
  goldwin_history: { title: 'The Goldwin Story (company history)', publisher: 'Goldwin Inc.', kind: 'company', url: 'https://about.goldwin.co.jp/en/about/history' },
  goldwin_nippon: { title: 'The North Face: A Storied US Brand and a Japanese Success Story', publisher: 'Nippon.com', kind: 'news', url: 'https://www.nippon.com/en/japan-topics/g02570/' },
  vfc_proxy26: { title: 'VF Corporation 2026 Proxy Statement (Beneficial Owners)', publisher: 'SEC EDGAR', date: '2026-06-15', kind: 'filing', url: 'https://www.sec.gov/Archives/edgar/data/103379/000119312526270610/d60482ddef14a.htm' },

  as_ipo: { title: 'Amer Sports, Inc. IPO prospectus (424B4, Principal Shareholders)', publisher: 'SEC EDGAR', date: '2024-02-02', kind: 'filing', url: 'https://www.sec.gov/Archives/edgar/data/1988894/000110465924010053/tm2322981-18_424b4.htm' },
  as_pricing: { title: 'Amer Sports Inc. Announces Pricing of its Initial Public Offering', publisher: 'Business Wire', date: '2024-01-31', kind: 'company', url: 'https://www.businesswire.com/news/home/20240131081309/en/Amer-Sports-Inc.-Announces-Pricing-of-its-Initial-Public-Offering' },
  as_20f23: { title: 'Amer Sports, Inc. Form 20-F FY2023 (Major Shareholders)', publisher: 'SEC EDGAR', date: '2024-03-18', kind: 'filing', url: 'https://www.sec.gov/Archives/edgar/data/1988894/000110465924035553/as-20231231x20f.htm' },
  as_20f24: { title: 'Amer Sports, Inc. Form 20-F FY2024 (Major Shareholders)', publisher: 'SEC EDGAR', date: '2025-03-07', kind: 'filing', url: 'https://www.sec.gov/Archives/edgar/data/1988894/000162828025011314/as-20241231.htm' },
  as_20f25: { title: 'Amer Sports, Inc. Form 20-F FY2025 (Major Shareholders, brand histories)', publisher: 'SEC EDGAR', date: '2026-02-26', kind: 'filing', url: 'https://www.sec.gov/Archives/edgar/data/1988894/000198889426000004/as-20251231.htm' },
  amer_salomon_gnw: { title: 'Amer Sports Acquires Salomon', publisher: 'GlobeNewswire (Amer Sports)', date: '2005-05-02', kind: 'company', url: 'https://www.globenewswire.com/news-release/2005/05/02/1858383/0/en/amer-sports-acquires-salomon.html' },
  adidas_salomon_sale: { title: 'adidas-Salomon to sell Salomon to Amer Sports Corporation (ad hoc)', publisher: 'OTS / euro adhoc', date: '2005-05-02', kind: 'company', url: 'https://www.ots.at/presseaussendung/OTE_20050502_OTE0002/euro-adhoc-adidas-salomon-ag-mergers-acquisitions-takeovers-adidas-salomon-to-sell-salomon-to-amer-sports-corporation-e' },
  salomon_wiki: { title: 'Salomon Group', publisher: 'Wikipedia', kind: 'reference', url: 'https://en.wikipedia.org/wiki/Salomon_Group' },
  arcteryx_wiki: { title: "Arc'teryx", publisher: 'Wikipedia', kind: 'reference', url: 'https://en.wikipedia.org/wiki/Arc%27teryx' },
  arcteryx_salomon_2001: { title: 'Salomon acquires Canadian outdoor specialist', publisher: 'Pambianco News', date: '2001-12-04', kind: 'news', url: 'https://www.pambianconews.com/2001/12/04/salomon-acquires-canadian-outdoor-specialist-5182/' },
  wilson_history: { title: 'Wilson Sporting Goods Company History', publisher: 'FundingUniverse', kind: 'reference', url: 'https://www.fundinguniverse.com/company-histories/wilson-sporting-goods-company-history/' },
  amer_group_history: { title: 'Amer Group plc', publisher: 'Encyclopedia.com', kind: 'reference', url: 'https://encyclopedia.com/books/politics-and-business-magazines/amer-group-plc' },

  mb_founder: { title: 'Founder Isamu Tatsuno', publisher: 'montbell (official)', kind: 'company', url: 'https://en.montbell.jp:443/company/founder/' },
  mb_uk: { title: 'About montbell', publisher: 'montbell UK (official)', kind: 'company', url: 'https://www.montbell.co.uk/pages/about-montbell' },
  mb_bunshun: { title: 'モンベル代表取締役会長 辰野勇', publisher: '文藝春秋', kind: 'news', url: 'https://bunshun.jp/bungeishunju/articles/h10197' },

  mz_yuho26: { title: '美津濃株式会社 有価証券報告書 第113期（沿革、大株主の状況）', publisher: 'EDINET（金融庁）', date: '2026-06-22', kind: 'filing', url: 'https://disclosure2dl.edinet-fsa.go.jp/searchdocument/pdf/S100YFWX.pdf' },
  mz_yuho25: { title: '美津濃株式会社 有価証券報告書 第112期（大株主の状況）', publisher: 'EDINET（金融庁）', date: '2025-06-19', kind: 'filing', url: 'https://disclosure2dl.edinet-fsa.go.jp/searchdocument/pdf/S100VZPV.pdf' },
  mz_wiki: { title: 'Mizuno', publisher: 'Wikipedia', kind: 'reference', url: 'https://en.wikipedia.org/wiki/Mizuno' },
};

const UNRESEARCHED_PUBLIC = [{ name: '公開市場股東（本期尚未研究）', origin: 'UNDISCLOSED', pct: 100 }];

const ANTA_NOTE = '香港上市的中國運動用品公司（安踏體育）。';
const FOUNTAINVEST_NOTE = '亞洲私募基金（方源資本），持股基金名為 FountainVest China Capital Partners Fund III。';
const TENCENT_NOTE = '中國科技公司（騰訊）。';
const MIZUNO_FOUNDATION_NOTE = '1970 年依創辦人水野利八遺願設立的公益財團。';
const JP_TRUST_NOTE = '日本信託銀行代管的信託帳戶，背後投資人（多為退休基金與投信）未揭露。';
const FOREIGN_CUSTODY_NOTE = '海外機構投資人的託管帳戶，實際投資人與國籍未揭露。';
const ANAMERED_NOTE ='Lululemon 創辦人 Chip Wilson 的投資公司，主要營業地在加拿大卑詩省。';

export const GROUPS = {
  amer: {
    name: 'Amer Sports',
    eras: [
      { from: 1989, parent: 'Amer Group／Amer Sports Oyj (赫爾辛基上市)', parentOrigin: 'FI', defaultHolders: UNRESEARCHED_PUBLIC, snapshots: [] },
      {
        from: 2019, parent: 'Amer Sports (安踏財團私有化)', parentOrigin: 'FI',
        defaultHolders: [
          { name: '安踏體育 ANTA Sports', origin: 'CN', pct: 56.0, note: `${ANTA_NOTE}比例取自 2024 年上市前公開說明書，2019–2023 年間可能略有變動。` },
          { name: 'Anamered (Chip Wilson)', origin: 'CA', pct: 20.6, note: ANAMERED_NOTE },
          { name: '方源資本 FountainVest', origin: 'CN', pct: 16.0, note: FOUNTAINVEST_NOTE },
          { name: '騰訊 Tencent', origin: 'CN', pct: 5.6, note: TENCENT_NOTE },
        ],
        snapshots: [],
      },
      {
        from: 2024, parent: 'Amer Sports, Inc. (NYSE: AS)', parentOrigin: 'FI', defaultHolders: UNRESEARCHED_PUBLIC,
        snapshots: [
          {
            asOf: '2024-02-29', basis: '普通股持股比例（上市後）', source: 'as_20f23',
            holders: [
              { name: '安踏體育 ANTA Sports', origin: 'CN', pct: 46.0, note: ANTA_NOTE },
              { name: 'Anamered (Chip Wilson)', origin: 'CA', pct: 20.6, note: ANAMERED_NOTE },
              { name: '方源資本 FountainVest', origin: 'CN', pct: 13.7, note: FOUNTAINVEST_NOTE },
              { name: '騰訊 Tencent', origin: 'CN', pct: 6.5, note: TENCENT_NOTE },
            ],
          },
          {
            asOf: '2025-02-01', basis: '普通股持股比例', source: 'as_20f24',
            holders: [
              { name: '安踏體育 ANTA Sports', origin: 'CN', pct: 42.5, note: ANTA_NOTE },
              { name: 'Anamered (Chip Wilson)', origin: 'CA', pct: 18.8, note: ANAMERED_NOTE },
              { name: '方源資本 FountainVest', origin: 'CN', pct: 12.6, note: FOUNTAINVEST_NOTE },
              { name: '騰訊 Tencent', origin: 'CN', pct: 5.7, note: TENCENT_NOTE },
            ],
          },
          {
            asOf: '2026-02-20', basis: '普通股持股比例', source: 'as_20f25',
            holders: [
              { name: '安踏體育 ANTA Sports', origin: 'CN', pct: 41.7, note: ANTA_NOTE },
              { name: 'Anamered (Chip Wilson)', origin: 'CA', pct: 17.9, note: ANAMERED_NOTE },
              { name: '方源資本 FountainVest', origin: 'CN', pct: 6.1, note: FOUNTAINVEST_NOTE },
              { name: '騰訊 Tencent', origin: 'CN', pct: 5.7, note: TENCENT_NOTE },
            ],
          },
        ],
      },
    ],
  },
};

const AMER_CHINA_EVENTS = [
  { date: '2019-04-01', type: 'acquired', title: '安踏財團收購 Amer Sports', to: '安踏體育等財團', counterpartyOrigin: 'CN', summary: '由安踏體育、方源資本、Chip Wilson 的 Anamered 與騰訊組成的財團收購芬蘭 Amer Sports，旗下品牌一併易主。上市前持股：安踏 56.0%、Anamered 20.6%、方源 16.0%、騰訊 5.6%。', sources: ['as_ipo'] },
  { date: '2024-02-01', type: 'ipo', title: 'Amer Sports 紐約上市 (AS)', summary: '以每股 13 美元發行 1.05 億股。上市後安踏仍為最大股東，持股 46.0%（2024-02-29）。', sources: ['as_pricing', 'as_20f23'] },
  { date: '2026-02-20', type: 'stake', title: '中國資本合計約 53.5%', counterpartyOrigin: 'CN', summary: '最新年報：安踏 41.7%、方源 6.1%、騰訊 5.7%，加總約 53.5%；方源自 2024 年的 12.6% 減持至 6.1%。', sources: ['as_20f25', 'as_20f24'] },
];

export const BRANDS = [
  {
    id: 'hoka',
    name: 'HOKA',
    origin: 'FR',
    founded: 2009,
    summary: '2009 年由前 Salomon 員工 Nicolas Mermoud 與 Jean-Luc Diard 在法國安錫創立；2012–2013 年間被美國上市公司 Deckers Brands 收購，現總部在加州 Goleta。',
    eras: [
      { from: 2009, parent: 'HOKA One One SAS', parentOrigin: 'FR', defaultHolders: [{ name: 'HOKA 創辦人 (Mermoud, Diard)', origin: 'FR', pct: 100 }], snapshots: [] },
      {
        from: 2013, parent: 'Deckers Brands (NYSE: DECK)', parentOrigin: 'US', defaultHolders: UNRESEARCHED_PUBLIC,
        snapshots: [{
          asOf: '2026-06-30', basis: '普通股持股比例', source: 'deck_proxy26',
          holders: [
            { name: 'BlackRock', origin: 'US', pct: 10.5 },
            { name: 'Vanguard', origin: 'US', pct: 7.8 },
            { name: 'Deckers 董事與高管', origin: 'US', pct: 0.4 },
          ],
        }],
      },
    ],
    events: [
      { date: '2009', type: 'founded', title: '於法國創立', summary: 'Nicolas Mermoud 與 Jean-Luc Diard（兩人皆曾任職 Salomon）在法國安錫創立 HOKA ONE ONE。Outside 雜誌另列 Christophe Aubonnet 為共同創辦人。', sources: ['hoka_wiki'] },
      { date: '2012-07', type: 'stake', title: 'Deckers 取得少數股權', to: 'Deckers Brands', summary: 'Deckers 先取得非控制性股權。Barchart 依財報整理，少數股權投資約 200 萬美元。', priceUSD: 2.0e6, sources: ['hoka_pbt', 'hoka_barchart'] },
      { date: '2013', type: 'acquired', title: 'Deckers 全資收購', to: 'Deckers Brands', stakePct: 100, summary: 'Deckers 宣布全資收購 HOKA。各來源完成時間不一（2012 年 9 月或 2013 年初）；Barchart 依財報整理，剩餘股權約 830 萬美元，總計約 1,030 萬美元。收購當時金額未公開。', priceUSD: 8.3e6, sources: ['hoka_nooz', 'hoka_pbt', 'hoka_barchart'] },
      { date: '2021-12-22', type: 'rename', title: '品牌更名為 HOKA', summary: '由 HOKA ONE ONE 簡化為 HOKA。', sources: ['hoka_wiki'] },
    ],
  },
  {
    id: 'on',
    name: 'On',
    origin: 'CH',
    founded: 2010,
    summary: '2010 年由 Olivier Bernhard、David Allemann、Caspar Coppetti 在蘇黎世創立。2021 年於紐約證交所上市（ONON）。創辦團隊以 B 類表決權股掌握過半投票權。上市前股東包括中國背景的高瓴資本（Hillhouse），2021 年底約佔 5.1% 經濟權益，2022 年底降至 1.9%。',
    eras: [
      { from: 2010, parent: 'On AG', parentOrigin: 'CH', defaultHolders: [{ name: 'On 創辦人 (Bernhard, Allemann, Coppetti)', origin: 'CH', pct: 100 }], snapshots: [] },
      {
        from: 2021, parent: 'On Holding AG (NYSE: ONON)', parentOrigin: 'CH', defaultHolders: UNRESEARCHED_PUBLIC,
        snapshots: [
          {
            asOf: '2021-12-31', basis: '總經濟權益', source: 'on_20f21',
            holders: [
              { name: 'On 創辦團隊', origin: 'CH', pct: 19.0, note: '五位創辦／執行成員合計；全體董事高管投票權 67.1%。' },
              { name: 'Stripes (Kenneth Fox)', origin: 'US', pct: 9.9 },
              { name: 'Carlos Alberto Sicupira', origin: 'BR', pct: 6.3 },
              { name: 'Marc Lemann', origin: 'BR', pct: 5.7 },
              { name: 'Hillhouse 高瓴', origin: 'CN', pct: 5.1, note: '透過香港註冊的 HH OAG Holdings HK 等持有，張磊 (Lei Zhang) 可被視為具控制權。' },
              { name: 'Point Break Capital (Alex Pérez)', origin: 'US', pct: 5.1, note: '基金管理公司位於邁阿密，Alex Pérez 為巴西籍、前 3G Capital 合夥人。' },
            ],
          },
          {
            asOf: '2022-12-31', basis: '總經濟權益（高瓴為 13G/A 申報的 A 類股比例）', source: 'on_20f22',
            holders: [
              { name: 'On 創辦團隊', origin: 'CH', pct: 18.8, note: '全體董事高管投票權 65.0%。' },
              { name: 'FMR (Fidelity)', origin: 'US', pct: 8.9 },
              { name: 'Stripes (Kenneth Fox)', origin: 'US', pct: 6.5 },
              { name: 'Carlos Alberto Sicupira', origin: 'BR', pct: 6.3 },
              { name: 'Marc Lemann', origin: 'BR', pct: 5.7 },
              { name: 'Point Break Capital (Alex Pérez)', origin: 'US', pct: 4.3 },
              { name: 'Hillhouse 高瓴', origin: 'CN', pct: 1.9, note: '年報未列（低於 5%）；數字取自高瓴 2023-02 的 13G/A，為 A 類股比例。' },
            ],
          },
          {
            asOf: '2024-12-31', basis: '總經濟權益', source: 'on_20f24',
            holders: [
              { name: 'On 創辦團隊', origin: 'CH', pct: 15.9, note: '五位創辦／執行成員合計；投票權 59.8%（全體董事高管）。' },
              { name: 'FMR (Fidelity)', origin: 'US', pct: 8.9 },
              { name: 'Carlos Alberto Sicupira', origin: 'BR', pct: 6.1 },
              { name: 'Marc Lemann', origin: 'BR', pct: 5.6 },
              { name: 'AllianceBernstein', origin: 'US', pct: 5.4 },
              { name: 'Point Break Capital (Alex Pérez)', origin: 'US', pct: 3.1 },
              { name: 'Stripes (Kenneth Fox)', origin: 'US', pct: 0.9 },
            ],
          },
          {
            asOf: '2025-12-31', basis: '總經濟權益', source: 'on_20f25',
            holders: [
              { name: 'On 創辦團隊', origin: 'CH', pct: 13.8, note: '投票權 57.1%（全體董事高管）。' },
              { name: 'FMR (Fidelity)', origin: 'US', pct: 9.0 },
              { name: 'Carlos Alberto Sicupira', origin: 'BR', pct: 6.0 },
              { name: 'Morgan Stanley', origin: 'US', pct: 5.8 },
              { name: 'Marc Lemann', origin: 'BR', pct: 5.4 },
              { name: 'Point Break Capital (Alex Pérez)', origin: 'US', pct: 3.0 },
            ],
          },
        ],
      },
    ],
    events: [
      { date: '2010', type: 'founded', title: '於瑞士蘇黎世創立', summary: 'Olivier Bernhard、David Allemann、Caspar Coppetti 共同創立 On。', sources: ['on_ipo_news', 'on_f1'] },
      { date: '2019', type: 'stake', title: 'Roger Federer 入股', summary: 'Federer 以「共同創業者」身分投資，金額未公開（媒體估計約 5,000 萬瑞郎，未經證實）。', sources: ['on_f1'] },
      { date: '2021-08-24', type: 'stake', title: '上市前股東揭露：高瓴持 6.1%', to: 'Hillhouse 高瓴', counterpartyOrigin: 'CN', stakePct: 6.1, summary: 'F-1 揭露香港註冊的 HH OAG Holdings HK Limited（高瓴 Hillhouse Fund IV 全資）持有 15,073,750 股 A 類股，佔 A 類 6.1%、總投票權 2.5%。', sources: ['on_f1', 'hillhouse_wiki'] },
      { date: '2021-09-15', type: 'ipo', title: '紐約證交所上市 (ONON)', summary: '以每股 24 美元發行 3,110 萬股，募資約 7.46 億美元；首日估值約 113.5 億美元。', sources: ['on_ipo_news'] },
      { date: '2021-12-31', type: 'stake', title: '高瓴持股 5.3%', to: 'Hillhouse 高瓴', counterpartyOrigin: 'CN', stakePct: 5.3, summary: '高瓴旗下 HIM 與 HHLR 合計申報持有 15,973,750 股 A 類股（5.3%）。', sources: ['hh_13g_2022'] },
      { date: '2022-12-31', type: 'divested', title: '高瓴減持至 1.9%', from: 'Hillhouse 高瓴', counterpartyOrigin: 'CN', stakePct: 1.9, summary: '修正申報顯示高瓴僅剩 5,468,504 股 A 類股（1.9%），低於 5% 申報門檻。之後的年報主要股東表已不再列出高瓴；目前是否仍持有少量股份未揭露。', sources: ['hh_13g_2023', 'on_20f24'] },
    ],
  },
  {
    id: 'nike',
    name: 'Nike',
    origin: 'US',
    founded: 1964,
    summary: '1964 年由 Phil Knight 與教練 Bill Bowerman 以 Blue Ribbon Sports 名義創立，1971 年更名 Nike，1980 年上市。Knight 家族透過 Swoosh, LLC 持有約 79% 的 A 類股，可選出四分之三董事。',
    eras: [
      { from: 1964, parent: 'Blue Ribbon Sports / Nike', parentOrigin: 'US', defaultHolders: [{ name: 'Nike 創辦人 (Knight, Bowerman)', origin: 'US', pct: 100 }], snapshots: [] },
      {
        from: 1980, parent: 'NIKE, Inc. (NYSE: NKE)', parentOrigin: 'US', defaultHolders: UNRESEARCHED_PUBLIC,
        snapshots: [{
          asOf: '2026-06-30', basis: '佔 A+B 類總股數（由委託書數字推算）', source: 'nke_proxy26',
          holders: [
            { name: 'Knight 家族 (Swoosh, LLC + Phil Knight)', origin: 'US', pct: 17.5, note: 'Swoosh 持 A 類 2.2175 億股（A 類 78.8%）＋ Phil Knight 個人約 3,580 萬股。總股數由 A 類 78.8% 與 Vanguard 佔 B 類 7.5% 反推約 14.74 億股。' },
            { name: 'Vanguard', origin: 'US', pct: 6.1 },
            { name: 'State Street', origin: 'US', pct: 4.0 },
          ],
        }],
      },
    ],
    events: [
      { date: '1964-01-25', type: 'founded', title: '以 Blue Ribbon Sports 創立', summary: 'Phil Knight 與 Bill Bowerman 各出資一半，起初代理日本鬼塚虎 (Onitsuka Tiger) 鞋款。', sources: ['nke_wiki'] },
      { date: '1971-05-30', type: 'rename', title: '更名為 Nike', summary: '品牌名稱由員工 Jeff Johnson 提出。', sources: ['nke_wiki'] },
      { date: '1980-12', type: 'ipo', title: '公開上市', summary: '上市後採 A/B 雙類股結構，A 類股東選出約四分之三董事。日商雙日 (Sojitz) 至今仍持有 30 萬股可贖回優先股，源自早年日商岩井對 Blue Ribbon Sports 的融資。', sources: ['nke_wiki', 'nke_proxy26'] },
      { date: '1988', type: 'acquired', title: '收購 Cole Haan', summary: '約 9,500 萬美元（年份有 1988／1998 兩種說法）。', priceUSD: 95e6, sources: ['nke_colehaan_globe'] },
      { date: '1995', type: 'acquired', title: '收購 Bauer（冰球）', summary: 'Nike 收購 Bauer 冰球裝備品牌。', sources: ['nke_bauer_news'] },
      { date: '2003-09-04', type: 'acquired', title: '收購 Converse', stakePct: 100, summary: '以約 3.05 億美元現金收購 Converse 100% 股權；2003 年 7 月 9 日宣布，9 月 4 日完成。', priceUSD: 305e6, sources: ['nke_converse_8k', 'nke_10k03'] },
      { date: '2007-12-17', type: 'divested', title: '出售 Starter 給 Iconix', summary: '6,000 萬美元現金出售（2004 年購入）。', priceUSD: 60e6, sources: ['nke_10q08'] },
      { date: '2008', type: 'acquired', title: '收購 Umbro', summary: '以 5.82 億美元收購英國品牌 Umbro。', priceUSD: 582e6, sources: ['nke_umbro'] },
      { date: '2008-04-17', type: 'divested', title: '出售 Bauer', summary: '出售給 Kohlberg & Company 與 W. Graeme Roustan 領導的投資團體；新聞稿稱 2 億美元，10-K 記載現金 1.892 億美元。', priceUSD: 189.2e6, sources: ['nke_10k09', 'nke_bauer_news'] },
      { date: '2012-11-16', type: 'divested', title: '出售 Cole Haan 給 Apax Partners', summary: '以 5.7 億美元出售給私募基金 Apax Partners。', priceUSD: 570e6, sources: ['nke_colehaan', 'nke_10q13'] },
      { date: '2012-11-30', type: 'divested', title: '出售 Umbro 給 Iconix', summary: '以 2.25 億美元出售 Umbro 品牌資產。', priceUSD: 225e6, sources: ['nke_umbro', 'nke_10q13'] },
      { date: '2019-12-06', type: 'divested', title: '出售 Hurley', summary: '出售全資子品牌 Hurley 的資產與負債，Nike 稱影響不重大。買方未在此來源中列明。', sources: ['nke_10k20'] },
    ],
  },
  {
    id: 'converse',
    name: 'Converse',
    origin: 'US',
    founded: 1908,
    summary: '美國品牌，2003 年起為 Nike 全資子公司，因此資本組成與 Nike 相同。2003 年前的股權沿革尚未研究。',
    eras: [
      { from: 2003, parent: 'NIKE, Inc. (NYSE: NKE)', parentOrigin: 'US', inheritFrom: 'nike', snapshots: [] },
    ],
    events: [
      { date: '2003-09-04', type: 'acquired', title: '被 Nike 收購', from: 'Converse Inc.', to: 'NIKE, Inc.', stakePct: 100, summary: 'Nike 以約 3.05 億美元現金取得 100% 股權。', priceUSD: 305e6, sources: ['nke_converse_8k', 'nke_10k03'] },
    ],
  },
  {
    id: 'arcteryx',
    name: "Arc'teryx",
    origin: 'CA',
    founded: 1989,
    summary: '1989 年由 Dave Lane 在加拿大北溫哥華以 Rock Solid 名義創立，1991 年更名。2001 年被法國 Salomon（當時屬 adidas）收購，2005 年隨 Salomon 轉給芬蘭 Amer Sports，2019 年起由中國安踏體育為首的財團控股。',
    eras: [
      { from: 1989, parent: "Arc'teryx Equipment (Rock Solid)", parentOrigin: 'CA', defaultHolders: [{ name: "Arc'teryx 創辦人", origin: 'CA', pct: 100 }], snapshots: [] },
      { from: 2002, parent: 'adidas-Salomon AG', parentOrigin: 'DE', defaultHolders: UNRESEARCHED_PUBLIC, snapshots: [] },
      { from: 2005, parent: 'Amer Sports', parentOrigin: 'FI', inheritFrom: 'amer', snapshots: [] },
    ],
    events: [
      { date: '1989', type: 'founded', title: '於北溫哥華創立', summary: 'Dave Lane 以 Rock Solid 名義創立，最初生產攀岩裝備。', sources: ['arcteryx_wiki', 'as_20f25'] },
      { date: '1991', type: 'rename', title: "更名為 Arc'teryx", summary: '更名時由 Jeremy Guard 主導。', sources: ['arcteryx_wiki'] },
      { date: '2001-12', type: 'acquired', title: 'Salomon 收購', to: 'Salomon (adidas-Salomon)', summary: 'Salomon 宣布簽約收購 Arc’teryx Equipment Inc.，金額未公開。當時 Salomon 為德國 adidas-Salomon AG 旗下。', sources: ['arcteryx_salomon_2001'] },
      { date: '2005-10', type: 'acquired', title: '隨 Salomon 轉給 Amer Sports', to: 'Amer Sports', summary: 'adidas 將 Salomon 事業部（含 Salomon、Mavic、Bonfire、Arc’teryx、Cliché）出售給 Amer Sports，企業價值約 4.85 億歐元。', sources: ['amer_salomon_gnw', 'adidas_salomon_sale'] },
      ...AMER_CHINA_EVENTS,
    ],
  },
  {
    id: 'salomon',
    name: 'Salomon',
    origin: 'FR',
    founded: 1947,
    summary: '1947 年由 François Salomon 在法國安錫創立。1997 年被 adidas 收購，2005 年轉售芬蘭 Amer Sports，2019 年起由中國安踏體育為首的財團控股。',
    eras: [
      { from: 1947, parent: 'Salomon SA', parentOrigin: 'FR', defaultHolders: [{ name: 'Salomon 家族', origin: 'FR', pct: 100 }], snapshots: [] },
      { from: 1997, parent: 'adidas-Salomon AG', parentOrigin: 'DE', defaultHolders: UNRESEARCHED_PUBLIC, snapshots: [] },
      { from: 2005, parent: 'Amer Sports', parentOrigin: 'FI', inheritFrom: 'amer', snapshots: [] },
    ],
    events: [
      { date: '1947', type: 'founded', title: '於法國安錫創立', summary: 'François Salomon 從製作滑雪板鋼邊的小工坊起家，其子 Georges 帶領公司發展滑雪固定器等產品。', sources: ['salomon_wiki'] },
      { date: '1997', type: 'acquired', title: 'adidas 收購', to: 'adidas', summary: 'adidas 收購 Salomon 集團（含 TaylorMade），母公司更名為 adidas-Salomon AG。', sources: ['salomon_wiki'] },
      { date: '2005-10-20', type: 'acquired', title: 'Amer Sports 收購', to: 'Amer Sports', summary: 'adidas 以企業價值約 4.85 億歐元將 Salomon 事業部出售給 Amer Sports，2005 年 5 月 2 日宣布。', sources: ['amer_salomon_gnw', 'adidas_salomon_sale', 'salomon_wiki'] },
      ...AMER_CHINA_EVENTS,
    ],
  },
  {
    id: 'wilson',
    name: 'Wilson',
    origin: 'US',
    founded: 1914,
    summary: '1914 年創立於芝加哥的美國運動器材品牌。1970 年起歸 PepsiCo，1985 年轉手，1989 年被芬蘭 Amer Group 收購，2019 年起由中國安踏體育為首的財團控股。',
    eras: [
      { from: 1970, parent: 'PepsiCo', parentOrigin: 'US', defaultHolders: UNRESEARCHED_PUBLIC, snapshots: [] },
      { from: 1985, parent: 'WSGC Holdings (Wesray)', parentOrigin: 'US', defaultHolders: [{ name: 'WSGC Holdings／Wesray Capital', origin: 'US', pct: 100 }], snapshots: [] },
      { from: 1989, parent: 'Amer Sports', parentOrigin: 'FI', inheritFrom: 'amer', snapshots: [] },
    ],
    events: [
      { date: '1914', type: 'founded', title: '於芝加哥創立', summary: 'Amer Sports 年報記載 Wilson 品牌創立於 1914 年。1970 年前的股權沿革尚未研究。', sources: ['as_20f25'] },
      { date: '1970', type: 'acquired', title: 'PepsiCo 取得控制權', to: 'PepsiCo', summary: 'Wilson 歸入 PepsiCo 旗下，按產品類別拆分事業部。', sources: ['wilson_history', 'amer_group_history'] },
      { date: '1985', type: 'acquired', title: '轉手 WSGC Holdings', to: 'WSGC Holdings／Wesray', summary: '各來源說法不一：Encyclopedia.com 稱售予 Wesray Capital，FundingUniverse 稱由 WSGC Holdings 買下。', sources: ['wilson_history', 'amer_group_history'] },
      { date: '1989-02', type: 'acquired', title: '芬蘭 Amer Group 收購', to: 'Amer Group', summary: 'Amer Group 關係企業與 WSGC Holdings 合併，Wilson 成為 Amer 全資子公司，當時為芬蘭最大的海外收購案。', sources: ['wilson_history', 'amer_group_history'] },
      ...AMER_CHINA_EVENTS,
    ],
  },
  {
    id: 'montbell',
    name: 'mont-bell',
    origin: 'JP',
    founded: 1975,
    summary: '1975 年 8 月由登山家辰野勇在大阪創立，未上市。現由辰野勇任會長、其子辰野岳史任社長。持股未公開，此處依經營者推定為家族控股。',
    eras: [
      { from: 1975, parent: '株式会社モンベル (未上市)', parentOrigin: 'JP', defaultHolders: [{ name: '辰野家族（推定，持股未公開）', origin: 'JP', pct: 100 }], snapshots: [] },
    ],
    events: [
      { date: '1975-08-01', type: 'founded', title: '於大阪創立', summary: '辰野勇 28 歲時創立モンベル，第一項產品為化纖睡袋。創業靈感來自 1969 年攀登艾格峰北壁。', sources: ['mb_founder', 'mb_uk'] },
      { date: '2024', type: 'note', title: '家族接班', summary: '辰野勇為代表取締役會長，辰野岳史為代表取締役社長；公司未公開股東結構。', sources: ['mb_bunshun'] },
    ],
  },
  {
    id: 'mizuno',
    name: 'Mizuno',
    origin: 'JP',
    founded: 1906,
    summary: '1906 年由水野利八與弟弟水野利三在大阪創立，1961 年起在日本上市（東證 8022），從未被收購。最大股東是創辦人遺願設立的Mizuno 運動振興財團，社長水野明人為創辦家族成員。',
    eras: [
      { from: 1906, parent: '水野兄弟商會', parentOrigin: 'JP', defaultHolders: [{ name: '水野家族（推定，上市前持股未公開）', origin: 'JP', pct: 100 }], snapshots: [] },
      {
        from: 1961, parent: '美津濃株式會社 (東證: 8022)', parentOrigin: 'JP', defaultHolders: UNRESEARCHED_PUBLIC,
        snapshots: [
          {
            asOf: '2025-03-31', basis: '發行股數（不含庫藏股）比例，前十大股東', source: 'mz_yuho25',
            holders: [
              { name: 'Mizuno 運動振興財團', origin: 'JP', pct: 17.1, note: MIZUNO_FOUNDATION_NOTE },
              { name: '日本 Master Trust 信託銀行（信託帳戶）', origin: 'JP', pct: 13.1, note: JP_TRUST_NOTE },
              { name: '日本 Custody 銀行（信託帳戶）', origin: 'JP', pct: 8.3, note: JP_TRUST_NOTE },
              { name: 'State Street Bank and Trust（託管帳戶）', origin: 'UNDISCLOSED', pct: 6.8, note: FOREIGN_CUSTODY_NOTE },
              { name: '三井住友銀行', origin: 'JP', pct: 3.6 },
              { name: 'J.P. Morgan Chase Bank（託管帳戶）', origin: 'UNDISCLOSED', pct: 3.1, note: FOREIGN_CUSTODY_NOTE },
              { name: '日本生命保險', origin: 'JP', pct: 2.7 },
              { name: '美津濃員工持股會', origin: 'JP', pct: 2.0 },
              { name: 'BNY Mellon（託管帳戶）', origin: 'UNDISCLOSED', pct: 1.7, note: FOREIGN_CUSTODY_NOTE },
              { name: '第一生命保險', origin: 'JP', pct: 1.3 },
            ],
          },
          {
            asOf: '2026-03-31', basis: '發行股數（不含庫藏股）比例，前十大股東', source: 'mz_yuho26',
            holders: [
              { name: 'Mizuno 運動振興財團', origin: 'JP', pct: 17.3, note: MIZUNO_FOUNDATION_NOTE },
              { name: '日本 Master Trust 信託銀行（信託帳戶）', origin: 'JP', pct: 10.5, note: JP_TRUST_NOTE },
              { name: '日本 Custody 銀行（信託帳戶）', origin: 'JP', pct: 9.9, note: JP_TRUST_NOTE },
              { name: 'State Street Bank and Trust（託管帳戶）', origin: 'UNDISCLOSED', pct: 7.2, note: FOREIGN_CUSTODY_NOTE },
              { name: '三井住友銀行', origin: 'JP', pct: 3.7 },
              { name: 'J.P. Morgan Chase Bank（託管帳戶）', origin: 'UNDISCLOSED', pct: 3.0, note: FOREIGN_CUSTODY_NOTE },
              { name: '日本生命保險', origin: 'JP', pct: 2.7 },
              { name: '美津濃員工持股會', origin: 'JP', pct: 1.9 },
              { name: '第一生命保險', origin: 'JP', pct: 1.5 },
              { name: 'BNY Mellon（託管帳戶）', origin: 'UNDISCLOSED', pct: 1.4, note: FOREIGN_CUSTODY_NOTE },
            ],
          },
        ],
      },
    ],
    events: [
      { date: '1906-04', type: 'founded', title: '於大阪創立', summary: '水野利八在大阪市北區創立水野兄弟商會，製造販售運動服裝；1913 年開始生產棒球與手套。', sources: ['mz_yuho26', 'mz_wiki'] },
      { date: '1923-07', type: 'note', title: '改組為股份公司', summary: '改組為美津濃運動用品株式會社（資本額 150 萬日圓），1942 年 1 月更名為美津濃株式會社。', sources: ['mz_yuho26'] },
      { date: '1961-10', type: 'ipo', title: '大阪證交所上市', summary: '1961 年 10 月於大阪證交所二部上市，1962 年 12 月於東京證交所二部上市，1972 年升為一部；2022 年起屬東證 Prime 市場。', sources: ['mz_yuho26'] },
      { date: '1970-09', type: 'note', title: '設立水野運動振興會', summary: '依創辦人水野利八遺願設立財團，即今日的公益財團法人 Mizuno 運動振興財團（ミズノスポーツ振興財団），現為最大股東（約 17%）。', sources: ['mz_yuho26', 'mz_wiki'] },
      { date: '2012-06', type: 'acquired', title: '收購セノー（SENOH）', stakePct: 100, summary: 'Mizuno 取得日本體育器材製造商セノー株式會社全部股份，成為完全子公司。', sources: ['mz_yuho26'] },
      { date: '2013-01', type: 'acquired', title: '收購義大利代理商', stakePct: 100, summary: 'Mizuno 取得義大利原代理商全部股權，改名為 MIZUNO ITALIA S.R.L.。', sources: ['mz_yuho26'] },
      { date: '2020-05', type: 'acquired', title: '收購シャープ産業', stakePct: 100, summary: 'Mizuno 取得神戶運動用品製造商シャープ産業株式會社全部股份，成為完全子公司。', sources: ['mz_yuho26'] },
      { date: '2026-03-31', type: 'note', title: '外國法人合計約 21%', summary: '依股東類別統計，外國法人等持有約 21.0%，金融機構 30.6%，其他法人 23.2%，個人 23.7%。海外託管帳戶背後的實際投資人未揭露，未發現中國或香港投資人列名大股東。', sources: ['mz_yuho26'] },
      { date: '2026-05-12', type: 'stake', title: 'GMO 申報持股 5.01%', to: 'Grantham, Mayo, Van Otterloo & Co.', stakePct: 5.01, counterpartyOrigin: 'US', summary: '美國資產管理公司 GMO 提出大量保有報告書，持股 5.01%。公司無法確認其 3 月 31 日的實際持股，因此未列入大股東表。', sources: ['mz_yuho26'] },
    ],
  },
  {
    id: 'tnf',
    name: 'The North Face',
    origin: 'US',
    founded: 1966,
    summary: '1966 年由 Douglas 與 Susie Tompkins 在舊金山創立，歷經四次易主後於 2000 年被 VF Corporation 收購。日本與韓國的商標權自 1994 年起由日本 Goldwin 持有。',
    eras: [
      { from: 1966, parent: 'The North Face (Tompkins)', parentOrigin: 'US', defaultHolders: [{ name: 'Douglas & Susie Tompkins', origin: 'US', pct: 100 }], snapshots: [] },
      { from: 1968, parent: 'The North Face (Klopp)', parentOrigin: 'US', defaultHolders: [{ name: 'Kenneth “Hap” Klopp', origin: 'US', pct: 100 }], snapshots: [] },
      { from: 1988, parent: 'Odyssey International (Bill Simon)', parentOrigin: 'US', defaultHolders: [{ name: 'Odyssey International', origin: 'US', pct: 100 }], snapshots: [] },
      { from: 1994, parent: 'TNF Holdings Company', parentOrigin: 'US', defaultHolders: [{ name: 'J.H. Whitney & Co. 等', origin: 'US', pct: 100 }], snapshots: [] },
      { from: 1996, parent: 'The North Face, Inc. (Nasdaq: TNFI)', parentOrigin: 'US', defaultHolders: UNRESEARCHED_PUBLIC, snapshots: [] },
      {
        from: 2000, parent: 'VF Corporation (NYSE: VFC)', parentOrigin: 'US', defaultHolders: UNRESEARCHED_PUBLIC,
        snapshots: [{
          asOf: '2025-12-31', basis: '普通股持股比例', source: 'vfc_proxy26',
          holders: [
            { name: 'Barbey 家族信託 (PNC 共同受託)', origin: 'US', pct: 9.7, note: 'VF 創辦家族信託。' },
            { name: 'Vanguard', origin: 'US', pct: 9.5 },
            { name: 'Dodge & Cox', origin: 'US', pct: 8.4 },
            { name: 'BlackRock', origin: 'US', pct: 7.4 },
            { name: 'M&G plc', origin: 'UK', pct: 6.6 },
            { name: 'Todd Barbey', origin: 'US', pct: 5.2, note: '可能與家族信託部分重疊，委託書未加總。' },
            { name: 'Northern Trust', origin: 'US', pct: 5.1 },
          ],
        }],
      },
    ],
    events: [
      { date: '1966', type: 'founded', title: '於舊金山創立', summary: 'Douglas 與 Susie Tompkins 以 5,000 美元貸款創業，第一家店於 1966 年 10 月開幕。', sources: ['tompkins_wiki', 'tnf_wiki'] },
      { date: '1968', type: 'acquired', title: '出售給 Hap Klopp', to: 'Kenneth “Hap” Klopp', summary: 'Klopp 以約 5 萬美元買下（年份有 1967／1968 兩說），經營 20 年。', priceUSD: 50e3, sources: ['klopp_archive', 'tompkins_wiki'] },
      { date: '1988', type: 'acquired', title: '出售給 Odyssey International', to: 'Odyssey International', summary: 'Klopp 將公司售予 Bill Simon 的 Odyssey International。', sources: ['klopp_archive'] },
      { date: '1994', type: 'acquired', title: '破產拍賣，J.H. Whitney 接手', to: 'TNF Holdings', summary: 'Odyssey 母公司申請破產保護後，由 J.H. Whitney & Co. 等組成的 TNF Holdings 以 6,210 萬美元買下資產。', priceUSD: 62.1e6, sources: ['tnf_s1'] },
      { date: '1994', type: 'rights', title: 'Goldwin 取得日韓商標權', to: 'Goldwin (日本)', summary: 'Goldwin 自 1978 年起為日本代理商，1994 年（部分資料記 1995 年）買下日本與韓國的永久商標權。日本市場的 TNF 產品由 Goldwin 開發。', sources: ['goldwin_history', 'goldwin_nippon'] },
      { date: '1996-07', type: 'ipo', title: 'Nasdaq 上市 (TNFI)', summary: '以每股 14 美元發行 2,823,611 股，淨募資約 3,510 萬美元。', sources: ['tnf_10k96'] },
      { date: '2000-05', type: 'acquired', title: '被 VF Corporation 收購', to: 'VF Corporation', stakePct: 100, summary: 'VF 以每股 2 美元公開收購，約 82% 股東應賣，之後合併成全資子公司；股權價值約 2,540 萬美元。', priceUSD: 25.4e6, sources: ['tnf_tender', 'tnf_sbd'] },
    ],
  },
];
