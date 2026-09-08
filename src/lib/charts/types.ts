export type ReleaseType = 'album' | 'ep' | 'mixtape';
export interface Source { label: string; url: string }
export interface ArtistAnchor {
  date: string;
  precision: 'day' | 'year';
  label: string;
  source: Source;
}
export interface ArtistActivityEnd {
  date: string;
  // Year-only endpoints use December 31 for geometry; never show it as an exact day.
  precision?: 'day' | 'year';
  label: string;
  source: Source;
}
export interface SceneProfile {
  image: string;
  imageAlt: string;
  bio: string;
}
export interface ArtistProfile {
  image: string;
  bio: string;
  musicUrl: string;
  platform: 'Apple Music' | 'Spotify';
}
export interface Artist {
  id: string;
  name: string;
  anchor: ArtistAnchor;
  activityEnd?: ArtistActivityEnd;
}
export interface ProjectRelease {
  id: string;
  artistId: string;
  title: string;
  date: string;
  type: ReleaseType;
  sources: Source[];
  dateSource?: Source;
  credits?: string;
  note?: string;
}
export interface SceneLocation {
  label: string;
  country?: 'IN' | 'PK';
  latitude: number;
  longitude: number;
  source: Source;
}
export interface RadialScene {
  id: string;
  name: string;
  color: string;
  start: string;
  end: string;
  artists: Artist[];
  projects: ProjectRelease[];
  coverage: string;
  location?: SceneLocation;
}
export const releaseStyles: Record<ReleaseType, { label: string; color: string; width: number }> = {
  album: { label: 'Album', color: '#f5bf2f', width: 7.2 },
  ep: { label: 'EP', color: '#00d7ee', width: 3.6 },
  mixtape: { label: 'Mixtape', color: '#f15bff', width: 3.6 },
};
export function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(date + 'T00:00:00Z'));
}

export function formatActivityEnd(end: ArtistActivityEnd) {
  return end.precision === 'year' ? end.date.slice(0, 4) + ' (year only)' : formatDate(end.date);
}
