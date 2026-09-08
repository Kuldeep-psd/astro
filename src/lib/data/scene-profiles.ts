import type { SceneProfile } from '../charts/types';
import { sceneBios } from './scene-bios';
import westNorthPhotos from '../../../docs/scene-photos-west-north.json';
import regionalPhotos from '../../../docs/scene-photos-regional.json';

// Keep the local images, their alt text and public attribution tied to one source.
const photos = [...westNorthPhotos, ...regionalPhotos];
export const sceneProfiles: Record<string, SceneProfile> = Object.fromEntries(
  photos.map(photo => [photo.sceneId, {
    image: photo.image,
    imageAlt: photo.alt,
    bio: sceneBios[photo.sceneId],
  }]),
);

export const scenePhotoCredits = photos.map(photo => ({
  title: decodeURIComponent(photo.sourceUrl.split('File:')[1]).replaceAll('_', ' ').replace(/\.[^.]+$/, ''),
  author: photo.author,
  sourceUrl: photo.sourceUrl,
  license: photo.license,
  licenseUrl: photo.licenseUrl,
}));
