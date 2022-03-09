import { FillToken, SyllableToken, Token } from '../finnish/hyphenateText';
import isLongVowelSyllable from '../finnish/isLongVowelSyllable';
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
  trokees.forEach(({ syllables }, trokeeIdx) => {
    const isLastTrokee = trokeeIdx === trokees.length - 1;
    syllables.forEach((syllable, syllableIndex) => {
      const isLastInVerse = isLastTrokee && syllableIndex === syllables.length - 1;
      if (syllable.beginsWord && syllable.endsWord) {
        // One-syllable word can be anywhere, except in the end
        if (isLastInVerse) {
          syllable.errors.push('2');
        }
      } else if (trokeeIdx > 0) {
        const isFirst = syllableIndex === 0;
        const isLast = syllableIndex === syllables.length - 1;
        if (isFirst && syllable.beginsWord && isShortSyllable(syllable.text)) {
          syllable.errors.push('A');
        }
        if (isLast && syllable.beginsWord && !isShortSyllable(syllable.text)) {
          syllable.errors.push('B');
        }
      }
      if (isLastInVerse && isLongVowelSyllable(syllable.text)) {
        syllable.errors.push('4');
      }
    });
  });
  return trokees;
}
