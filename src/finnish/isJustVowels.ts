import isVowel from './isVowel';

export default function isJustVowels(str: string): boolean {
  for (const char of str) {
    if (!isVowel(char)) return false;
  }
  return true;
}
