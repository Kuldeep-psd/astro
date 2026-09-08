import type { RadialScene } from '../charts/types';

// Reconstructed from the original disc; release metadata is linked to primary sources.
export const koshurScene = {
  "id": "koshur",
  "name": "Koshur",
  "color": "#91cfb7",
  "start": "2010-01-01",
  "end": "2025-01-01",
  "location": {
    "label": "Srinagar",
    "latitude": 34.05081667,
    "longitude": 74.80465,
    "source": {
      "label": "National Center for Seismology — Srinagar station coordinates",
      "url": "https://riseq.seismo.gov.in/riseq/ob_network/station_metadata"
    }
  },
  "artists": [
    {
      "id": "mc-kash",
      "name": "MC Kash",
      "anchor": {
        "date": "2010-01-01",
        "precision": "year",
        "label": "I Protest — release year documented in a contemporary artist interview; not a career start",
        "source": {
          "label": "I Protest — release evidence",
          "url": "https://kashmirlife.net/kashmir-raps-1057/"
        }
      },
      "activityEnd": {
        "date": "2016-12-31",
        "precision": "year",
        "label": "Hiatus after 2016; later guest appearances in 2021 and 2022",
        "source": {
          "label": "MC Kash became inactive after 2016 — Outlook",
          "url": "https://www.outlookindia.com/opinion/india-news-hip-hop-found-a-connect-in-pain-of-kashmiris-news-305257"
        }
      }
    },
    {
      "id": "sos",
      "name": "SOS",
      "anchor": {
        "date": "2020-08-26",
        "precision": "day",
        "label": "Psycho — documented catalog release; earlier Khoon Rezi is not precisely dated here",
        "source": {
          "label": "Psycho — release evidence",
          "url": "https://music.apple.com/us/album/psycho-feat-sxr-imaad-single/1529263722"
        }
      }
    },
    {
      "id": "ahmer",
      "name": "Ahmer",
      "anchor": {
        "date": "2018-12-27",
        "precision": "day",
        "label": "Gang Shit — documented catalog release; not a career start",
        "source": {
          "label": "Gang Shit — release evidence",
          "url": "https://music.apple.com/us/album/gang-shit-feat-shaikhspeare-gravity-single/1450692444"
        }
      }
    }
  ],
  "projects": [
    {
      "id": "mc-kash-rebel-republik",
      "artistId": "mc-kash",
      "title": "Rebel RepubliK",
      "date": "2012-11-26",
      "type": "album",
      "sources": [
        {
          "label": "Rebel RepubliK — Apple Music",
          "url": "https://music.apple.com/us/album/rebel-republik/1868400900"
        }
      ],
      "note": "Date follows the linked 2012 catalog edition. Contemporary reporting describes an earlier November launch without a verified precise day."
    },
    {
      "id": "sos-keef",
      "artistId": "sos",
      "title": "KEEF",
      "date": "2022-05-20",
      "type": "ep",
      "sources": [
        {
          "label": "KEEF — Apple Music",
          "url": "https://music.apple.com/us/album/keef-ep/1804714605"
        },
        {
          "label": "SOS — official Keef EP",
          "url": "https://straightouttasrinagar.bandcamp.com/album/keef"
        }
      ],
      "credits": "SOS & Prxphecy"
    },
    {
      "id": "sos-taryaq",
      "artistId": "sos",
      "title": "TARYAQ",
      "date": "2024-11-28",
      "type": "ep",
      "sources": [
        {
          "label": "TARYAQ — Apple Music",
          "url": "https://music.apple.com/us/album/taryaq-ep/1780627866"
        }
      ],
      "credits": "SOS & 30KEY!"
    },
    {
      "id": "ahmer-little-kid-big-dreams",
      "artistId": "ahmer",
      "title": "Little Kid, Big Dreams",
      "date": "2019-07-05",
      "type": "album",
      "sources": [
        {
          "label": "Little Kid, Big Dreams — Apple Music",
          "url": "https://music.apple.com/us/album/little-kid-big-dreams/1804728103"
        }
      ],
      "credits": "Ahmer & Sez on the Beat"
    },
    {
      "id": "ahmer-inqalab",
      "artistId": "ahmer",
      "title": "Inqalab",
      "date": "2019-10-27",
      "type": "mixtape",
      "sources": [
        {
          "label": "Inqalab — Apple Music",
          "url": "https://music.apple.com/us/album/inqalab-ep/1804728050"
        },
        {
          "label": "Ahmer — official Inqalab (Mixtape)",
          "url": "https://ahmermusic.bandcamp.com/album/inqalab-mixtape"
        }
      ],
      "note": "The artist explicitly labels this a mixtape, while Apple applies an EP suffix."
    },
    {
      "id": "ahmer-azli",
      "artistId": "ahmer",
      "title": "AZLI",
      "date": "2022-06-27",
      "type": "album",
      "sources": [
        {
          "label": "AZLI — Apple Music",
          "url": "https://music.apple.com/us/album/azli/1804722715"
        },
        {
          "label": "Ahmer — official AZLI release date",
          "url": "https://ahmermusic.bandcamp.com/album/azli"
        }
      ],
      "dateSource": {
        "label": "Ahmer — official AZLI release date",
        "url": "https://ahmermusic.bandcamp.com/album/azli"
      },
      "note": "The artist’s Bandcamp release is dated 27 June 2022; the linked Apple catalog edition is dated 1 July 2022."
    },
    {
      "id": "ahmer-alive-in-k",
      "artistId": "ahmer",
      "title": "Alive In K.",
      "date": "2024-06-21",
      "type": "ep",
      "sources": [
        {
          "label": "Alive In K. — Apple Music",
          "url": "https://music.apple.com/us/album/alive-in-k-single/1753424558"
        },
        {
          "label": "30KEY! — interview about the Alive In K EP",
          "url": "https://offthedome.in/2024/08/06/candid-conversation-with-30key/"
        }
      ],
      "credits": "Ahmer & 30KEY!",
      "note": "Apple labels the three-track release a Single; co-creator 30KEY!’s interview identifies the complete project as an EP."
    },
    {
      "id": "ahmer-alive-in-k-ii",
      "artistId": "ahmer",
      "title": "ALIVE IN K. II",
      "date": "2024-09-27",
      "type": "ep",
      "sources": [
        {
          "label": "ALIVE IN K. II — Apple Music",
          "url": "https://music.apple.com/us/album/alive-in-k-ii-ep/1769370585"
        }
      ],
      "credits": "Ahmer & 30KEY!"
    }
  ],
  "coverage": "Selected verified projects by MC Kash, SOS and Ahmer. Singles, guest-only projects, compilations, and MC Kash’s unavailable Vault compilation are excluded. Inqalab follows the artist’s mixtape classification; Alive In K follows co-creator 30KEY!’s EP description. AZLI uses the artist’s Bandcamp release date."
} satisfies RadialScene;
