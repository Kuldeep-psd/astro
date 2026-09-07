export type DiscSheet = {
  id: string;
  number: string;
  title: string;
  scenes: string;
  image: string;
  width: number;
  height: number;
  alt: string;
};

export const discSheets: DiscSheet[] = [
  {
    id: 'bombay-punjabi',
    number: '01',
    title: 'Bombay + Punjabi',
    scenes: 'Bombay · Punjabi',
    image: 'city3.jpg',
    width: 1707,
    height: 1161,
    alt: 'Original circular disc infographics for Bombay and Punjabi hip-hop. Named artist rings show colored release marks around the dates printed on each inner ring.',
  },
  {
    id: 'delhi-urdu',
    number: '02',
    title: 'Delhi + Urdu',
    scenes: 'Delhi · Urdu',
    image: 'city2.jpg',
    width: 1707,
    height: 1227,
    alt: 'Original circular disc infographics for Delhi and Urdu hip-hop. Named artist rings show colored release marks around the dates printed on each inner ring.',
  },
  {
    id: 'pune-goa-more',
    number: '03',
    title: 'Pune + Goa + more',
    scenes: 'Pune · Goa · Amd · Koshur',
    image: 'city1.jpg',
    width: 1707,
    height: 1329,
    alt: 'Original circular disc infographics for Pune, Goa, Amd, and Koshur hip-hop. Named artist rings show colored release marks around the dates printed on each inner ring.',
  },
];
