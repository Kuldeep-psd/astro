export interface StorySource { id: string; label: string; url: string }
export interface StoryChapter {
  id: string;
  period: string;
  place: string;
  label: string;
  title: string;
  copy: string;
  detail: string;
  sourceIds: string[];
}

// Selected historical milestones; map connections do not form a complete origin tree.
export const chapters: StoryChapter[] = [
  {
    "id": "origins",
    "period": "1973",
    "place": "THE BRONX · NEW YORK",
    "label": "The beginning",
    "title": "A neighbourhood makes a sound.",
    "copy": "On 11 August 1973, Cindy Campbell and DJ Kool Herc threw a party at 1520 Sedgwick Avenue. It became a landmark in hip-hop’s beginnings.",
    "detail": "Around the Bronx, DJs, MCs, dancers and writers built a culture from the material at hand: records, walls, words and a crowd.",
    "sourceIds": [
      "smithsonian-party",
      "smithsonian-bronx",
      "bfi-film"
    ]
  },
  {
    "id": "across-borders",
    "period": "1979–1984",
    "place": "RECORDS / FILM / TELEVISION",
    "label": "Across borders",
    "title": "The party leaves the block.",
    "copy": "The Sugarhill Gang put “Rapper’s Delight” on record in 1979. The next wave travelled through screens: Wild Style reached Tokyo with its performers in 1983; Sidney brought H.I.P. H.O.P. to French television in 1984.",
    "detail": "Records and moving images gave distant audiences a way into the culture.",
    "sourceIds": [
      "loc-rappers-delight",
      "wild-style-japan",
      "ina-hiphop"
    ]
  },
  {
    "id": "local-voices",
    "period": "1990s–2000s",
    "place": "LOCAL LANGUAGES / LOCAL LIVES",
    "label": "Made local",
    "title": "Every city changes the sound.",
    "copy": "MC Solaar released his French-language debut in 1991. In Heidelberg, Advanced Chemistry confronted racism on “Fremd im eigenen Land” in 1992. That year, Seo Taiji and Boys brought rap into Korean pop. In east London, pirate radio carried emerging grime voices.",
    "detail": "Local language, politics and musical traditions shaped what came next.",
    "sourceIds": [
      "bnf-solaar",
      "ghi-advanced-chemistry",
      "korea-pop",
      "vam-london"
    ]
  },
  {
    "id": "south-asia",
    "period": "2000s–2010s",
    "place": "SOUTH ASIA & ITS DIASPORA",
    "label": "Closer to home",
    "title": "The stories get closer to home.",
    "copy": "Bohemia’s Punjabi rap grew out of life in California. Young Stunners uploaded “Burger-E-Karachi” in 2013. In Bombay, DIVINE and Naezy’s “Mere Gully Mein” put neighbourhood life into a 2015 release. By 2019, Nas’s Mass Appeal and Universal had launched a Mumbai label with DIVINE.",
    "detail": "South Asian stories were finding new routes between local listeners and the world.",
    "sourceIds": [
      "bohemia-original-interview",
      "bohemia-interview",
      "yunus-burger",
      "apple-mere-gully",
      "umg-india"
    ]
  }
];

export const storySources: StorySource[] = [
  {
    "id": "smithsonian-party",
    "label": "Smithsonian · The first hip-hop block party",
    "url": "https://www.smithsonianmag.com/smithsonian-institution/how-the-block-party-became-an-urban-phenomenon-180980560/"
  },
  {
    "id": "smithsonian-bronx",
    "label": "NMAAHC · Hip-Hop in the Bronx",
    "url": "https://nmaahc.si.edu/explore/stories/hip-hop-bronx"
  },
  {
    "id": "loc-rappers-delight",
    "label": "Library of Congress · Rapper’s Delight",
    "url": "https://www.loc.gov/item/95786229/"
  },
  {
    "id": "wild-style-japan",
    "label": "Wild Style · Official Japanese release site",
    "url": "https://synca.jp/wildstyle/"
  },
  {
    "id": "cornell-ahearn",
    "label": "Cornell University · Charlie Ahearn archive",
    "url": "https://rmc.library.cornell.edu/EAD/htmldocs/RMM08078.html"
  },
  {
    "id": "ina-hiphop",
    "label": "INA · H.I.P. H.O.P., January 1984",
    "url": "https://catalogue.ina.fr/doc/TV-RADIO/DA_CPA84057237/hip-hop-emission-du-14-janvier-1984"
  },
  {
    "id": "bfi-film",
    "label": "BFI · Hip-hop on film and British television",
    "url": "https://www.bfi.org.uk/lists/10-great-hip-hop-documentaries"
  },
  {
    "id": "bnf-solaar",
    "label": "Bibliothèque nationale de France · MC Solaar debut",
    "url": "https://catalogue.bnf.fr/ark%3A/12148/cb468380665"
  },
  {
    "id": "ghi-advanced-chemistry",
    "label": "German Historical Institute · Advanced Chemistry, 1992",
    "url": "https://germanhistorydocs.org/de/ein-neues-deutschland-1990-2023/advanced-chemistry-fremd-im-eigenen-land-1992"
  },
  {
    "id": "umg-heidelberg",
    "label": "Universal Music · Advanced Chemistry’s Heidelberg roots",
    "url": "https://www.universal-music.de/beginner/musik/advanced-chemistry-348962"
  },
  {
    "id": "korea-pop",
    "label": "Korean Culture and Information Service · K-POP: A New Force in Pop Music",
    "url": "https://www.korea.net/koreanet/fileDownload?fileUrl=%2Fcontent%2Fpdf%2Fgeneral%2FK-POP_20111115.pdf"
  },
  {
    "id": "vam-london",
    "label": "V&A East · East London’s lost sounds",
    "url": "https://www.vam.ac.uk/blog/east/meet-the-artists-lost-sounds-east-london"
  },
  {
    "id": "bohemia-interview",
    "label": "Bohemia · PMR interview archive, 2009",
    "url": "https://www.thepunjabirapstar.com/2009/10/bohemia-in-exclusive-interview-with-pmr.html"
  },
  {
    "id": "bohemia-original-interview",
    "label": "UrbanAsian · Bohemia and Juggy D interview",
    "url": "https://urbanasian.com/whats-happenin/2014/02/exclusive-video-interview-bohemia-and-juggy-d/"
  },
  {
    "id": "apple-mere-gully",
    "label": "Apple Music / Sony · Mere Gully Mein",
    "url": "https://music.apple.com/us/album/mere-gully-mein-feat-naezy-single/985088872"
  },
  {
    "id": "umg-india",
    "label": "Universal Music · Mass Appeal India launch, 2019",
    "url": "https://www.universalmusic.com/mass-appeal-and-universal-music-india-to-launch-mass-appeal-india/"
  },
  {
    "id": "azadi-catalogue",
    "label": "Azadi Records · Catalogue",
    "url": "https://azadirecords.com/catalogue/"
  },
  {
    "id": "apple-young-stunners",
    "label": "Apple Music · Young Stunners",
    "url": "https://music.apple.com/us/artist/young-stunners/1501771392"
  },
  {
    "id": "yunus-burger",
    "label": "Talhah Yunus · Burger-E-Karachi on SoundCloud",
    "url": "https://soundcloud.com/talhahyunus/burgerekarachi"
  },
  {
    "id": "young-stunners-artist-profile",
    "label": "Young Stunners · Artist profile on ReverbNation",
    "url": "https://www.reverbnation.com/youngstunnersofficial/song/18643358-young-stunners-burger-e-karachi"
  }
];
