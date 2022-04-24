import classNames from 'classnames';
import validationStyles from '../ui/Validation.module.css';
import getVerseErrors from '../verses/getVerseErrors';
import isTooLongVerse from '../verses/isTooLongVerse';
import isTooShortVerse from '../verses/isTooShortVerse';
import { SyllableError, TrokeeToken, Verse } from '../verses/parseVerses';
import styles from './VerseGuidance.module.css';

const possibleErrors: SyllableError[] = ['A', 'B', '2', '3', '4'];
const syllableHelpUrl = 'https://fl.finnlectura.fi/verkkosuomi/Fonologia/sivu183.htm#Lyhyet%20ja%20pitk%C3%A4t%20tavut';

function renderError(error: SyllableError) {
  switch (error) {
    case 'A':
      return (
        <>
          Jos sanan ensitavu osuu runojalan (trokeen) alkuun eli nousuun, sen on oltava{' '}
          <a href={syllableHelpUrl} target="_blank" rel="noreferrer">
            pitkä
          </a>
          . Ensimmäisessä runojalassa tavujen pituudella ei kuitenkaan ole väliä.
        </>
      );
    case 'B':
      return (
        <>
          Jos sanan ensitavu osuu runojalan (trokeen) loppuun eli laskuun, sen on oltava{' '}
          <a href={syllableHelpUrl} target="_blank" rel="noreferrer">
            lyhyt
          </a>
          .
        </>
      );
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
  if (!verse.syllableCount) {
    return (
      <div className={classNames(styles.container, validationStyles.short)}>
        Kirjoita säe, jossa on yhteensä 8 tavua tai toisinaan 9.
      </div>
    );
  }
  if (isTooShortVerse(verse)) {
    return (
      <div className={classNames(styles.container, validationStyles.short)}>
        Säkeessä tulee olla 8 tai toisinaan 9 tavua. Kirjoita vielä{' '}
        {pluralize(8 - verse.syllableCount, 'tavu', 'tavua')}.
      </div>
    );
  }
  if (isTooLongVerse(verse)) {
    return (
      <div className={classNames(styles.container, validationStyles.long)}>
        Säkeessä saisi olla enintään 9 tavua, mieluiten 8.{' '}
        <strong>Poista ainakin {pluralize(verse.syllableCount - 9, 'tavu', 'tavua')}.</strong>
      </div>
    );
  }
  const errors = getVerseErrors(verse);
  const syllableErrors = token?.type === 'syllable' ? token.errors : [];
  if (errors.length) {
    return (
      <div className={classNames(styles.container, validationStyles.error)}>
        {possibleErrors.map((error) =>
          !errors.includes(error) ? null : (
            <span key={error} className={classNames(styles.paragraph, syllableErrors.includes(error) && styles.strong)}>
              {renderError(error)}{' '}
            </span>
          ),
        )}
      </div>
    );
  }
  return (
    <div className={classNames(styles.container, validationStyles.valid)}>
      Säe näyttää hyvälle! Kirjoitathan yhdyssanat erikseen. Aloita uusi säe seuraavalta riviltä!
    </div>
  );
}

export default VerseGuidance;
