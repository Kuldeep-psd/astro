# Scene collection

All eight scenes from the three preserved original infographic sheets now use the shared Svelte turntable. The original images remain byte-identical comparison references.

| Scene | Artists | Artist-lane project entries | Calendar |
|---|---:|---:|---|
| Bombay |5|23|2013–2025|
| Punjabi |5|24|2004–2025|
| Delhi |6|26|2010–2025|
| Urdu |4|14|2013–2025|
| Pune |2|3|2018–2025|
| Goa |2|6|2018–2025|
| Amd (Ahmedabad) |2|10|2018–2025|
| Koshur |3|8|2010–2025|

114 artist-lane entries represent111 distinct linked releases. Street Dreams appears on DIVINE’s and Karan Aujla’s respective scene lanes; Lost in AMD and Amdavad Rap Life appear on both co-leading rapper lanes. These are shared projects, not separate underlying releases.

## Preserved interaction and visual rules

- Release dates set chronological order on a continuous UTC calendar. Every band fills the full artist lane. Nearby releases are spaced along the arc with a minimum 1.4° gap, preserving their display widths (albums 7.2°; EPs/mixtapes 3.6°). This intentionally prioritizes visibility and separate click targets over exact plotted date positions. Exact dates remain in data, details and the list. Spacing uses the full artist catalog so filtering does not move bands.
- Approximate artist starting years remain in source metadata and accessible descriptions; the vinyl rings have no grey hatching.
- Golden-yellow album bands, cyan EPs and pink mixtapes remain consistent across scenes. Calendar colours distinguish scenes.
- Artist filters are visible buttons. Left/right arrows cycle through all eight scenes and wrap at either end. Switching scenes clears artist, format and project selections while retaining the selected Disc/Release list view.
- Both views use the accepted release-list dimensions:520px content height and20px vertical margins on desktop;360px and12px on small screens. The chart fits without distortion.
- The record detail card shows cover, artist/credits, title, date, format and a simple Apple Music link. It has no internal scrolling. Removed banners, project-count strips, pagination and explanatory captions remain removed.
- Location maps stay small and muted. India is used for seven scenes; Urdu uses Pakistan with a representative Karachi point. Regional/language scenes are not claims about every artist’s birthplace, residence or nationality.

## Dates and formats

Release dates normally follow the exact linked catalog edition. Explicit original-date exceptions have a `dateSource`, duplicated in the source array, and a note explaining the difference. Artwork provenance retains the current catalog date, rather than overwriting evidence. The detail label says Release date for those exceptions and Catalog release otherwise.

Artist/label format statements take precedence over platform groupings. Catalog classification is the fallback when a stronger primary classification cannot be established. For example, Snitches Get Stitches follows the artist’s Full Album upload and Apple album classification; Hard Drive Vol.2 and Kshama likewise use their catalog album classification. Dhanji’s artist-described tapes remain mixtapes.

The endpoint2025-01-01 is exclusive. Singles, guest-only appearances, unresolved records, post2024projects and duplicate editions are omitted. Faris Shafi remains on the original Urdu disc with a sourced single anchor and zero eligible full-project bands; no album or EP was invented to fill his lane. Original marks do not name projects, so these selections do not claim exact one-to-one identification of the old image’s bands.

## Research and assets

- [Bombay study](bombay-disc-study.md)
- [Punjabi notes](punjabi-scene-notes.md)
- [Delhi notes](delhi-scene-notes.md)
- [Urdu notes](urdu-scene-notes.md)
- [Pune, Goa, Amd and Koshur notes](regional-scene-notes.md)
- [All artwork provenance](project-artwork.json)

112 localJPEG files cover all114artist-lane entries, reusing the same asset for two Amd collaborative projects. Catalog URLs, cover URLs, IDs, artist/title/date metadata, byte counts and SHA-256 checksums are retained. Da Rap Star’s official600×538artwork preserves its aspect ratio; other supplied covers are600×600. No external API keys or runtime catalog requests are required.
