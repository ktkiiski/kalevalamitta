/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import { useCallback, useState } from 'react';
import hyphenateText from '../finnish/hyphenateText';
import isInvalidVerse from '../verses/isInvalidVerse';
import isTooLongVerse from '../verses/isTooLongVerse';
import isTooShortVerse from '../verses/isTooShortVerse';
import parseVerses, { TrokeeSyllable, TrokeeToken, Verse } from '../verses/parseVerses';
import styles from './PoemEditor.module.css';
import Textarea, { Selection } from './Textarea';
import VerseGuidance from './VerseGuidance';
import VerseRowValidation from './VerseRowValidation';

interface PoemEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const baseLetterSpacing = 0.2;

function isErrorToken(token: TrokeeToken): token is TrokeeSyllable {
  return token.type === 'syllable' && token.errors.length > 0;
}

function getTokenEndOffset(token: TrokeeToken): number {
  return token.offset + token.text.length;
}

function getCurrentVerse(caretOffset: number | null, verses: Verse[]): Verse | null {
  if (caretOffset == null) return null;
  return verses.find((verse) => verse.startOffset <= caretOffset && caretOffset <= verse.endOffset) ?? null;
}

function getCurrentToken(caretOffset: number | null, verses: Verse[]): TrokeeToken | null {
  if (caretOffset == null) {
    return null;
  }
  for (const verse of verses) {
    const { tokens } = verse;
    const errorToken = tokens.find(
      (token) => isErrorToken(token) && token.offset <= caretOffset && caretOffset <= getTokenEndOffset(token),
    );
    const currentToken = errorToken || tokens.find((token) => caretOffset <= getTokenEndOffset(token));
    if (currentToken) {
      return currentToken;
    }
  }
  return null;
}

function PoemEditor({ content, onChange }: PoemEditorProps) {
  const [caretOffset, setCaretOffset] = useState<number | null>(null);
  const hyphenation = hyphenateText(content);
  const verses = parseVerses(hyphenation);
  const onTextareaChange = useCallback(
    (value: string, selection: Selection | null) => {
      onChange(value);
      setCaretOffset(selection?.end ?? null);
    },
    [onChange],
  );
  const currentVerse = getCurrentVerse(caretOffset, verses);
  const currentToken = getCurrentToken(caretOffset, verses);

  const editor = (
    <div className={styles.scrollView}>
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
                <VerseRowValidation verse={verse} className={styles.rowValidation} />
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
    </div>
  );
  return (
    <div>
      {editor}
      <VerseGuidance verse={currentVerse} token={currentToken} />
    </div>
  );
}

export default PoemEditor;
