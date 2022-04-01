import classNames from 'classnames';
import getVerseErrors from '../verses/getVerseErrors';
import isTooLongVerse from '../verses/isTooLongVerse';
import isTooShortVerse from '../verses/isTooShortVerse';
import { SyllableError, Verse } from '../verses/parseVerse';
import styles from './VerseGuidance.module.css';

interface VerseGuidanceProps {
  verse: Verse;
}

function getVisibleErrors(verse: Verse) {
  return getVerseErrors(verse).filter((error, index, errors) => errors.indexOf(error) === index);
}

function renderError(error: SyllableError) {
  switch (error) {
    case 'A':
      return 'Jos sanan ensitavu osuu runojalan (trokeen) nousuun eli alkuun, sen on oltava pitkä. Ensimmäisessä runojalassa tavujen pituudella ei kuitenkaan ole väliä.';
    case 'B':
      return 'Jos sanan ensitavu osuu runojalan laskuun (loppuun), sen on oltava lyhyt.';
    case '2':
      return 'Yksitavuinen sana voi sijoittua säkeessä mihin tahansa, mutta ei sen loppuun.';
    case '3':
      return 'Nelitavuinen yhdistämätön sana ei saa olla tasasäkeen keskellä.';
    case '4':
      return 'Säkeen viimeisessä tavussa ei saa olla pitkää vokaalia.';
    default:
      return null;
  }
}

function pluralize(count: number, singular: string, plural: string): string {
  if (count === 1) {
    return `${count} ${singular}`;
  }
  return `${count} ${plural}`;
}

function VerseGuidance({ verse }: VerseGuidanceProps) {
  const isTooShort = isTooShortVerse(verse);
  const isTooLong = isTooLongVerse(verse);
  const errors = getVisibleErrors(verse);
  if (isTooShort) {
    return (
      <div className={classNames(styles.container, styles.short)}>
        Säkeessä tulee olla 8 tai joskus 9 tavua. Kirjoita vielä {pluralize(8 - verse.syllableCount, 'tavu', 'tavua')}.
      </div>
    );
  }
  if (isTooLong) {
    return (
      <div className={classNames(styles.container, styles.long)}>
        Säkeessä saisi olla enintään 9 tavua, mieluiten 8. Poista ainakin{' '}
        {pluralize(verse.syllableCount - 9, 'tavu', 'tavua')}.
      </div>
    );
  }
  if (errors.length) {
    return (
      <div className={classNames(styles.container, styles.error)}>
        {errors.map((error) => (
          <p className={styles.paragraph}>{renderError(error)}</p>
        ))}
      </div>
    );
  }
  return (
    <div className={classNames(styles.container, styles.valid)}>
      <strong>Säe näyttää hyvälle!</strong> Kirjoitathan yhdyssanat erikseen, sillä niihin sovelletaan sääntöjä kuin ne
      olisivat erilliset sanat.
    </div>
  );
}

export default VerseGuidance;
