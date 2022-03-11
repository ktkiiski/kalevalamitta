import { Verse } from './parseVerse';

export default function isTooShortVerse(verse: Verse) {
  return verse.syllableCount < 8;
}
