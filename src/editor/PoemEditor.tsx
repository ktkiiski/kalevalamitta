/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import { useCallback, useState } from 'react';
import hyphenateText from '../finnish/hyphenateText';
import getVerseErrors from '../verses/getVerseErrors';
import isInvalidVerse from '../verses/isInvalidVerse';
import isTooLongVerse from '../verses/isTooLongVerse';
import isTooShortVerse from '../verses/isTooShortVerse';
import parseVerse, { Verse } from '../verses/parseVerse';
import ErrorMessage from './ErrorMessage';
import styles from './PoemEditor.module.css';
import Textarea, { Selection } from './Textarea';
import VerseValidation from './VerseValidation';

interface PoemEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const baseLetterSpacing = 0.3;

function getFocus(caretOffset: number | null, verses: Verse[]): Verse | null {
  if (caretOffset == null) {
    return null;
  }
  for (const verse of verses) {
    for (const token of verse.tokens) {
      if (caretOffset <= token.offset + token.text.length) {
        return verse;
      }
    }
  }
  return null;
}

function getVisibleErrors(verse: Verse | null) {
  if (!verse) {
    return [];
  }
  return getVerseErrors(verse).filter((error, index, errors) => errors.indexOf(error) === index);
}

function PoemEditor({ content, onChange }: PoemEditorProps) {
  const [caretOffset, setCaretOffset] = useState<number | null>(null);
  const hyphenation = hyphenateText(content);
  const verses = hyphenation.map(parseVerse);
  const onTextareaChange = useCallback(
    (value: string, selection: Selection | null) => {
      onChange(value);
      setCaretOffset(selection?.end ?? null);
    },
    [onChange],
  );
  const currentVerse = getFocus(caretOffset, verses);
  const errors = getVisibleErrors(currentVerse);

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
                  [styles.error]: !isTooShort && (isTooLong || isInvalid),
                })}
                key={row}
              >
                {!verse.tokens.length && ' '}
                {verse.trokees.map((trokee, trokeeIdx) => (
                  <span
                    key={trokeeIdx}
                    className={classNames(styles.trokee, !isTooShort && trokeeIdx % 2 ? styles.odd : styles.even)}
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
                          className={classNames(styles.syllable, {
                            [styles.errorToken]: !isTooShort && token.errors.length > 0 && styles.errorToken,
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
                <VerseValidation verse={verse} className={styles.rowValidation} />
              </div>
            );
          })}
        </div>
        <Textarea
          value={content}
          onChange={onTextareaChange}
          className={styles.textarea}
          placeholder="Kirjoita tähän…"
        />
      </div>
      <div className={styles.errorMessages}>
        {errors.map((error) => (
          <p className={styles.errorMessage}>
            <ErrorMessage error={error} />
          </p>
        ))}
      </div>
    </div>
  );
}

export default PoemEditor;
