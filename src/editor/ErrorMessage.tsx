import { SyllableError } from '../verses/parseVerse';

interface ErrorMessageProps {
  error: SyllableError;
}

function ErrorMessage({ error }: ErrorMessageProps): JSX.Element | null {
  switch (error) {
    case 'A':
      return (
        <span>
          Jos sanan ensitavu osuu runojalan (trokeen) nousuun eli alkuun, sen on oltava pitkä. Ensimmäisessä runojalassa
          tavujen pituudella ei kuitenkaan ole väliä.
        </span>
      );
    case 'B':
      return <span>Jos sanan ensitavu osuu runojalan laskuun (loppuun), sen on oltava lyhyt.</span>;
    case '2':
      return <span>Yksitavuinen sana voi sijoittua säkeessä mihin tahansa, mutta ei sen loppuun.</span>;
    case '3':
      return <span>Nelitavuinen yhdistämätön sana ei saa olla tasasäkeen keskellä.</span>;
    case '4':
      return <span>Säkeen viimeisessä tavussa ei saa olla pitkää vokaalia.</span>;
    default:
      return null;
  }
}

export default ErrorMessage;
