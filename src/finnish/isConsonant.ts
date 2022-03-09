const consonants = 'bcdfghjklmnpqrstvwxzBCDFGHJKLMNPQRSTVWXZ';

export default function isConsonant(char: string): boolean {
  return consonants.includes(char);
}
