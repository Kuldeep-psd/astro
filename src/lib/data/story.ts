export interface StoryImage {
  src: string;
  alt: string;
  caption: string;
}

export interface StoryChapter {
  id: string;
  number: string;
  period: string;
  title: string;
  intro: string;
  paragraphs: string[];
  image?: StoryImage;
}

// An adaptation of the original narrative. Replace chapter copy here when the
// next editorial draft is ready; keep ids stable to preserve navigation links.
const asset = (filename: string) => `${import.meta.env.BASE_URL}assets/${filename}`;

export const chapters: StoryChapter[] = [
  {
    id: 'origins',
    number: '01',
    period: '1970s · The Bronx',
    title: 'A neighbourhood finds its voice.',
    intro: 'Before it travelled the world, hip-hop brought a neighbourhood together.',
    paragraphs: [
      'In the Bronx of the 1970s, block parties became spaces for experimentation. DJs including Kool Herc and Grandmaster Flash helped shape a culture around breaks, turntables and the energy of a crowd.',
      'Against a backdrop of economic hardship, racial inequality and neglected communities, hip-hop offered a way to make something of your own. Music, movement and self-expression grew through the people who gathered around them.',
    ],
  },
  {
    id: 'global',
    number: '02',
    period: '1980s–2000s · Across borders',
    title: 'The sound travels. The story changes.',
    intro: 'Records crossed borders. Artists made the language their own.',
    paragraphs: [
      'Run-D.M.C., Public Enemy, N.W.A, Tupac and the Notorious B.I.G. helped bring rap to wider audiences. MTV, mixtapes and later the internet carried the music beyond its first communities.',
      'New scenes developed in France, Germany, Japan and South Korea. Artists such as IAM, MC Solaar, Advanced Chemistry, King Giddra and Epik High connected hip-hop with local languages, experiences and musical traditions.',
    ],
    image: {
      src: asset('world.jpg'),
      alt: 'World map with coloured markers showing selected hip-hop scenes by decade, from the 1970s to the 2010s.',
      caption: 'Hip-hop across borders, as illustrated in the original narrative.',
    },
  },
  {
    id: 'streaming',
    number: '03',
    period: '2000s onward · A connected world',
    title: 'Every scene can find a listener.',
    intro: 'Online platforms opened new routes between artists and audiences.',
    paragraphs: [
      'YouTube, SoundCloud and TikTok helped music move between local scenes and distant listeners. Regional sounds became part of a conversation that could travel in many directions.',
      'Chicago drill influenced London, and UK drill in turn reached New York. Latin trap brought new connections with reggaeton. Afrobeats and hip-hop continued to meet through artists including Burna Boy and Wizkid. Each exchange added another accent to the music.',
    ],
  },
  {
    id: 'india',
    number: '04',
    period: '1990s onward · India',
    title: 'A global form. Local lives.',
    intro: 'In India, hip-hop became a space for many languages and many versions of everyday life.',
    paragraphs: [
      'Early rap and Bollywood crossovers included Baba Sehgal and Style Bhai. Later, artists such as DIVINE and Naezy brought gully rap to a wider audience, with stories grounded in their neighbourhoods.',
      'Commercial pop-rap and independent scenes developed alongside one another, from Badshah and Yo Yo Honey Singh to Seedhe Maut and Prabh Deep. Dalit rap, protest music and regional-language scenes extended the conversation. Hip-hop kept changing with the people who made it.',
    ],
    image: {
      src: asset('india.jpg'),
      alt: 'Illustrated map highlighting selected South Asian hip-hop scenes, including Punjab, Delhi, Bombay, Pune and Goa.',
      caption: 'A selection of South Asian scenes from the original narrative.',
    },
  },
];
