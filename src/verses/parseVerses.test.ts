import { describe, test, expect } from 'vitest';
import hyphenateText, { Token } from '../finnish/hyphenateText';
import parseVerses from './parseVerses';

const verses = [
  // Valid verses
  'Kan-na/ met-tä/ kie-les/-sä-si',
  'Ei-pä/ kie-hu/ rau-an/ kie-li',
  'Las-ki/ lau-lel/-len ve/-si-ä',
  'Las-ki/ lau-lel/-len ve/-si-ä',
  'Sam-ma/-kon sa/-la-vi/-ho-ja',
  'Luu-le/-vi, a/-jat-te/-le-vi',
  'se-tä/-ni a/-suu ta/-los-sa',
  'tu-let/-han si/-nä ta/-kai-sin',
  'kis-sa/ pel-kä/-si mi/-nu-a',
  'se on/ mun se/-tä-ni/ kis-sa',
  'Lu-van/ an-toi/ suu-ri/ luo-ja',
  'Pis-ti/ suit-set/ kul-lan/ suu-hun',
  'It-se/ tuon sa/-noik-si/ virk-ki.',
  'tä-tä/ mies-tä/ nuo-rem/-pa-ta',
  'lap-pa/-lai-nen/ lai-ha/ poi-ka',
  'lai-ha/ poi-ka/ lap-pa/-lai-nen',
  'pi-dä/ huol-ta/ it-ses/-tä-si.',
  // Verses breaking the main rule A
  'en-kä/ tie-dä/ {e:A}-män/-näs-tä',
  'ek-syy/ {u:A}-ni/-kal-li/-ol-le',
  'sy-dä/-men-sä/ {sa:A}-lo/-mail-la',
  'mai-set/ mur-heet/ {mu:A}-ka/-nan-sa.',
  // Verses breaking the main rule B
  'syö-den/ sät-ki/-vää {jout:B}/-sen-ta',
  'se on/ sem-mo/-nen {hom:B}/-me-li',
  // Verses that are exceptions to main rule A
  'o-saa/ or-ja/-na e/-le-ä',
  'nuo-ruu/-es-ta/ van-huu/-es-ta',
  'pi-ti/ vii-kois/-ta py/-hyyt-tä',
  'hui-muus/ hurs-tin/ hul-pi/-loil-le',
  // Verses breaking the additional rule 2
  'Kolk-ko/-ja ko/-to-na/ näin {ma:2}',
  // Verses breaking the additional rule 3
  'tä-tä/ nuo-rem/-pa-{ta:3}/ mies-tä',
  'lai-ha/ lap-pa/-lai-{nen:3}/ poi-ka',
  'pi-dä/ it-ses/-tä-{si:3}/ huol-ta',
  // Verses breaking the additional rule 4
  'saa-pui/ ker-ran/ kor-ven/ kolk-{kaan:4}',
  'suh-det/-tan-sa/ Suo-men/ luon-{toon:4}',
  'tai-si/ muut-taa/ Lap-peen/-ran-{taan:4}',
  // TODO: Compound words
  // http://www.karuse.info/index.php?option=com_content&view=article&id=6&Itemid=16
];

function parseVersesAsString(tokens: Token[]): string {
  const parsedVerses = parseVerses(tokens);
  return parsedVerses
    .map((verse) =>
      verse.trokees
        .map((trokee) =>
          trokee.tokens
            .map((token) => {
              let { text } = token;
              if (token.type === 'syllable') {
                if (token.errors.length) {
                  text = `{${text}:${token.errors.join(':')}}`;
                }
                if (!token.beginsWord) {
                  text = `-${text}`;
                }
              }
              return text;
            })
            .join(''),
        )
        .join('/'),
    )
    .join('\n');
}

describe('parseVerses', () => {
  verses.forEach((expected) => {
    test(`parses ${JSON.stringify(expected)}`, () => {
      const verseText = expected.replace(/[/-]/g, '').replace(/{(\w+).*?}/g, '$1');
      const hyphenation = hyphenateText(verseText);
      expect(parseVersesAsString(hyphenation)).toBe(expected);
    });
  });
});
