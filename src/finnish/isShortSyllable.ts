import isVowel from './isVowel';

export default function isShortSyllable(syllable: string): boolean {
  const { length } = syllable;
  return isVowel(syllable[length - 1]) && !isVowel(syllable[length - 2]);
}
