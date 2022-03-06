import hyphenateWord from './hyphenateWord';

const hyphenations = [
  'ka-la',
  'lui-ta',
  'met-sää',
  'kui-ten-kin',
  'ta-lo-aan',
  'vih-re-ään',
  'kurs-si',
  'ken-gät',
  'ai-no-a',
  'hert-tu-aa',
  'köy-hi-en',
  'puo-lu-ei-ta',
  'pie-ni',
  'tuo-li',
  'pa-pe-ri-en',
  'hy-gi-e-ni-a',
  'vi-an',
  'se-as-sa',
  'lo-as-sa',
  'mu-as-sa',
  'di-a',
  'kor-ke-a',
  'myl-ly-ä',
  'nai-sel-li-suu-te-mat-to-muu-te-ni',
  'yk-sik-ses-kös',
];
describe('hyphenate', () => {
  hyphenations.forEach((hyphenatedWord) => {
    const syllabales = hyphenatedWord.split('-');
    const word = syllabales.join('');
    test(`word ${JSON.stringify(word)}`, () => {
      expect(hyphenateWord(word)).toEqual(syllabales);
    });
  });
});
