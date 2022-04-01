import classNames from 'classnames';
import getVerseErrors from '../verses/getVerseErrors';
import isTooLongVerse from '../verses/isTooLongVerse';
import isTooShortVerse from '../verses/isTooShortVerse';
import { SyllableError, TrokeeToken, Verse } from '../verses/parseVerse';
import styles from './VerseGuidance.module.css';

const possibleErrors: SyllableError[] = ['A', 'B', '2', '3', '4'];

function renderError(error: SyllableError) {
  switch (error) {
    case 'A':
      return 'Jos sanan ensitavu osuu runojalan (trokeen) alkuun eli nousuun, sen on oltava pitkä. Ensimmäisessä runojalassa tavujen pituudella ei kuitenkaan ole väliä.';
    case 'B':
      return 'Jos sanan ensitavu osuu runojalan (trokeen) loppuun eli laskuun, sen on oltava lyhyt.';
    case '2':
      return 'Yksitavuinen sana voi sijoittua säkeessä mihin tahansa, mutta ei sen loppuun.';
    case '3':
      return 'Nelitavuinen yhdistämätön sana ei saa olla tasasäkeen keskellä. Toisin sanoen nelitavuinen sana ei voi muodostaa toista ja kolmatta runojalkaa.';
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

interface VerseGuidanceProps {
  verse: Verse | null;
  token: TrokeeToken | null;
}

function VerseGuidance({ verse, token }: VerseGuidanceProps) {
  if (!verse) {
    return <div className={styles.container} />;
  }
  const isTooShort = isTooShortVerse(verse);
  const isTooLong = isTooLongVerse(verse);
  const errors = getVerseErrors(verse);
  const syllableErrors = token?.type === 'syllable' ? token.errors : [];
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
        {possibleErrors.map((error) =>
          !errors.includes(error) ? null : (
            <p key={error} className={classNames(styles.paragraph, syllableErrors.includes(error) && styles.strong)}>
              {renderError(error)}
            </p>
          ),
        )}
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
