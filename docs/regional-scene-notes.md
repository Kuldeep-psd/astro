# Regional scene reconstruction

The four scene datasets preserve the original `city1.jpg` artist order from inner to outer: Pune (MC Stan, Vijay DK), Goa (Tsumyoki, Goa Trap Culture), Amd (Siyaahi, Dhanji), Koshur (MC Kash, SOS, Ahmer). Pune/Goa/Amd retain 2018–2025 domains; Koshur retains 2010–2025. Releases on or after 1 January 2025 are excluded. Grouping is inherited from the illustration, not a statement of each artist’s birthplace; in particular, Vijay DK is retained in the original Pune grouping.

There are 27 artist-lane project entries representing 25 distinct releases: Pune 3, Goa 6, Amd 10, Koshur 8. All have a verified Apple Music album link and locally stored 600×600 JPEG cover. Joint Siyaahi/Dhanji releases appear on both credited rapper lanes with different entry IDs but shared artwork files and catalog IDs. Goa Trap Culture’s Daboij is shown on the crew lane only; it is not repeated as a Tsumyoki solo project. Its current Apple edition is tagged Various Artists, but the returned eleven track credits all identify Goa Trap Culture and Tsumyoki. The earlier Apple edition also directly names both as album artists.

## Release dates

All dates are from public Apple iTunes album lookup responses saved in `catalogs/album-ID.json`, except two explicit `dateSource` overrides:

