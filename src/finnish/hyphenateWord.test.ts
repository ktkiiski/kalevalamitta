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
  'mie-le-ni',
  'mi-nun',
  'te-ke-vi',
  'ai-vo-ni',
  'a-jat-te-le-vi',
  'läh-te-ä-ni',
  // CV
  'ka-la',
  'su-ku',
  'ma-ta-la',
  // CVC
  'kas-tet-ta',
  'ras-tas',
  'mul-lat',
  // CVV
  'tuu-li',
  'maa',
  'sou-taa',
  // CVVC
  'kaar-re',
  'liit-to',
  'raus-ku',
  'ry-tyyt-tää',
  // VC
  'us-ko',
  'ok-sa',
  'au-tu-as',
  // V
  'i-lo',
  'o-sa',
  'a-pe-a',
  'yk-si-ö',
  // VV
  'aa-mu',
  'uu-si',
  'au-ke-aa',
  'ai-to',
  // CVCC
  'kars-ki',
  'vers-tas',
  'lank-ku',
  // VVC
  'ais-ti',
  'uit-taa',
  'as-ti-aan',
  // VCC
  'irs-tas',
  'urk-ki-a',
  // Words with special characters
  // 'lau-la-ma-han,',
  "saa-'a-ni",
  // 'sa-ne-le-ma-han.',
  // 'kas-vin-kump-pa-li-ni!',
  // Words with upper casing
  'Ka-la',
  'LUI-TA',
  'met-SäÄ',
  'kUi-TeN-KiN',
  'TA-lo-AAN',
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