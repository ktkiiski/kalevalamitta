const vowels = 'aeiouyäöä';
const consonants = 'bcdfghjklmnpqrstvwxz';
const diftongs = ['ai', 'ei', 'oi', 'äi', 'öi', 'ey', 'äy', 'öy', 'au', 'eu', 'ou', 'ui', 'yi', 'iu', 'iy'];
const earlyDiftongs = ['ie', 'uo', 'yö'];

function isSyllableSplit(prevChar: string, currentChar: string, nextChar: string, isFirst: boolean): boolean {
  if (!consonants.includes(currentChar) && !vowels.includes(currentChar)) {
    // This is not a regular letter
    return true;
  }
  if (consonants.includes(currentChar) && vowels.includes(nextChar)) {
    // Consonant followed by a vowel
    return true;
  }
  if (vowels.includes(prevChar) && vowels.includes(currentChar)) {
    // A vowel followed by a vowel
    if (prevChar === currentChar) {
      return false;
    }
    const diftong = prevChar + currentChar;
    return !diftongs.includes(diftong) && (!isFirst || !earlyDiftongs.includes(diftong));
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