- **Tsumyoki — RIP:** 28 December 2018, supported by the [original Spotify edition](https://open.spotify.com/track/2JcL4RNU24Di3LkRrVlu3f) and [earlier Apple edition](https://music.apple.com/in/album/rip/1878778917). The current available Apple edition gives 2 January 2019, so its cover provenance retains that catalog date while the band marks the verified original date. Both earlier Apple IDs 1729483899 and 1878778917 returned no current iTunes result.
- **Ahmer — AZLI:** 27 June 2022, from the [artist’s Bandcamp release](https://ahmermusic.bandcamp.com/album/azli). Its linked Apple edition is dated 1 July 2022; that date remains intact in the artwork provenance.

MC Kash’s Rebel RepubliK uses 26 November 2012 for the current catalog edition. Contemporary November 2012 reporting suggests an earlier launch, but no exact earlier day was verified. Boy Cut uses the 17 December 2020 streaming edition; an interview refers to 2019 material without supplying an original day. These limits are recorded in project notes, not invented as precise earlier dates.

## Classification decisions

- **Tadipaar** is an album: [Apple’s own MC Stan editorial](https://music.apple.com/us/artist/mc-stan/1530205305) calls it the debut album, despite the catalog placing its page under compilations.
- **Lab Rats** is a mixtape: [Dhanji’s own SoundCloud release description](https://m.soundcloud.com/mrlucky2k2k/wo-dekh) explicitly calls it the second mixtape, overriding the Apple EP suffix.
- **Drive-In Cinema** is a mixtape: [the artist’s SoundCloud project page](https://soundcloud.com/mrlucky2k2k/sets/drive-in-cinema) calls it his third mixtape and gives 17 August 2020.
- **Boy Cut and DZs Control** are mixtapes: [Dhanji’s interview](https://rollingstoneindia.com/dhanji-ruab-live-album-interview-zomaland-ahmedabad/) describes the early tapes and his distinction from the debut album RUAB. [Apple’s dox editorial](https://music.apple.com/za/artist/dox/1382936003) also calls Boy Cut a tape.
- **Lost in AMD** remains an EP, following its explicit Apple label and [co-creator ACHARYA’s project description](https://soundcloud.com/acharyamakesbangers/11-big-pharma-feat-rebel-7). That description calls **Amdavad Rap Life: 2 Heavy On ’Em, Vol. 2** a mixtape. The latter appears on both Siyaahi and Dhanji lanes.
- **Bagman** follows the Apple EP label; [producer unfuckman’s Bandcamp](https://unfuckman.bandcamp.com/album/bagman) confirms its 31 May 2022 date. Secondary fan discographies sometimes label it a mixtape, but no equally clear artist format statement was found to override EP.
- **Inqalab** is a mixtape, explicitly titled that on [Ahmer’s own Bandcamp](https://ahmermusic.bandcamp.com/album/inqalab-mixtape), overriding Apple’s EP suffix.
- **Alive In K.** is an EP: [co-creator 30KEY!’s interview](https://offthedome.in/2024/08/06/candid-conversation-with-30key/) identifies it as their EP and describes its expansion from a single into a complete project. Apple calls the three-track catalog edition a Single; the source and note explain this exception.

## Artist anchors

Anchors are dated public releases, not asserted career starts. MC Stan uses Wata, Vijay DK uses Alhamdulillah, Tsumyoki uses RIP, Goa Trap Culture uses I’ve Had Enough, Siyaahi uses Naqaab, SOS uses Psycho and Ahmer uses Gang Shit. Their sources are linked in the dataset. Dhanji’s anchor has year precision (2019) based on his own [discography in his AMA](https://www.reddit.com/r/IndianHipHopHeads/comments/1cq7fgo/my_name_is_dhanji_ask_me_anything/); MC Kash’s has year precision (2010) for I Protest, documented in a [contemporary interview](https://kashmirlife.net/kashmir-raps-1057/). January 1 represents year precision only in these two anchors.

## MC Kash activity endpoint

MC Kash’s continuous black ring stops at **2016, with year precision**, on the disc, including when artist or format filters are applied. [Outlook’s report](https://www.outlookindia.com/opinion/india-news-hip-hop-found-a-connect-in-pain-of-kashmiris-news-305257), originally published in December 2021, says he became inactive after 2016. This marks a hiatus, not a confirmed permanent retirement or a known final day. The stored `2016-12-31` is only the end-of-year plotting boundary; the UI displays `2016 (year only)`.

Later guest appearances include **The Native Son (2021)**, documented by [TRT World](https://www.trtworld.com/article/12759890), and Ahmer’s **Kun (2022)**. His Kun verse is described as a return from hiatus by [Azadi Records](https://soundcloud.com/azadirecords/ahmer-kun-ft-mc-kash). Those features do not establish continuous activity from 2016 to the 2025 cutoff and do not add separate projects under this chart’s existing exclusion of guest-only appearances. Rebel RepubliK and all other project dates, bands, and links are unchanged.

## Deliberate omissions

- No singles, guest-only albums, soundtrack/TV compilations, or duplicate deluxe editions. Dhanji’s RUAB Director’s Cut and Tsumyoki’s A Message from the Moon Deluxe are omitted because the original complete project is already included.
- Tsumyoki and ZaDaRapper’s The Art of Flexing: complete Apple Music album and exact release day could not be verified; no invented band or link.
- Dhanji’s The Dhaniya Tape: the artist verifies its 2019 existence, but exact release day and an available Apple Music album could not be verified. Its year remains valid as an anchor only.
- Siyaahi is only a guest on DZs Control; the album belongs on Dhanji’s lane.
- Ahmer’s appearance on Smoke’s Veni Vidi Vici and SOS’s TARYAQ, and MC Kash’s appearance on Chalo, are guest contributions, so they are not independent bands on those artists’ lanes.
- MC Kash’s The Vault compilation has no verified available Apple Music edition here.

## Map points

Small locators use representative city points; none assert artist addresses. Pune’s point (18.5204, 73.8567) comes from the Maharashtra Pollution Control Board’s city report. Goa uses the INCOIS Panaji station (15.5016, 73.8282). Amd uses the Ahmedabad Municipal Corporation’s published average city position (22°58′30″ N, 72°35′30″ E). Koshur uses the National Center for Seismology Srinagar station (34.05081667, 74.80465). All primary coordinate sources are embedded in `location.source`.

## Validation

All four datasets pass the repository’s `validateScene`. All 27 entries have HTTPS Apple album URLs and matching provenance. The 25 distinct local images were decoded, confirmed as 600×600 JPEG, and visually inspected together in `contact-sheet.jpg`. No application files were edited; root integrates these staged files and runs full application checks.
