# Delhi scene reconstruction

Six artists follow the original city2.jpg inner-to-outer order: KR$NA, Raftaar, Ikka, Karma, Seedhe Maut, Chaar Diwaari. The original image has no project titles, so bands are reconstructed from verifiable catalogs rather than guessed from anonymous marks. Calendar: 2010-01-01 through 2025-01-01 exclusive. The selected dataset has 26 projects: 12 albums, 12 EPs, 2 mixtapes.

## Data and artwork

Every project was individually looked up by catalog ID at Apple's public iTunes lookup endpoint in the US storefront. Individual raw responses are staged as catalog-ID.json; the six artist lookup responses also remain in staging. Each project has a canonical Apple Music URL and a 600×600 JPEG downloaded from that catalog's artwork URL. provenance.json records the exact catalog title, artist, date, lookup URL, image URL, byte count and SHA-256. All 26 images were checked with sharp for JPEG format and 600×600 dimensions. validateScene passes.

The India search endpoint omits many accessible releases, including much of Kalamkaar and Seedhe Maut's catalogs; using the US artist lookup resolved these gaps. New catalog IDs do not automatically mean new release dates: the current KR$NA/Seedhe Maut entries preserve the historical dates in their metadata.

## Format decisions

- Hard Drive Vol. 1 is an EP: Raftaar's own ICE visualiser description calls it an EP. https://www.youtube.com/watch?v=oKIEergA-k8
- न is a mixtape: explicitly identified by the releasing label. https://azadirecords.com/product/azr079-%E0%A4%A8-seedhe-maut/
- Lunch Break is a mixtape: explicitly identified in Seedhe Maut's official discography. https://www.seedhemaut.com/ and the Apple artist editorial https://music.apple.com/us/artist/seedhe-maut/1233336608
- Hard Drive Vol. 2 uses Apple's album classification. Other EP/mixtape descriptions circulate, but a decisive artist/releasing-label format statement was not found. https://music.apple.com/us/album/hard-drive-vol-2/1779552920
- Kshama uses Apple's album classification, also used by Spotify. A separate artist EP statement was not verified. https://music.apple.com/us/album/kshama/1784665627 and https://open.spotify.com/album/6jgP3YiYzMadVp5XT3FD08
- Other EPs explicitly carry EP in the catalog title. Albums use Apple's catalog classification. Track count is not used to invent a format.

## Dates and editions

- Bayaan: 2018-12-28 matches both Apple and the artist Bandcamp. https://seedhe-maut.bandcamp.com/album/bayaan
- Newcomer: 2021-02-23 is the complete four-track Apple edition. The artist page displays 2019 beside the advance song Catchy Hook, and Kuch To Log Kahenge carries a 2020 song date; neither establishes the whole EP's release date. This chart explicitly uses the complete catalog edition. https://music.apple.com/us/album/newcomer-ep/1555049561
- Zero to Infinity: the full eight-track edition is 2018-05-30; earlier individual song dates are not used as project dates. https://music.apple.com/us/album/zero-to-infinity/1515907916
- 2 Ka Pahada: included once using the five-track edition 1804720075, dated 2017-05-20. A separate four-track edition 1884000993 has the same date and is not duplicated.
- Made You Proud: the established catalog 1588364629 preserves the proper title; the newer entry 6804956468 spells it Make You Proud. Both show 2021-10-08. The existing Made You Proud edition is used.
- All displayed project dates match their exact cover/link catalogReleaseDate. No project dateSource exception is necessary.

## Artist anchors

Anchors are documented releases, not claims about career beginnings:

- KR$NA: 2010-10-02, Kaisa Mera Desh, original Prozpekt upload. https://www.youtube.com/watch?v=tBy-sJVPErE
- Raftaar: 2013-08-09, You Dont Know Me official solo upload; earlier collaborations exist. https://www.youtube.com/watch?v=yQ3k-6p9DnA
- Ikka: 2014-01-01, In Da Club catalog release. https://music.apple.com/in/album/in-da-club-single/1444437939
- Karma: 2018-05-22, Rap Karte Hain original label upload. https://www.youtube.com/watch?v=SpQJnzKbsnI
- Seedhe Maut: 2017-05-08, Seedhe Maut Anthem catalog release, separate from the duo's 2016 formation. https://music.apple.com/us/album/seedhe-maut-anthem-single/1233336603
- Chaar Diwaari: 2021-11-20, Kaun Mera? catalog release. https://music.apple.com/us/album/kaun-mera-single/1595494697

The locator is a representative Delhi point (28.632191, 77.200682), verified in Delhi Traffic Police's New Delhi district location list. https://traffic.delhipolice.gov.in/new-delhi-district
It points to the scene, not artist birthplaces; Karma is from Dehradun and remains here because the original image explicitly places him on this disc.

## Exclusions

Singles, soundtrack/various-artist compilations, guest-only releases, alternate/deluxe duplicates, and projects after the exclusive 2025 cutoff are omitted. Examples include Raftaar's soundtrack appearances and Born Star/T-Urban guest material, the Mic Check label compilation containing Karma, and Seedhe Maut guest features on other artists' albums.

Raftaar's WTF Mixtape and Bar'ish video series are not represented as dated project bands: the verified official YouTube uploads establish tracks, but no complete Apple Music project with a reliably sourced project release date and matching cover was established. They are not converted into fake single-day project releases.

Post-cutoff exclusions include KR$NA's Yours Truly, Chaar Diwaari's Parvana, Karma's 6 pe 6, Ikka's FUBU and Enigma 2 Icon, Seedhe Maut's DL91 FM. This is a selected verified discography, not a claim of total historical output.
