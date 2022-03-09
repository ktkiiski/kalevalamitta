const vowels = 'aeiouyäöäAEIOUYÄÖÄ';

export default function isVowel(char: string): boolean {
  return vowels.includes(char);
}
