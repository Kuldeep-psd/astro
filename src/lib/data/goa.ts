import type { RadialScene } from '../charts/types';

// Reconstructed from the original disc; release metadata is linked to primary sources.
export const goaScene = {
  "id": "goa",
  "name": "Goa",
  "color": "#ed9aa5",
  "start": "2018-01-01",
  "end": "2025-01-01",
  "location": {
    "label": "Goa · Panaji",
    "latitude": 15.5016,
    "longitude": 73.8282,
    "source": {
      "label": "INCOIS — Panaji station coordinates",
      "url": "https://tsunami.incois.gov.in/TEWS/Link.do?function=tgStationList"
    }
  },
  "artists": [
    {
      "id": "tsumyoki",
      "name": "Tsumyoki",
      "anchor": {
        "date": "2018-12-28",
        "precision": "day",
        "label": "RIP — first verified included project; not a career start",
        "source": {
          "label": "RIP — release evidence",
          "url": "https://open.spotify.com/track/2JcL4RNU24Di3LkRrVlu3f"
        }
      }
    },
    {
      "id": "goa-trap-culture",
      "name": "Goa Trap Culture",
      "anchor": {
        "date": "2020-12-25",
        "precision": "day",
        "label": "I’ve Had Enough — documented crew release; not a formation date",
        "source": {
          "label": "I’ve Had Enough — release evidence",
          "url": "https://music.apple.com/us/album/ive-had-enough-single/1880954697"
        }
      }
    }
  ],
  "projects": [
    {
      "id": "tsumyoki-rip",
      "artistId": "tsumyoki",
      "title": "RIP",
      "date": "2018-12-28",
      "type": "album",
      "sources": [
        {
          "label": "RIP — Apple Music",
          "url": "https://music.apple.com/us/album/rip/1893807902"
        },
        {
          "label": "RIP — original Spotify release date",
          "url": "https://open.spotify.com/track/2JcL4RNU24Di3LkRrVlu3f"
        },
        {
          "label": "RIP — earlier catalog edition — Apple Music",
          "url": "https://music.apple.com/in/album/rip/1878778917"
        }
      ],
      "dateSource": {
        "label": "RIP — original Spotify release date",
        "url": "https://open.spotify.com/track/2JcL4RNU24Di3LkRrVlu3f"
      },
      "note": "Original release: 28 December 2018, verified against Spotify and the earlier Apple edition. The current Apple reissue supplies the cover and listening link but lists 2 January 2019."
    },
    {
      "id": "tsumyoki-this-mixtape-is-garbage",
      "artistId": "tsumyoki",
      "title": "This Mixtape Is Garbage",
      "date": "2020-02-28",
      "type": "mixtape",
      "sources": [
        {
          "label": "This Mixtape Is Garbage — Apple Music",
          "url": "https://music.apple.com/us/album/this-mixtape-is-garbage/1893807772"
        }
      ],
      "note": "Classified as a mixtape from the artist’s explicit project title."
    },
    {
      "id": "tsumyoki-way-too-messy",
      "artistId": "tsumyoki",
      "title": "Way Too Messy",
      "date": "2021-09-14",
      "type": "ep",
      "sources": [
        {
          "label": "Way Too Messy — Apple Music",
          "url": "https://music.apple.com/us/album/way-too-messy-ep/1583182209"
        }
      ],
      "credits": "Tsumyoki & Kidd Mange"
    },
    {
      "id": "tsumyoki-a-message-from-the-moon",
      "artistId": "tsumyoki",
      "title": "A Message from the Moon",
      "date": "2023-06-02",
      "type": "album",
      "sources": [
        {
          "label": "A Message from the Moon — Apple Music",
          "url": "https://music.apple.com/us/album/a-message-from-the-moon/1687776625"
        }
      ]
    },
    {
      "id": "tsumyoki-housephull",
      "artistId": "tsumyoki",
      "title": "HOUSEPHULL",
      "date": "2024-06-02",
      "type": "ep",
      "sources": [
        {
          "label": "HOUSEPHULL — Apple Music",
          "url": "https://music.apple.com/us/album/housephull-ep/1748600224"
        }
      ]
    },
    {
      "id": "goa-trap-culture-daboij",
      "artistId": "goa-trap-culture",
      "title": "Daboij",
      "date": "2021-01-31",
      "type": "album",
      "sources": [
        {
          "label": "Daboij — Apple Music",
          "url": "https://music.apple.com/us/album/daboij/1880990618"
        }
      ],
      "credits": "Goa Trap Culture & Tsumyoki",
      "note": "The current Apple catalog groups the album under Various Artists; all eleven track credits identify Goa Trap Culture and Tsumyoki. Shown once on the crew lane."
    }
  ],
  "coverage": "Selected verified projects by Tsumyoki and Goa Trap Culture from the original disc. Daboij appears on the crew lane only. The Art of Flexing is omitted because its complete Apple Music catalog edition could not be verified. Singles, guest-only appearances and deluxe duplicates are excluded."
} satisfies RadialScene;
