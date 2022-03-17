import classNames from 'classnames';
import { useRef, VFC } from 'react';
import hyphenateText from '../finnish/hyphenateText';
import isInvalidVerse from '../verses/isInvalidVerse';
import isTooLongVerse from '../verses/isTooLongVerse';
import isTooShortVerse from '../verses/isTooShortVerse';
import parseVerse from '../verses/parseVerse';
import styles from './PoemEditor.module.css';
import VerseValidation from './VerseValidation';

interface PoemEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const baseLetterSpacing = 0.4;

const PoemEditor: VFC<PoemEditorProps> = ({ content, onChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hyphenation = hyphenateText(content);
  const verses = hyphenation.map(parseVerse);

  return (
    <div className={styles.container}>
      <div className={styles.editor} style={{ letterSpacing: `${baseLetterSpacing}rem` }}>
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(event) => onChange(event.currentTarget.value)}
          className={styles.textarea}
          placeholder="Kirjoita tähän…"
          spellCheck={false}
        />
        <div className={styles.highlighting}>
          {verses.map((verse, row) => {
            const isTooShort = isTooShortVerse(verse);
            const isTooLong = isTooLongVerse(verse);
            const isInvalid = isInvalidVerse(verse);
            return (
              <div
                className={classNames(styles.row, row % 2 ? styles.odd : styles.even, {
                  [styles.short]: isTooShort,
                  [styles.error]: !isTooShort && !isTooLong && isInvalid,
                })}
                key={row}
              >
                <VerseValidation verse={verse} className={styles.rowMargin} />
                {!verse.tokens.length && ' '}
                {verse.trokees.map((trokee, trokeeIdx) => (
                  <span key={trokeeIdx} className={classNames(styles.trokee, trokeeIdx % 2 ? styles.odd : styles.even)}>
                    {trokee.tokens.map((token, idx) => {
                      const letterSpacing = (1 - 1 / Math.max(1, token.text.length - 1)) * baseLetterSpacing;
                      if (token.type !== 'syllable') {
                        return token.text;
                      }
                      return (
                        <span
                          key={idx}
                          className={classNames(styles.syllable, token.index % 2 ? styles.odd : styles.even, {
                            [styles.errorToken]: token.errors.length > 0 && styles.errorToken,
                            [styles.hyphened]: !token.endsWord,
                          })}
                        >
                          <span className={styles.invisible}>{token.text}</span>
                          <span className={styles.syllableText} style={{ letterSpacing: `${letterSpacing}rem` }}>
                            {token.text}
                          </span>
                        </span>
                      );
                    })}
                  </span>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PoemEditor;
