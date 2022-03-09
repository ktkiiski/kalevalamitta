const diftongs = ['ai', 'ei', 'oi', 'äi', 'öi', 'ey', 'äy', 'öy', 'au', 'eu', 'ou', 'ui', 'yi', 'iu', 'iy'];
const earlyDiftongs = ['ie', 'uo', 'yö'];

export default function isDiftong(letters: string, isFirstSyllable: boolean) {
  const candidate = letters.toLocaleLowerCase();
  return diftongs.includes(candidate) || (isFirstSyllable && earlyDiftongs.includes(candidate));
}
