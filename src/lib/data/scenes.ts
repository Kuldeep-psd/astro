import type { RadialScene } from '../charts/types';
import { bombayScene } from './bombay';
import { punjabiScene } from './punjabi';
import { delhiScene } from './delhi';
import { urduScene } from './urdu';
import { puneScene } from './pune';
import { goaScene } from './goa';
import { amdScene } from './amd';
import { koshurScene } from './koshur';

// Original sheet order; every scene shares the same renderer and controls.
export const scenes: RadialScene[] = [bombayScene, punjabiScene, delhiScene, urduScene, puneScene, goaScene, amdScene, koshurScene];
