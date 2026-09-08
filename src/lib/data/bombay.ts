import type { RadialScene } from '../charts/types';

// The canonical source-linked dataset for the first reconstructed disc.
// Snapshot ends before 2025 releases. Dates refer to the linked catalog edition.
export const bombayScene = {
  "id": "bombay",
  "name": "Bombay",
  "location": {
    "label": "Mumbai",
    "latitude": 19.076,
    "longitude": 72.8777,
    "source": {
      "label": "Survey of India — metro city coordinates",
      "url": "https://indiamaps.gov.in/elevation"
    }
  },
  "color": "#42d6bb",
  "start": "2013-01-01",
  "end": "2025-01-01",
  "artists": [
    {
      "id": "divine",
      "name": "DIVINE",
      "anchor": {
        "date": "2013-03-21",
        "precision": "day",
        "label": "Voice of the Streets — official upload, not a career start",
        "source": {
          "label": "DIVINE — official YouTube upload",
          "url": "https://www.youtube.com/watch?v=MSvQoA17eRs"
        }
      }
    },
    {
      "id": "emiway",
      "name": "Emiway Bantai",
      "anchor": {
        "date": "2013-05-24",
        "precision": "day",
        "label": "Glint Lock — original official upload; streaming edition is later",
        "source": {
          "label": "Emiway Bantai — official YouTube upload",
          "url": "https://www.youtube.com/watch?v=y-J4LZEz_EM"
        }
      }
    },
    {
      "id": "naezy",
      "name": "Naezy",
      "anchor": {
        "date": "2014-01-07",
        "precision": "day",
        "label": "Aafat! — introductory official upload",
        "source": {
          "label": "Naezy — official YouTube upload",
          "url": "https://www.youtube.com/watch?v=Wwo36tHg2bw"
        }
      }
    },
    {
      "id": "siege",
      "name": "The Siege",
      "anchor": {
        "date": "2019-08-26",
        "precision": "day",
        "label": "Bubblecars — first verified project included here; earlier music is not dated in this dataset",
        "source": {
          "label": "Bubblecars — Apple Music",
          "url": "https://music.apple.com/us/album/bubblecars/1476158911"
        }
      }
    },
    {
      "id": "mc-altaf",
      "name": "MC Altaf",
      "anchor": {
        "date": "2018-06-06",
        "precision": "day",
        "label": "Wassup — documented solo release; not his earliest group activity",
        "source": {
          "label": "Wassup — Apple Music",
          "url": "https://music.apple.com/us/song/1398832176"
        }
      }
    }
  ],
  "projects": [
    {
      "id": "divine-kohinoor",
      "artistId": "divine",
      "title": "Kohinoor",
      "date": "2019-10-09",
      "type": "album",
      "sources": [
        {
          "label": "Kohinoor — Apple Music",
          "url": "https://music.apple.com/us/album/kohinoor/1481977846"
        }
      ]
    },
    {
      "id": "divine-punya-paap",
      "artistId": "divine",
      "title": "Punya Paap",
      "date": "2020-12-03",
      "type": "album",
      "sources": [
        {
          "label": "Punya Paap — Apple Music",
          "url": "https://music.apple.com/us/album/punya-paap/1542201783"
        }
      ]
    },
    {
      "id": "divine-gunehgar",
      "artistId": "divine",
      "title": "Gunehgar",
      "date": "2022-11-10",
      "type": "album",
      "sources": [
        {
          "label": "Gunehgar — Apple Music",
          "url": "https://music.apple.com/us/album/gunehgar/1653647754"
        }
      ]
    },
    {
      "id": "divine-street-dreams",
      "artistId": "divine",
      "title": "Street Dreams",
      "date": "2024-02-16",
      "type": "album",
      "sources": [
        {
          "label": "Street Dreams — Apple Music",
          "url": "https://music.apple.com/us/album/street-dreams/1730005001"
        }
      ],
      "note": "Collaborative album with Karan Aujla. Apple Music describes the project as an LP.",
      "credits": "DIVINE & Karan Aujla"
    },
    {
      "id": "emiway-malum-hai-na",
      "artistId": "emiway",
      "title": "Malum Hai Na",
      "date": "2021-10-01",
      "type": "album",
      "sources": [
        {
          "label": "Malum Hai Na — Apple Music",
          "url": "https://music.apple.com/us/album/malum-hai-na/1584306305"
        }
      ],
      "note": "This is the release date of the complete 14-track catalog edition. Some tracks were released earlier."
    },
    {
      "id": "emiway-8-saal",
      "artistId": "emiway",
      "title": "8 Saal",
      "date": "2022-05-09",
      "type": "album",
      "sources": [
        {
          "label": "8 Saal — Apple Music",
          "url": "https://music.apple.com/us/album/8-saal/1622827704"
        }
      ]
    },
    {
      "id": "emiway-monsoon",
      "artistId": "emiway",
      "title": "Monsoon",
      "date": "2022-09-09",
      "type": "ep",
      "sources": [
        {
          "label": "Monsoon — Apple Music",
          "url": "https://music.apple.com/us/album/monsoon-ep-ep/1643201060"
        }
      ],
      "note": "The catalog title identifies this project as an EP."
    },
    {
      "id": "emiway-king-of-the-streets",
      "artistId": "emiway",
      "title": "King Of The Streets",
      "date": "2023-06-09",
      "type": "album",
      "sources": [
        {
          "label": "King Of The Streets — Apple Music",
          "url": "https://music.apple.com/us/album/king-of-the-streets/1690843326"
        }
      ],
      "note": "This is the complete album’s catalog date. Some tracks appeared earlier as singles."
    },
    {
      "id": "emiway-wholeheartedly",
      "artistId": "emiway",
      "title": "Wholeheartedly",
      "date": "2024-03-03",
      "type": "album",
      "sources": [
        {
          "label": "Wholeheartedly — Apple Music",
          "url": "https://music.apple.com/us/album/wholeheartedly/1733924293"
        }
      ]
    },
    {
      "id": "emiway-speak",
      "artistId": "emiway",
      "title": "sPEAK",
      "date": "2024-07-14",
      "type": "ep",
      "sources": [
        {
          "label": "sPEAK — Apple Music",
          "url": "https://music.apple.com/us/album/speak-ep/1756883959"
        }
      ]
    },
    {
      "id": "emiway-northern-nights",
      "artistId": "emiway",
      "title": "Northern Nights",
      "date": "2024-12-13",
      "type": "ep",
      "sources": [
        {
          "label": "Northern Nights — Apple Music",
          "url": "https://music.apple.com/us/album/northern-nights-ep/1784073246"
        }
      ],
      "note": "The catalog title identifies this seven-track project as an EP."
    },
    {
      "id": "naezy-maghreb",
      "artistId": "naezy",
      "title": "Maghreb",
      "date": "2020-01-08",
      "type": "ep",
      "sources": [
        {
          "label": "Maghreb — Apple Music",
          "url": "https://music.apple.com/us/album/maghreb-ep/1493557752"
        }
      ],
      "note": "Apple editorial identifies this as his first EP."
    },
    {
      "id": "naezy-2014",
      "artistId": "naezy",
      "title": "2014",
      "date": "2020-06-30",
      "type": "ep",
      "sources": [
        {
          "label": "2014 — Apple Music",
          "url": "https://music.apple.com/us/album/2014-ep/1520053515"
        }
      ],
      "note": "The project is titled 2014 but was released in 2020."
    },
    {
      "id": "naezy-tarqeeb",
      "artistId": "naezy",
      "title": "Tarqeeb",
      "date": "2022-05-03",
      "type": "ep",
      "sources": [
        {
          "label": "Tarqeeb — Apple Music",
          "url": "https://music.apple.com/in/album/tarqeeb-ep/1621994561"
        }
      ],
      "note": "Apple editorial identifies this as his third EP."
    },
    {
      "id": "naezy-apocalypse",
      "artistId": "naezy",
      "title": "Apocalypse",
      "date": "2023-04-22",
      "type": "ep",
      "sources": [
        {
          "label": "Apocalypse — Apple Music",
          "url": "https://music.apple.com/us/album/apocalypse-ep/1683272886"
        }
      ]
    },
    {
      "id": "naezy-anti-fitna",
      "artistId": "naezy",
      "title": "Anti Fitna",
      "date": "2024-04-22",
      "type": "ep",
      "sources": [
        {
          "label": "Anti Fitna — Apple Music",
          "url": "https://music.apple.com/us/album/anti-fitna-ep/1740942661"
        }
      ],
      "note": "The date follows Apple Music’s catalog: 22 April 2024. Some secondary discographies list 20 April."
    },
    {
      "id": "siege-bubblecars",
      "artistId": "siege",
      "title": "Bubblecars",
      "date": "2019-08-26",
      "type": "album",
      "sources": [
        {
          "label": "Bubblecars — Apple Music",
          "url": "https://music.apple.com/us/album/bubblecars/1476158911"
        }
      ]
    },
    {
      "id": "siege-really-brown-really-rare",
      "artistId": "siege",
      "title": "Really Brown Really Rare",
      "date": "2020-12-01",
      "type": "ep",
      "sources": [
        {
          "label": "Really Brown Really Rare — Apple Music",
          "url": "https://music.apple.com/us/album/really-brown-really-rare-ep/1539320022"
        }
      ],
      "note": "The release title identifies this project as an EP. The artist’s catalog also groups it under compilations."
    },
    {
      "id": "siege-salim",
      "artistId": "siege",
      "title": "Salim",
      "date": "2021-12-10",
      "type": "ep",
      "sources": [
        {
          "label": "Salim — Apple Music",
          "url": "https://music.apple.com/us/album/salim-ep/1597492041"
        }
      ],
      "note": "Collaborative EP with Vedang.",
      "credits": "The Siege & Vedang"
    },
    {
      "id": "siege-slightly-better-days",
      "artistId": "siege",
      "title": "Slightly Better Days",
      "date": "2022-10-14",
      "type": "ep",
      "sources": [
        {
          "label": "Slightly Better Days — Apple Music",
          "url": "https://music.apple.com/us/album/slightly-better-days/1646139747"
        },
        {
          "label": "The Siege’s interview — Platform",
          "url": "https://www.platform-mag.com/music/the-siege.html"
        }
      ],
      "note": "The Siege calls this an EP in his Platform interview. Streaming services group it under albums; this chart follows the artist’s description."
    },
    {
      "id": "siege-bhaagna-chhupna-doobna",
      "artistId": "siege",
      "title": "BHAAGNA, CHHUPNA, DOOBNA",
      "date": "2023-09-14",
      "type": "ep",
      "sources": [
        {
          "label": "BHAAGNA, CHHUPNA, DOOBNA — Apple Music",
          "url": "https://music.apple.com/us/album/bhaagna-chhupna-doobna-ep/1878639778"
        },
        {
          "label": "The Siege’s announcement",
          "url": "https://www.reddit.com/r/IndianHipHopHeads/comments/16gq8zo/i_am_siege_and_i_drop_my_5th_project_on_the_14th/"
        }
      ],
      "note": "Collaborative EP with Natiq. Apple Music lists 14 September 2023, matching The Siege’s release announcement.",
      "credits": "The Siege & Natiq"
    },
    {
      "id": "mc-altaf-robin-hood",
      "artistId": "mc-altaf",
      "title": "Robin Hood",
      "date": "2023-09-15",
      "type": "ep",
      "sources": [
        {
          "label": "Robin Hood — Apple Music",
          "url": "https://music.apple.com/us/album/robin-hood-ep/1707131829"
        }
      ],
      "note": "Collaborative EP with Sammohit.",
      "credits": "MC Altaf & Sammohit"
    },
    {
      "id": "mc-altaf-halaat",
      "artistId": "mc-altaf",
      "title": "Halaat",
      "date": "2024-09-19",
      "type": "album",
      "sources": [
        {
          "label": "Halaat — Apple Music",
          "url": "https://music.apple.com/us/album/halaat/1761526423"
        }
      ],
      "note": "Apple Music describes this as MC Altaf’s first album."
    }
  ],
  "coverage": "Selected verified albums and EPs by the five artists on the Bombay disc. This is an incomplete discography. Singles, guest-only appearances, earlier YouTube EP series, and releases with unresolved dates or classifications are excluded. The original image does not identify project titles."
} satisfies RadialScene;
