import isConsonant from './isConsonant';
import isDiftong from './isDiftong';
import isVowel from './isVowel';

function isSyllableSplit(prevChar: string, currentChar: string, nextChar: string, isFirst: boolean): boolean {
  if (!isConsonant(currentChar) && !isVowel(currentChar)) {
    // This is not a regular letter
    return true;
  }
  if (isConsonant(currentChar) && isVowel(nextChar)) {
    // Consonant followed by a vowel
    return true;
  }
  if (isVowel(prevChar) && isVowel(currentChar)) {
    // A vowel followed by a vowel
    if (prevChar === currentChar) {
      return false;
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
    const prevChar = word[index - 1].toLocaleLowerCase();
    const currentChar = word[index].toLocaleLowerCase();
    const nextChar = word[index + 1]?.toLocaleLowerCase();
    if (isSyllableSplit(prevChar, currentChar, nextChar, !syllabales.length)) {
      syllabales.push(word.slice(lastSplitIndex, index));
      lastSplitIndex = index;
    }
  }
  syllabales.push(word.slice(lastSplitIndex, index));
  return syllabales;
}
