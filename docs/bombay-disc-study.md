# Bombay disc study

This reconstruction turns one preserved disc illustration into a Svelte/SVG release timeline. The original JPEG remains an independent reference. The chart uses a selected, sourced dataset for DIVINE, Emiway Bantai, Naezy, The Siege, and MC Altaf; it does not reproduce a recovered original dataset.

## What the image establishes

Approximate measurements in the original Bombay panel:

| Feature | Measurement or interpretation |
| --- | --- |
| Centre | `(447, 369)` |
| Artist lane centre radii, inner to outer | `197, 227, 256, 286, 316 px` |
| Lane thickness / gap | `27 px / 3 px` |
| Artist order, inner to outer | DIVINE, Emiway Bantai, Naezy, The Siege, MC Altaf |
| Calendar | 2013–2025, with major labels every four years |
| Start angle | `−36°`, using SVG coordinates: zero points right, positive angles turn clockwise |
| Time direction / sweep | Counterclockwise through `324°`; 2025 reaches `−360°` (the right-hand seam) |

The artwork contains 23 coloured marks. Its marks have no project titles, so their identities cannot be recovered from colour and position alone. The reconstruction also contains 23 projects; matching counts do not establish a one-to-one correspondence.

The apparent lane starts in the image are roughly 2013, 2013, 2016, 2016, and 2018. Those are geometric inferences, not verified career starts. They are not treated as historical evidence.

## What the chart encodes

The user clarified that project bands represent release dates and that their widths only make them visible. A release is therefore a point on the calendar. The band is positioned at the sourced date; its width is a display choice, with no production-duration, popularity, or career-length meaning.

The calendar maps elapsed UTC time from `2013-01-01` to `2025-01-01`, including leap days, onto the shared sweep. Included releases precede the endpoint. Albums use `7.2°` display bands; EPs and mixtapes use `3.6°`. Every marker fills its artist lane. Display centers may move locally to make room for full-width markers and a minimum 1.4° gap between projects; this includes markers at calendar boundaries. Exact UTC date angles remain in the layout metadata, while details and the list show the unchanged release dates. Spacing uses the full selection so filtering does not reposition surviving records.

Lane beginnings use explicitly labelled release anchors:

| Artist | Anchor | Meaning |
| --- | --- | --- |
| DIVINE | 21 March 2013 — *Voice of the Streets* | Official video upload |
| Emiway Bantai | 24 May 2013 — *Glint Lock* | Original official upload; the streaming edition is later |
| Naezy | 7 January 2014 — *Aafat!* | Introductory official upload |
| The Siege | 26 August 2019 — *Bubblecars* | First verified project in this selection; earlier music is not dated here |
| MC Altaf | 6 June 2018 — *Wassup* | Documented solo release, following earlier group activity |

The source for each anchor is stored alongside it. These anchors have different evidence bases and are not definitive career beginnings. Year-only evidence retains year precision in the source data and accessible artist description. The ring has a consistent vinyl surface, without grey hatching.

## Evidence and limits

[The scene dataset](../src/lib/data/bombay.ts) is the maintained source of truth. Each project contains a stable ID, artist ID, title, catalog date, format, and source links. Collaborative credits and material discrepancies accompany the relevant record. The UI calls these dates **Catalog release** because a linked edition can differ from the first video, single, or promotional rollout.

Format follows explicit artist descriptions and release metadata rather than the original pixels or a platform’s generic album page heading:

- *Street Dreams* is a collaborative album with Karan Aujla, described as an LP by [Apple Music](https://music.apple.com/us/album/street-dreams/1730005001).
- The Siege calls *Slightly Better Days* an EP in his [Platform interview](https://www.platform-mag.com/music/the-siege.html). The chart follows that description and records the streaming catalog’s album grouping.
- Naezy’s *2014* is a [2020 EP](https://music.apple.com/us/album/2014-ep/1520053515).
- *Anti Fitna* uses [Apple Music’s 22 April 2024 date](https://music.apple.com/us/album/anti-fitna-ep/1740942661); some secondary discographies give 20 April.
- *Malum Hai Na* uses the [complete 14-track edition’s date](https://music.apple.com/us/album/malum-hai-na/1584306305), rather than the earlier dates of individual tracks.

The selection excludes singles, guest-only appearances, earlier Emiway YouTube EP series, and unresolved records. Naezy’s *22*, for example, is [labelled Single by Apple Music](https://music.apple.com/za/album/22-single/1655668331), while other lists call it an EP. These exclusions make completeness and output-rate comparisons inappropriate. No project identity is assigned to a specific unlabeled mark in the original.

## Project artwork

All 23 projects have a local 600×600 cover, matched to Apple Music’s catalog ID, title, artist, and release date. `src/lib/data/artwork.ts` connects each project ID to its image and catalog page; `docs/project-artwork.json` retains the original image URL, catalog metadata, and file checksum. Artwork appears when a release is selected and links to its catalog page. The covers are separate from the preserved original infographic sheets.

The old Shazam URL for *BHAAGNA, CHHUPNA, DOOBNA* no longer resolved to the correct release. Its source now uses the verified current Apple Music album entry (1878639778), which retains the 14 September 2023 date.

## Modules and extension

- [`charts/types.ts`](../src/lib/charts/types.ts): scene, artist, anchor, project, and source contracts; format colours and display widths.
- [`charts/radial.js`](../src/lib/charts/radial.js): strict UTC dates, time-to-angle mapping, polar coordinates, SVG sectors, and clipped release marks.
- [`charts/validate-scene.js`](../src/lib/charts/validate-scene.js): rejects invalid dates, references, formats, and missing source evidence.
- [`charts/band-layout.js`](../src/lib/charts/band-layout.js): deterministic chronological spacing with gaps between nearby marks.
- [`RadialDisc.svelte`](../src/lib/components/RadialDisc.svelte): scene-driven SVG rendering and keyboard selection.
- [`SceneDeck.svelte`](../src/lib/components/SceneDeck.svelte): compact turntable layout with finite entry motion, reduced-motion support, and disabled navigation until multiple verified scenes are registered in `data/scenes.ts`.
- [`DiscStudy.svelte`](../src/lib/components/DiscStudy.svelte): filters, release list, selected-record sources, and methodology.

To add a record, verify the artist, full-project date, and format; add its source and any edition or classification caveat to the dataset. Keep IDs stable and dates within the selected snapshot. Update an artist’s anchor only when its evidence and label support the change. For another city, provide a new `RadialScene` with its own domain, ordered artists, anchors, projects, and coverage statement. Geometry and interaction remain reusable; no pixel tracing or hardcoded project angles are required.
