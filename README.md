# brand-sourcer

A Sankey diagram that shows where a brand's capital comes from: country of capital → shareholder → parent company → brand. Every ownership figure and event links to its filing or news source. The UI is in Traditional Chinese, for Taiwanese readers who want to see which brands carry capital from China.

## Run

```sh
npm start        # python3 -m http.server 8000, then open http://localhost:8000
npm run check    # validate src/data.js
```

The app is static HTML with ES modules. Open it through a local server, not `file://`.

## Data model

All data lives in `src/data.js`.

- `SOURCES` holds every cited filing, news article, or reference.
- Each brand in `BRANDS` has `eras`, one per controlling owner. An era has `snapshots` of disclosed shareholders, each with an `asOf` date, a `basis` (economic interest, share class), and a source.
- `events` is the timeline: founding, acquisitions, stake changes, IPOs, divestitures. Each event cites at least one source.
- `GROUPS` holds a parent company that owns several brands, such as Amer Sports (Arc'teryx, Salomon, Wilson). A brand era with `inheritFrom: '<group or brand id>'` takes its shareholders from that owner, so the data lives in one place.

`src/model.js` turns this into a composition for a selected year. It picks the latest snapshot on or before that year. The share that no filing names becomes "其他公開市場股東（未逐一揭露）". A region with `flagged: true` (China / HK) is counted as China capital.

## Adding a brand

1. Add sources to `SOURCES`.
2. Add a `BRANDS` entry with eras, snapshots, and events.
3. Add the brand's logo as `assets/logos/<id>.svg` with a transparent background, and record where you found it in `assets/logos/SOURCES.md`.
4. Run `npm run check`. It fails on a missing logo, a missing or unused source, holder percentages over 100, or an out-of-order era.

## Limits

- Listed companies disclose only holders above 5%. The rest shows as undisclosed.
- Years before a public company's first researched snapshot show "公開市場股東（本期尚未研究）".
- mont-bell is private. Its family ownership is inferred from its management, not from a disclosure.
