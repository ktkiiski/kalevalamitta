import getVerseErrors from './getVerseErrors';
import isTooLongVerse from './isTooLongVerse';
import isTooShortVerse from './isTooShortVerse';
import { Verse } from './parseVerse';

export default function isInvalidVerse(verse: Verse) {
  return isTooShortVerse(verse) || isTooLongVerse(verse) || getVerseErrors(verse).length;
}
