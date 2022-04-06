import classNames from 'classnames';
import validationStyles from '../ui/Validation.module.css';
import isInvalidVerse from '../verses/isInvalidVerse';
import isTooLongVerse from '../verses/isTooLongVerse';
import isTooShortVerse from '../verses/isTooShortVerse';
import { Verse } from '../verses/parseVerses';
import styles from './VerseRowValidation.module.css';
import { ReactComponent as OkIcon } from './images/ok.svg';
import { ReactComponent as WarningIcon } from './images/warning.svg';

interface VerseValidationProps {
  className?: string;
  verse: Verse;
}

function VerseRowValidation({ className, verse }: VerseValidationProps) {
  const { syllableCount } = verse;
  if (!syllableCount) {
    return null;
  }
  const isTooShort = isTooShortVerse(verse);
  const isTooLong = isTooLongVerse(verse);
  const isInvalid = isInvalidVerse(verse);
  if (isTooShort) {
    return (
      <span className={classNames(className, styles.container, validationStyles.short)}>{`${syllableCount}/8`}</span>
    );
  }
  if (isTooLong || isInvalid) {
    return (
      <span
        className={classNames(className, styles.container, isTooLong ? validationStyles.long : validationStyles.error)}
      >
        <WarningIcon className={styles.icon} />
        {isTooLong && syllableCount}
      </span>
    );
  }
  return (
    <span className={classNames(className, styles.container, validationStyles.valid)}>
      <OkIcon className={styles.icon} />
    </span>
  );
}

export default VerseRowValidation;
