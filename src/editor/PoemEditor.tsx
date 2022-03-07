import { Fragment, useRef, VFC } from 'react';
import hyphenateText from '../hyphenation/hyphenateText';
import styles from './PoemEditor.module.css';

interface PoemEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const PoemEditor: VFC<PoemEditorProps> = ({ content, onChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hyphenation = hyphenateText(content);

  return (
    <div className={styles.container}>
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(event) => onChange(event.currentTarget.value)}
        className={styles.textarea}
        placeholder="Kirjoita tähän…"
      />
      <div className={styles.highlighting}>
        {hyphenation.map((tokens, row) => (
          <Fragment key={row}>
            {row > 0 && '\n'}
            {tokens.map((token, idx) =>
              token.type === 'fill' ? (
                token.text
              ) : (
                <span key={idx} className={`${styles.syllableToken} ${token.index % 2 ? styles.odd : styles.even}`}>
                  {token.text}
                </span>
              ),
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default PoemEditor;
