import type { RadialScene } from '../charts/types';

export const urduScene = {
  "id": "urdu",
  "name": "Urdu",
  "color": "#f18a86",
  "start": "2013-01-01",
  "end": "2025-01-01",
  "location": {
    "label": "Karachi — representative Urdu scene hub",
    "country": "PK",
    "latitude": 24.8608,
    "longitude": 67.0104,
    "source": {
      "label": "GeoNames — Karachi",
      "url": "https://www.geonames.org/1174872/karachi.html"
    }
  },
  "artists": [
    {
      "id": "faris-shafi",
      "name": "Faris Shafi",
      "anchor": {
        "date": "2012-08-09",
        "precision": "day",
        "label": "Awaam — sourced single anchor before the displayed window; no eligible full project verified before 2025",
        "source": {
          "label": "Awaam — Apple Music",
          "url": "https://music.apple.com/us/album/awaam-feat-mooroo-single/1498241042"
        }
      }
    },
    {
      "id": "talha-anjum",
      "name": "Talha Anjum",
      "anchor": {
        "date": "2013-01-01",
        "precision": "year",
        "label": "Young Stunners activity since 2013, documented by Apple Music; year precision",
        "source": {
          "label": "Talha Anjum — Apple Music artist biography",
          "url": "https://music.apple.com/us/artist/talha-anjum/1478621505"
        }
      }
    },
    {
      "id": "sunny-khan-durrani",
      "name": "Sunny Khan Durrani",
      "anchor": {
        "date": "2018-10-19",
        "precision": "day",
        "label": "Khabbarnaama — first verified project included here; not a career start",
        "source": {
          "label": "Khabbarnaama — Apple Music",
          "url": "https://music.apple.com/us/album/khabbarnaama/1827890184"
        }
      }
    },
    {
      "id": "jani",
      "name": "JANI",
      "anchor": {
        "date": "2021-03-07",
        "precision": "day",
        "label": "Vible — first verified project included here; not a career start",
        "source": {
          "label": "Vible — Apple Music",
          "url": "https://music.apple.com/us/album/vible-ep/1555885787"
        }
      }
    }
  ],
  "projects": [
    {
      "id": "talha-anjum-rebirth",
      "artistId": "talha-anjum",
      "title": "Rebirth",
      "date": "2017-07-01",
      "type": "album",
      "sources": [
        {
          "label": "Rebirth — Apple Music",
          "url": "https://music.apple.com/us/album/rebirth/1622105491"
        }
      ],
      "credits": "Young Stunners, Talha Anjum & Talhah Yunus",
      "note": "Young Stunners album, credited to the duo and both members. Shown on Talha Anjum’s lane as a group project, not a solo debut."
    },
    {
      "id": "talha-anjum-open-letter",
      "artistId": "talha-anjum",
      "title": "Open Letter",
      "date": "2023-02-18",
      "type": "album",
      "sources": [
        {
          "label": "Open Letter — Apple Music",
          "url": "https://music.apple.com/us/album/open-letter/1774370423"
        },
        {
          "label": "Open Letter — original Spotify catalog date",
          "url": "https://open.spotify.com/album/66sgvYGlzFD9QyMzHYFqRh"
        },
        {
          "label": "Open Letter — Apple Music title-track date",
          "url": "https://music.apple.com/us/song/1774371672"
        }
      ],
      "credits": "Talha Anjum & Umair",
      "dateSource": {
        "label": "Open Letter — original Spotify catalog date",
        "url": "https://open.spotify.com/album/66sgvYGlzFD9QyMzHYFqRh"
      },
      "note": "Original album date is 18 February 2023, confirmed by Spotify and Apple’s title-track page. The linked Apple album reissue says 18 February 2024; artwork provenance retains that edition date."
    },
    {
      "id": "talha-anjum-ghosts-and-goodbyes",
      "artistId": "talha-anjum",
      "title": "ghosts, and goodbyes",
      "date": "2024-08-08",
      "type": "ep",
      "sources": [
        {
          "label": "ghosts, and goodbyes — Apple Music",
          "url": "https://music.apple.com/us/album/ghosts-and-goodbyes-single/1760165663"
        },
        {
          "label": "Shazam — EP classification",
          "url": "https://www.shazam.com/artist/talha-anjum/1478621505/releases"
        }
      ],
      "credits": "Umair & Talha Anjum",
      "note": "Apple Music includes “Single” in this short project’s title; Apple-owned Shazam explicitly classifies it as an EP. The artist is a credited main artist on the complete project."
    },
    {
      "id": "talha-anjum-for-tha-dogs",
      "artistId": "talha-anjum",
      "title": "FOR THA DOGS",
      "date": "2024-08-13",
      "type": "ep",
      "sources": [
        {
          "label": "FOR THA DOGS — Apple Music",
          "url": "https://music.apple.com/us/album/for-tha-dogs-single/1763147383"
        },
        {
          "label": "Shazam — EP classification",
          "url": "https://www.shazam.com/artist/talha-anjum/1478621505/releases"
        }
      ],
      "credits": "Talha Anjum & Umair",
      "note": "Apple Music includes “Single” in this short project’s title; Apple-owned Shazam explicitly classifies it as an EP. The artist is a credited main artist on the complete project."
    },
    {
      "id": "talha-anjum-10-minute-drill",
      "artistId": "talha-anjum",
      "title": "1O Minute Drill",
      "date": "2024-10-02",
      "type": "ep",
      "sources": [
        {
          "label": "1O Minute Drill — Apple Music",
          "url": "https://music.apple.com/us/album/1o-minute-drill-single/1831227814"
        },
        {
          "label": "Shazam — EP classification",
          "url": "https://www.shazam.com/artist/talha-anjum/1478621505/releases"
        }
      ],
      "credits": "JJ47, Talha Anjum & Jokhay",
      "note": "Apple Music includes “Single” in this short project’s title; Apple-owned Shazam explicitly classifies it as an EP. The artist is a credited main artist on the complete project."
    },
    {
      "id": "talha-anjum-my-terrible-mind",
      "artistId": "talha-anjum",
      "title": "My Terrible Mind",
      "date": "2024-11-29",
      "type": "album",
      "sources": [
        {
          "label": "My Terrible Mind — Apple Music",
          "url": "https://music.apple.com/us/album/my-terrible-mind/1778624011"
        }
      ],
      "credits": "Talha Anjum & Umair"
    },
    {
      "id": "sunny-khabbarnaama",
      "artistId": "sunny-khan-durrani",
      "title": "Khabbarnaama",
      "date": "2018-10-19",
      "type": "album",
      "sources": [
        {
          "label": "Khabbarnaama — Apple Music",
          "url": "https://music.apple.com/us/album/khabbarnaama/1827890184"
        }
      ]
    },
    {
      "id": "sunny-aetizaaz",
      "artistId": "sunny-khan-durrani",
      "title": "Aetizaaz",
      "date": "2020-01-10",
      "type": "album",
      "sources": [
        {
          "label": "Aetizaaz — Apple Music",
          "url": "https://music.apple.com/us/album/aetizaaz/1827889858"
        }
      ]
    },
    {
      "id": "sunny-the-butterfly-effect",
      "artistId": "sunny-khan-durrani",
      "title": "The Butterfly Effect",
      "date": "2020-02-04",
      "type": "album",
      "sources": [
        {
          "label": "The Butterfly Effect — Apple Music",
          "url": "https://music.apple.com/us/album/the-butterfly-effect/1827890623"
        }
      ]
    },
    {
      "id": "sunny-siyaah",
      "artistId": "sunny-khan-durrani",
      "title": "Siyaah",
      "date": "2024-03-07",
      "type": "album",
      "sources": [
        {
          "label": "Siyaah — Apple Music",
          "url": "https://music.apple.com/us/album/siyaah/1827890647"
        }
      ]
    },
    {
      "id": "jani-vible",
      "artistId": "jani",
      "title": "Vible",
      "date": "2021-03-07",
      "type": "ep",
      "sources": [
        {
          "label": "Vible — Apple Music",
          "url": "https://music.apple.com/us/album/vible-ep/1555885787"
        }
      ],
      "note": "Uses the earlier takeCTRL/JANI catalog edition dated 7 March 2021; the later Mass Appeal edition is dated 22 April 2021."
    },
    {
      "id": "jani-alag-lane",
      "artistId": "jani",
      "title": "Alag Lane",
      "date": "2021-04-22",
      "type": "album",
      "sources": [
        {
          "label": "Alag Lane — Apple Music",
          "url": "https://music.apple.com/us/album/alag-lane/1563950314"
        }
      ],
      "note": "Uses the 13-track 2021 JANI catalog edition; a later catalog edition is dated 22 April 2022."
    },
    {
      "id": "jani-lostalgia",
      "artistId": "jani",
      "title": "Lostalgia",
      "date": "2023-09-17",
      "type": "album",
      "sources": [
        {
          "label": "Lostalgia — Apple Music",
          "url": "https://music.apple.com/us/album/lostalgia/1707639574"
        }
      ]
    },
    {
      "id": "jani-heart-to-heart",
      "artistId": "jani",
      "title": "Heart to Heart",
      "date": "2024-12-06",
      "type": "ep",
      "sources": [
        {
          "label": "Heart to Heart — Apple Music",
          "url": "https://music.apple.com/us/album/heart-to-heart-ep/1781259177"
        }
      ]
    }
  ],
  "coverage": "A sourced selection from the four artists in the original Urdu disc, through 2024. Faris Shafi is retained with his documented single anchor and no eligible album/EP/mixtape bands. Single releases, guest-only projects, unresolved format claims and later releases are excluded. Karachi is a representative hub; the scene also includes artists from Lahore and Peshawar."
} satisfies RadialScene;
