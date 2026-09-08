import type { RadialScene } from '../charts/types';

// Reconstructed from the original disc; release metadata is linked to primary sources.
export const puneScene = {
  "id": "pune",
  "name": "Pune",
  "color": "#bca2ed",
  "start": "2018-01-01",
  "end": "2025-01-01",
  "location": {
    "label": "Pune",
    "latitude": 18.5204,
    "longitude": 73.8567,
    "source": {
      "label": "Maharashtra Pollution Control Board — Pune city location",
      "url": "https://mpcb.gov.in/sites/default/files/Establishment%20of%20MPCB/Seniority%20list/2014/Pune_Final_EI_%26_SA_Report_July_2024.pdf"
    }
  },
  "artists": [
    {
      "id": "mc-stan",
      "name": "MC Stan",
      "anchor": {
        "date": "2018-08-08",
        "precision": "day",
        "label": "Wata — documented catalog release; not a career start",
        "source": {
          "label": "Wata — release evidence",
          "url": "https://music.apple.com/us/album/wata-single/1533264361"
        }
      }
    },
    {
      "id": "vijay-dk",
      "name": "Vijay DK",
      "anchor": {
        "date": "2020-11-08",
        "precision": "day",
        "label": "Alhamdulillah — earliest verified catalog release found here; earlier activity is not dated",
        "source": {
          "label": "Alhamdulillah — release evidence",
          "url": "https://music.apple.com/us/album/alhamdulillah-feat-apy-single/1629012116"
        }
      }
    }
  ],
  "projects": [
    {
      "id": "mc-stan-tadipaar",
      "artistId": "mc-stan",
      "title": "Tadipaar",
      "date": "2020-12-31",
      "type": "album",
      "sources": [
        {
          "label": "Tadipaar — Apple Music",
          "url": "https://music.apple.com/us/album/tadipaar/1548245520"
        },
        {
          "label": "MC Stan — Apple Music artist editorial",
          "url": "https://music.apple.com/us/artist/mc-stan/1530205305"
        }
      ],
      "note": "Apple groups this edition under compilations, but its artist editorial explicitly describes Tadipaar as the 2020 debut album."
    },
    {
      "id": "mc-stan-insaan",
      "artistId": "mc-stan",
      "title": "Insaan",
      "date": "2022-02-18",
      "type": "album",
      "sources": [
        {
          "label": "Insaan — Apple Music",
          "url": "https://music.apple.com/us/album/insaan/1610309563"
        }
      ]
    },
    {
      "id": "vijay-dk-4three4life",
      "artistId": "vijay-dk",
      "title": "4Three4Life",
      "date": "2023-11-22",
      "type": "ep",
      "sources": [
        {
          "label": "4Three4Life — Apple Music",
          "url": "https://music.apple.com/us/album/4three4life-ep/1715949992"
        }
      ]
    }
  ],
  "coverage": "Selected verified projects by the two artists grouped on the original Pune disc. This grouping preserves the source illustration rather than asserting each artist’s birthplace. Singles and guest-only releases are excluded; dates are for the linked catalog editions."
} satisfies RadialScene;
