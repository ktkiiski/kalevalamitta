const vowels = 'aeiouyäöä';
const consonants = 'bcdfghjklmnpqrstvwxz';
const diftongs = ['ai', 'ei', 'oi', 'äi', 'öi', 'ey', 'äy', 'öy', 'au', 'eu', 'ou', 'ui', 'yi', 'iu', 'iy'];
const earlyDiftongs = ['ie', 'uo', 'yö'];

export default function hyphenateWord(word: string): string[] {
  const syllabales: string[] = [];
  let lastSplitIndex = 0;
  let index: number;
  for (index = 1; index < word.length; index += 1) {
    if (consonants.includes(word[index]) && vowels.includes(word[index + 1])) {
      syllabales.push(word.slice(lastSplitIndex, index));
      lastSplitIndex = index;
    } else if (
      vowels.includes(word[index - 1]) &&
      vowels.includes(word[index]) &&
      word[index - 1] !== word[index] &&
      !(
        diftongs.includes(word[index - 1] + word[index]) ||
        (!syllabales.length && earlyDiftongs.includes(word[index - 1] + word[index]))
      )
    ) {
      syllabales.push(word.slice(lastSplitIndex, index));
      lastSplitIndex = index;
    }
  }
  syllabales.push(word.slice(lastSplitIndex, index));
  return syllabales;
}
