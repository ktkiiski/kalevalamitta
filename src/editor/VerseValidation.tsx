import classNames from 'classnames';
import { VFC } from 'react';
import isTooLongVerse from '../verses/isTooLongVerse';
import isTooShortVerse from '../verses/isTooShortVerse';
import isInvalidVerse from '../verses/isInvalidVerse';
import { Verse } from '../verses/parseVerse';
import styles from './VerseValidation.module.css';

interface VerseValidationProps {
  className?: string;
  verse: Verse;
}

const VerseValidation: VFC<VerseValidationProps> = ({ className, verse }) => {
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
};

export default VerseValidation;
