import { Verse } from './parseVerses';

export default function isTooLongVerse(verse: Verse) {
  return verse.syllableCount > 9;
}
