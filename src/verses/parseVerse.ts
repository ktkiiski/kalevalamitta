import { FillToken, SyllableToken, Token } from '../finnish/hyphenateText';
import isShortSyllable from '../finnish/isShortSyllable';

export interface Trokee {
  syllables: TrokeeSyllable[];
  tokens: (FillToken | TrokeeSyllable)[];
}

export type VerseValidationError = 'A' | 'B' | '1' | '2' | '3' | '4';

interface TrokeeSyllable extends SyllableToken {
  errors: VerseValidationError[];
}

export default function parseVerse(tokens: Token[]): Trokee[] {
  const trokees: Trokee[] = [];
  for (let tokenIdx = tokens.length - 1; tokenIdx >= 0; tokenIdx -= 1) {
    const rawToken = tokens[tokenIdx];
    const token =
      rawToken.type === 'fill'
        ? rawToken
        : {
            ...rawToken,
            errors: [],
          };
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
  // Validate the verse
  trokees.forEach((trokee, trokeeIdx) => {
    if (trokeeIdx > 0) {
      trokee.syllables.forEach((syllable, syllableIndex) => {
        if (syllable.beginsWord && syllable.endsWord) {
          // Ignore one-syllable words
          return;
        }
        const isFirst = syllableIndex === 0;
        const isLast = syllableIndex === trokee.syllables.length - 1;
        if (isFirst && syllable.beginsWord && isShortSyllable(syllable.text)) {
          syllable.errors.push('A');
        }
        if (isLast && syllable.beginsWord && !isShortSyllable(syllable.text)) {
          syllable.errors.push('B');
        }
      });
    }
  });
  return trokees;
}
