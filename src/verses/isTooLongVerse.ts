import { Verse } from './parseVerse';

export default function isTooLongVerse(verse: Verse) {
  return verse.syllableCount > 9;
}
