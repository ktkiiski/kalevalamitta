/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import { useRef } from 'react';
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

const baseLetterSpacing = 0.3;

function PoemEditor({ content, onChange }: PoemEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hyphenation = hyphenateText(content);
  const verses = hyphenation.map(parseVerse);

  return (
    <div className={styles.container}>
      <div className={styles.editor} style={{ letterSpacing: `${baseLetterSpacing}rem` }}>
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
                {!verse.tokens.length && ' '}
                {verse.trokees.map((trokee, trokeeIdx) => (
                  <span
                    key={trokeeIdx}
                    className={classNames(styles.trokee, trokeeIdx % 2 ? styles.odd : styles.even)}
                    aria-hidden
                  >
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
                <VerseValidation verse={verse} className={styles.rowMargin} />
              </div>
            );
          })}
        </div>
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(event) => onChange(event.currentTarget.value)}
          className={styles.textarea}
          placeholder="Kirjoita tähän…"
          spellCheck={false}
        />
      </div>
    </div>
  );
}

export default PoemEditor;
