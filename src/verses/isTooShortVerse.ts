import { Verse } from './parseVerses';

export default function isTooShortVerse(verse: Verse) {
  return verse.syllableCount < 8;
}
