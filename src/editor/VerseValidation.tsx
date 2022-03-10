import { VFC } from 'react';
import { Verse } from '../verses/parseVerse';

interface VerseValidationProps {
  className?: string;
  verse: Verse;
}

const VerseValidation: VFC<VerseValidationProps> = ({ className, verse }) => {
  const { trokees, syllableCount } = verse;
  if (!syllableCount) {
    return null;
  }
  if (syllableCount < 8) {
    return <span className={className}>{`${syllableCount}/8`}</span>;
  }
  const errors = trokees.flatMap((trokee) => trokee.syllables.flatMap((syllable) => syllable.errors));
  if (syllableCount > 9 || errors.length) {
    return <span className={className}>❌</span>;
  }
  return <span className={className}>✅</span>;
};

export default VerseValidation;
