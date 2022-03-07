import { VFC } from 'react';
import styles from './PoemEditor.module.css';

interface PoemEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const PoemEditor: VFC<PoemEditorProps> = ({ content, onChange }) => {
  return (
    <div className={styles.container}>
      <textarea
        value={content}
        onChange={(event) => onChange(event.currentTarget.value)}
        className={styles.textarea}
        placeholder="Kirjoita tähän…"
      />
      <div className={styles.highlighting}>{content}</div>
    </div>
  );
};

export default PoemEditor;
