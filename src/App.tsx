import { useEffect, useRef } from 'react';
import styles from './App.module.css';
import PoemEditor from './editor/PoemEditor';
import buttonStyles from './ui/Button.module.css';
import Layout from './ui/Layout';
import { Focusable } from './utils/useImperativeFocusHandle';
import useLocalState from './utils/useLocalState';

const examplePoem = `Mieleni minun tekevi,
Aivoni ajattelevi
Lähteäni laulamahan
Saa'ani sanelemahan.`;

function App() {
  const [poem, setPoem] = useLocalState<string>('poem', '');
  const editorRef = useRef<Focusable>(null);

  useEffect(() => {
    // Auto-focus the editor
    editorRef.current!.focus();
  }, []);

  const onResetPoem = () => {
    setPoem('');
    editorRef.current!.focus();
  };

  const onSetExamplePoem = () => {
    setPoem(examplePoem);
    editorRef.current!.focus();
  };

  return (
    <Layout
      footer={
        <a href="https://github.com/ktkiiski/kalevalamitta" target="_blank" rel="noreferrer">
          © 2022 Kimmo Kiiski
        </a>
      }
    >
      <h1 className={styles.heading}>Kalevalamitta</h1>
      <p className={styles.intro}>
        Runos alle kirjottele, säkeitäsi raapustele. Muokkain tekstin tarkistavi, tavutukset näyttelevi, säännöissä
        opastelevi, vioista osoittelevi.
      </p>
      <div className={styles.buttons}>
        <a
          href="http://www.karuse.info/index.php?option=com_content&view=article&id=8&Itemid=19"
          target="_blank"
          rel="noreferrer"
          className={buttonStyles.button}
        >
          Säännöt kertovi
        </a>
        <button type="button" className={buttonStyles.button} onClick={onResetPoem}>
          Alusta aloittavi
        </button>
        <button type="button" className={buttonStyles.button} onClick={onSetExamplePoem}>
          Mallia kaipavi
        </button>
      </div>
      <PoemEditor content={poem} onChange={setPoem} ref={editorRef} />
    </Layout>
  );
}

export default App;
