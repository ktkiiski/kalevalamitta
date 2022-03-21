import isConsonant from './isConsonant';
import isDiftong from './isDiftong';
import isJustConsonants from './isJustConsonants';
import isJustVowels from './isJustVowels';
import isVowel from './isVowel';

function isSyllableSplit(candidate: string, currentChar: string, nextChar: string, isFirst: boolean): boolean {
  const prevChar = candidate[candidate.length - 1];
  if (!isConsonant(currentChar) && !isVowel(currentChar)) {
    // This is not a regular letter
    return true;
  }
  if (isConsonant(currentChar) && isVowel(nextChar) && !isJustConsonants(candidate)) {
    // Consonant followed by a vowel
    return true;
  }
  if (isVowel(prevChar) && isVowel(currentChar)) {
    // A vowel followed by a vowel
    if (prevChar.toLocaleLowerCase() === currentChar.toLocaleLowerCase()) {
      return false;
    }
    if (candidate.length >= 2 && isJustVowels(candidate)) {
      // Do not allow 3 successive vowels
      return true;
    }
    return !isDiftong(prevChar + currentChar, isFirst);
  }
  return false;
}

export default function hyphenateWord(word: string): string[] {
  const syllabales: string[] = [];
  let lastSplitIndex = 0;
  let index: number;
  for (index = 1; index < word.length; index += 1) {
    const candidate = word.slice(lastSplitIndex, index);
    const currentChar = word[index].toLocaleLowerCase();
    const nextChar = word[index + 1]?.toLocaleLowerCase();
    if (isSyllableSplit(candidate, currentChar, nextChar, !syllabales.length)) {
      syllabales.push(candidate);
      lastSplitIndex = index;
    }
  }
  syllabales.push(word.slice(lastSplitIndex, index));
  return syllabales;
}
