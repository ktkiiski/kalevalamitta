import hyphenateWord from './hyphenateWord';

export interface FillToken {
  type: 'fill';
  text: string;
  row: number;
  column: number;
}

export interface SyllableToken {
  type: 'syllable';
  text: string;
  row: number;
  column: number;
  index: number;
  beginsWord: boolean;
  endsWord: boolean;
}

export type Token = FillToken | SyllableToken;

export default function hyphenateText(text: string): Token[][] {
  const rows = text.split('\n');
  return rows.map((rowText, rowIndex) => {
    const tokens: Token[] = [];
    const tokenTexts = rowText.split(/(\p{L}+(?:[-']\p{L}+)*)/gu);
    let column = 0;
    tokenTexts.forEach((tokenText, tokenIndex) => {
      if (tokenIndex % 2 === 0) {
        // Fill token
        if (tokenText) {
          tokens.push({
            type: 'fill',
            text: tokenText,
            row: rowIndex,
            column,
          });
        }
      } else {
        // Word
        const wordSyllables = hyphenateWord(tokenText);
        const wordSyllableLastIndex = wordSyllables.length - 1;
        let syllableColumn = column;
        wordSyllables.forEach((syllableText, syllableIndex) => {
          tokens.push({
            type: 'syllable',
            text: syllableText,
            row: rowIndex,
            column: syllableColumn,
            index: syllableIndex,
            beginsWord: syllableIndex === 0,
            endsWord: syllableIndex === wordSyllableLastIndex,
          });
          syllableColumn += syllableText.length;
        });
      }
      column += tokenText.length;
    });
    return tokens;
  });
}
