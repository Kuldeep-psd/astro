# Punjabi scene reconstruction

24 selected projects: 17 albums, 5 EPs, 2 mixtapes. Artist lanes remain in the original image's inner-to-outer order: Bohemia, Yo Yo Honey Singh, Sidhu Moose Wala, Karan Aujla, Shubh. The displayed window is 1 January 2004 to 1 January 2025, with the latter cutoff exclusive.

Every included release has an individual successful Apple iTunes catalog lookup, a current Apple Music album URL, and a locally downloaded cover. The raw public lookup responses are staged in `catalogs/`; integration only needs `punjabi.ts`, `artwork.json`, `provenance.json`, and `covers/`. `scene.json` is a convenient validation mirror. `contact-sheet.jpg` is QA only. No shared repository files were changed.

The original image has unlabeled bands, so it cannot establish project titles or dates. This is a sourced reconstruction of the original artist selection, not a claim that every original visual band has been identified. No date-band widths represent duration.

## Release date decisions

All dates are linked catalog-edition dates except the explicit `dateSource` records below. Artwork provenance retains the date of the exact catalog edition that supplied the cover and includes `projectReleaseDate` and `dateSource` when different.

- **International Villager: 2011-11-11.** The original Planet Recordz edition and date are supported by the label-delivered [Spotify catalog](https://open.spotify.com/track/2wgWoCobFiCsSMkdUTQJ67). The old Apple Music ID 1564926519 is still search-indexed with that date but currently returns 404, so it is not used as the listening link. The available [Speed Records / Times Music edition](https://music.apple.com/in/album/international-villager/1413202153) is dated 2012-02-27 and credited to Various Artists. Its 14 tracks are the corresponding album; Honey Singh is the project's lead producer/performer, not merely an incidental guest. Its track dates mostly retain 2011-11-11, while Brown Rang contains an implausible 2000 date that is not used.
- **Desi Kalakaar: 2014-08-26.** [Apple's original album track date](https://music.apple.com/us/song/1158008563) and the [T-Series release video](https://www.youtube.com/watch?v=KhnVcAC5bIM) preserve 26 August. T-Series published the [seven-song full audio jukebox](https://www.youtube.com/watch?v=3t6VSdQPvn8) on 29 August 2014; the currently linked eight-track Apple album lists 26 September 2014. The chart keeps the original project date.
- **Snitches Get Stitches: 2020-05-09.** The [artist's official full-project video](https://www.youtube.com/watch?v=r2zFQos5gHw) confirms the exact original date. The fetched public page's uploadDate and publishDate both read `2020-05-09T09:10:03-07:00`. The current Apple edition lists 2020-09-16. **Classification caveat:** the [discography article](https://en.wikipedia.org/wiki/Snitches_Get_Stitches) calls it a mixtape, while Apple and the artist's video use the broader album label. It is staged as mixtape with this distinction explicit in its note and sources. No reliable accessible artist statement explicitly saying “mixtape” was found; the official Instagram source cited in that article was unavailable. Root should review this classification choice rather than treating it as verified solely by Apple.
- **Moosetape: 2021-05-15.** The [label-delivered Amazon catalog](https://music.amazon.com.au/albums/B09TRF3KJM) preserves 15 May; the current Apple 32-track edition lists 17 May. Tracks rolled out in sequence rather than all appearing at once. The dateSource is explicit.
- **Way Ahead: 2022-05-10.** The original [Rehaan Records Amazon catalog](https://music.amazon.com/albums/B0BSG4XBB9) and [Spotify track catalog](https://open.spotify.com/track/3FG7e69rEpLxOqNyaHd7AG) agree on 10 May. Current Apple Music has 25 November. The chart keeps the original date.

Additional edition decisions:

- **Vich Pardesan De:** retain the sourced **2004-01-01** date for the [14-track catalog edition](https://music.apple.com/us/album/vich-pardesan-de-in-the-foreign-land/268654206), with a note clearly distinguishing the earlier 2002 original. Root explicitly requested retaining the original image's 2004 window and this honest catalog-edition approach. Bohemia's anchor uses year precision and says it is the first catalog edition in the window, not his career start.
- **Pesa Nasha Pyar:** retain 2006-02-16 for the linked 19-track edition. Other current editions use 1 January 2006. Do not add multiple bands for the same project.
- **Skull & Bones:** 2017-02-13 is corroborated by [T-Series' full audio jukebox](https://www.youtube.com/watch?v=PO-voTTqYCI). A 2016 date sometimes associated with the album refers to earlier track releases.
- **Honey 3.0:** the full ten-track album date is **2024-03-15**, independently matching the label-delivered [Apple Music](https://music.apple.com/us/album/honey-3-0/1736063978) and [Spotify](https://open.spotify.com/album/1M0Pn9Sjn6dxI5rxOJQW5V) catalogs. The project had singles during 2023; those are not extra album bands. No original complete 2023 catalog edition could be verified. The date has not been changed merely to match secondary claims of an April 2023 rollout.
- **Four Me:** use the current five-track Apple Music Edition, 2024-06-26; do not duplicate the original four-track release.
- **KDM Mixtape, Vol. 1:** the title identifies a mixtape. Apple groups it under compilations, but it is a Bohemia-led Kali Denali Music project and is included as mixtape.
- **Street Dreams:** full collaborative album under both DIVINE and Karan Aujla's own catalogs. It is represented in both scenes intentionally; this scene uses its own artist-prefixed ID. Date 2024-02-16 and source/cover ID 1730005001 match Bombay.

## Artist anchors

Anchors say what evidence they represent and do not claim definitive career start dates:

- Bohemia: 2004 catalog edition of Vich Pardesan De, year precision.
- Yo Yo Honey Singh: 2011-11-11 International Villager, first verified included lead project. Earlier production work deliberately is not an invented anchor.
- Sidhu Moose Wala: [G Wagon](https://music.apple.com/us/album/g-wagon-feat-deep-jandu-single/1257856431), documented early vocal release, catalog 2017-07-08.
- Karan Aujla: [Property of Punjab](https://music.apple.com/us/album/property-of-punjab-single/1137596870), documented early solo release, catalog 2016-07-25. This does not claim he had no earlier writing/collaboration activity; a 2015 Supply collaborative catalog entry exists and is excluded from the solo-anchor claim.
- Shubh: [We Rollin](https://music.apple.com/us/album/we-rollin-single/1635085630), debut single catalog 2021-09-16, corroborated as the debut by Apple's artist biography.

## Artist activity endpoint

Sidhu Moose Wala’s black artist ring ends on **29 May 2022**, the date of his death, supported by [The Indian Express’s contemporary report](https://indianexpress.com/article/cities/amritsar/punjabi-singer-congress-leader-sidhu-moose-wala-shot-dead-7942590/). It does not continue to the 2025 scene cutoff. Release bands retain their own sourced dates independently of this endpoint; a posthumous release would not extend the artist’s activity ring.

## Exclusions

Singles, features on another artist's album, soundtrack contributions and retrospective/party compilations are not included as project bands. This excludes film soundtracks from Honey Singh, Bohemia, and Sidhu catalogs; production/guest collections such as The Folk Star and The Crown; Honey Singh artist/party compilations; duplicate Pesa Nasha Pyar and Vich Pardesan De editions; all post-2024 releases such as Shubh's Sicario, Karan Aujla's P-POP CULTURE and Honey Singh's 51 GLORIOUS DAYS. Bohemia's catalog search includes unrelated Spanish and French acts with the same name: Cada Día Al Despertar, Folie Tzigane, and … y Punto were rejected. Other unrelated Shubh artist IDs were rejected; correct Punjabi artist ID is 1585737475.

## Locator and validation

Punjab marker latitude 31.14713, longitude 75.341218 comes from [Government of India Cine Hub](https://indiacinehub.gov.in/location/states-union-territories/punjab). This is a small regional reference point for the Punjabi-language scene, not an assertion that the transnational artists all live in Punjab or have the same nationality.

`validateScene` passes. All 24 source metadata records include title, artist, release date and album ID. All 24 covers were visually checked together. 23 covers are 600×600; **Da Rap Star is 600×538 from Apple's 600×600bb endpoint**, preserving the label's original non-square art rather than cropping it. The shared cover component's `object-fit: contain` accommodates it. Total cover download size: 2,516,837 bytes. Each local asset has SHA-256 provenance.


## Integration review correction
Snitches Get Stitches follows the artist’s official Full Album upload and Apple album classification. The secondary mixtape claim lacked support in its cited contemporary reporting and was removed. Punjabi now has18albums,5EPs,1mixtape; total24unchanged.
