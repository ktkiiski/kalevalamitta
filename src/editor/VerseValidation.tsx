import classNames from 'classnames';
import isInvalidVerse from '../verses/isInvalidVerse';
import isTooLongVerse from '../verses/isTooLongVerse';
import isTooShortVerse from '../verses/isTooShortVerse';
import { Verse } from '../verses/parseVerse';
import styles from './VerseValidation.module.css';

interface VerseValidationProps {
  className?: string;
  verse: Verse;
}

function VerseValidation({ className, verse }: VerseValidationProps) {
  const { syllableCount } = verse;
  if (!syllableCount) {
    return null;
  }
  if (isTooShortVerse(verse)) {
    return <span className={classNames(className, styles.short)}>{`${syllableCount}/8`}</span>;
  }
  if (isTooLongVerse(verse)) {
    return <span className={classNames(className, styles.long)}>{`${syllableCount}!`}</span>;
  }
  if (isInvalidVerse(verse)) {
    return <span className={classNames(className, styles.error)}>❌</span>;
  }
  return <span className={classNames(className, styles.valid)}>✅</span>;
}

export default VerseValidation;
