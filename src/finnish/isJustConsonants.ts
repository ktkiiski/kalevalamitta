import isConsonant from './isConsonant';

export default function isJustConsonants(str: string): boolean {
  for (const char of str) {
    if (!isConsonant(char)) return false;
  }
  return true;
}
