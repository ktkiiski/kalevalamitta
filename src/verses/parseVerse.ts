import { FillToken, SyllableToken, Token } from '../finnish/hyphenateText';
import isLongVowelSyllable from '../finnish/isLongVowelSyllable';
import isShortSyllable from '../finnish/isShortSyllable';

export interface Trokee {
  syllables: TrokeeSyllable[];
  tokens: (FillToken | TrokeeSyllable)[];
}

export type SyllableError = 'A' | 'B' | '1' | '2' | '3' | '4';

export interface Verse {
  trokees: Trokee[];
  syllableCount: number;
}

interface TrokeeSyllable extends SyllableToken {
  errors: SyllableError[];
}

export default function parseVerse(tokens: Token[]): Verse {
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
  let syllableCount = 0;
  trokees.forEach(({ syllables }, trokeeIdx) => {
    const trokeeSyllableCount = syllables.length;
    syllableCount += trokeeSyllableCount;
    const isLastTrokee = trokeeIdx === trokees.length - 1;
    syllables.forEach((syllable, syllableIndex) => {
      const isFirstInTrokee = syllableIndex === 0;
      const isLastInTrokee = syllableIndex === trokeeSyllableCount - 1;
      const isLastInVerse = isLastTrokee && syllableIndex === trokeeSyllableCount - 1;
      if (syllable.beginsWord && syllable.endsWord) {
        // Additional rule 2: one-syllable word can be anywhere, except in the end
        if (isLastInVerse) {
          syllable.errors.push('2');
        }
      } else if (trokeeIdx > 0) {
        // Additional rule 1: main rules do not affect the first trokee
        // Main rule A
        if (isFirstInTrokee && syllable.beginsWord && isShortSyllable(syllable.text)) {
          syllable.errors.push('A');
        }
        // Main rule B
        if (isLastInTrokee && syllable.beginsWord && !isShortSyllable(syllable.text)) {
          syllable.errors.push('B');
        }
      }
      // Additional rule 3: "kesuura"
      if (syllable.endsWord && syllable.index === 3 && isLastInTrokee && trokeeIdx === 2) {
        syllable.errors.push('3');
      }
      // Additional rule 4: last syllable in the verse must be short
      if (isLastInVerse && isLongVowelSyllable(syllable.text)) {
        syllable.errors.push('4');
      }
    });
  });
  return { trokees, syllableCount };
}
