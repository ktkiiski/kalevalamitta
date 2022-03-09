import isVowel from './isVowel';

export default function isLongVowelSyllable(syllable: string): boolean {
  const { length } = syllable;
  for (let i = 0; i < length - 1; i += 1) {
    const char = syllable[i];
    if (isVowel(char) && syllable[i + 1] === char) {
      return true;
    }
  }
  return false;
}
