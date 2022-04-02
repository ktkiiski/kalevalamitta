import { SyllableError, Verse } from './parseVerses';

export default function getVerseErrors({ trokees }: Verse): SyllableError[] {
  return trokees.flatMap(({ syllables }) => syllables.flatMap(({ errors }) => errors));
}
