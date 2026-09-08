import type { ArtistProfile } from '../charts/types';
import { bombayPunjabiProfiles } from './artist-profiles-bombay-punjabi';
import { delhiUrduProfiles } from './artist-profiles-delhi-urdu';
import { regionalProfiles } from './artist-profiles-regional';

export const artistProfiles: Record<string, ArtistProfile> = {
  ...bombayPunjabiProfiles,
  ...delhiUrduProfiles,
  ...regionalProfiles,
};
