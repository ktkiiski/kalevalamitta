import classNames from 'classnames';
import isInvalidVerse from '../verses/isInvalidVerse';
import isTooLongVerse from '../verses/isTooLongVerse';
import isTooShortVerse from '../verses/isTooShortVerse';
import { Verse } from '../verses/parseVerse';
import styles from './VerseValidation.module.css';
import { ReactComponent as OkIcon } from './images/ok.svg';
import { ReactComponent as WarningIcon } from './images/warning.svg';

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
    return <span className={classNames(className, styles.text, styles.short)}>{`${syllableCount}/8`}</span>;
  }
  if (isTooLongVerse(verse)) {
    return <span className={classNames(className, styles.text, styles.long)}>{`${syllableCount}!`}</span>;
  }
  if (isInvalidVerse(verse)) {
    return <WarningIcon className={classNames(className, styles.icon, styles.error)} />;
  }
  return <OkIcon className={classNames(className, styles.icon, styles.valid)} />;
}

export default VerseValidation;
