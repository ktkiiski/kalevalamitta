import hyphenateWord from './hyphenateWord';

export interface FillToken {
  type: 'fill';
  text: string;
  row: number;
  column: number;
  offset: number;
}

export interface SyllableToken {
  type: 'syllable';
  text: string;
  row: number;
  column: number;
  offset: number;
  index: number;
  beginsWord: boolean;
  endsWord: boolean;
}

export interface NewlineToken {
  type: 'newline';
  text: '\n';
  row: number;
  column: number;
  offset: number;
}

export type Token = FillToken | SyllableToken | NewlineToken;

export default function hyphenateText(text: string): Token[] {
  const tokens: Token[] = [];
  const rows = text.split('\n');
  let offset = 0;
  const lastRowIndex = rows.length - 1;
  rows.forEach((rowText, rowIndex) => {
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
            offset,
          });
        }
      } else {
        // Word
        const wordSyllables = hyphenateWord(tokenText);
        const wordSyllableLastIndex = wordSyllables.length - 1;
        let wordOffset = 0;
        wordSyllables.forEach((syllableText, syllableIndex) => {
          tokens.push({
            type: 'syllable',
            text: syllableText,
            row: rowIndex,
            column: column + wordOffset,
            offset: offset + wordOffset,
            index: syllableIndex,
            beginsWord: syllableIndex === 0,
            endsWord: syllableIndex === wordSyllableLastIndex,
          });
          wordOffset += syllableText.length;
        });
      }
      column += tokenText.length;
      offset += tokenText.length;
    });
    if (rowIndex < lastRowIndex) {
      tokens.push({
        type: 'newline',
        text: '\n',
        row: rowIndex,
        column,
        offset,
      });
      offset += 1;
    }
  });
  return tokens;
}
