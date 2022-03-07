import { SyllableToken, Token } from '../hyphenation/hyphenateText';

interface Trokee {
  syllables: SyllableToken[];
  tokens: Token[];
}

export default function parseVerse(tokens: Token[]): Trokee[] {
  const trokees: Trokee[] = [];
  for (let tokenIdx = tokens.length - 1; tokenIdx >= 0; tokenIdx -= 1) {
    const token = tokens[tokenIdx];
    let [trokee] = trokees;
    if (!trokee || (token.type === 'syllable' && trokee.syllables.length >= 2 && trokees.length < 4)) {
      trokee = { syllables: [], tokens: [] };
      trokees.unshift(trokee);
    }
    trokee.tokens.unshift(token);
    if (token.type === 'syllable') {
      trokee.syllables.unshift(token);
    }
  }
  return trokees;
}
