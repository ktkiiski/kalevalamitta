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

const PoemEditor: VFC<PoemEditorProps> = ({ content, onChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hyphenation = hyphenateText(content);
  const verses = hyphenation.map(parseVerse);

  return (
    <div className={styles.container}>
      <div className={styles.editor}>
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(event) => onChange(event.currentTarget.value)}
          className={styles.textarea}
          placeholder="Kirjoita tähän…"
        />
        <div className={styles.highlighting}>
          {verses.map((verse, row) => (
            <div
              className={classNames(styles.row, row % 2 ? styles.odd : styles.even, {
                [styles.short]: isTooShortVerse(verse),
                [styles.long]: isTooLongVerse(verse),
                [styles.error]: isInvalidVerse(verse),
              })}
              key={row}
            >
              <VerseValidation verse={verse} className={styles.rowMargin} />
              {!verse.tokens.length && ' '}
              {verse.trokees.map((trokee, trokeeIdx) => (
                <span key={trokeeIdx} className={classNames(styles.trokee, trokeeIdx % 2 ? styles.odd : styles.even)}>
                  {trokee.tokens.map((token, idx) =>
                    token.type === 'fill' ? (
                      token.text
                    ) : (
                      <span
                        key={idx}
                        className={classNames(
                          styles.syllableToken,
                          token.index % 2 ? styles.odd : styles.even,
                          token.errors.length > 0 && styles.errorToken,
                        )}
                      >
                        {token.text}
                      </span>
                    ),
                  )}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.rightMargin} />
    </div>
  );
};

export default PoemEditor;
