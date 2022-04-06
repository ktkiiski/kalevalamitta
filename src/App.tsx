import styles from './App.module.css';
import PoemEditor from './editor/PoemEditor';
import buttonStyles from './ui/Button.module.css';
import Layout from './ui/Layout';
import useLocalState from './utils/useLocalState';

const examplePoem = `Mieleni minun tekevi,
Aivoni ajattelevi
Lähteäni laulamahan
Saa'ani sanelemahan.`;

function App() {
  const [poem, setPoem] = useLocalState<string>('poem', '');

  return (
    <Layout>
      <h1 className={styles.heading}>Kalevalamitta</h1>
      <p className={styles.intro}>
        Runos alle kirjottele, säkeitäsi raapustele. Muokkain tekstin tarkistavi, tavutukset näyttelevi, säännöissä
        opastelevi, vioista osoittelevi.
      </p>
      <div className={styles.buttons}>
        <a
          href="http://www.karuse.info/index.php?option=com_content&view=article&id=8&Itemid=19"
          target="_blank"
          rel="nofollow noreferrer"
          className={buttonStyles.button}
        >
          Säännöt kertovi
        </a>
        <button type="button" className={buttonStyles.button} onClick={() => setPoem('')}>
          Alusta aloittavi
        </button>
        <button type="button" className={buttonStyles.button} onClick={() => setPoem(examplePoem)}>
          Mallia kaipavi
        </button>
      </div>
      <PoemEditor content={poem} onChange={setPoem} />
    </Layout>
  );
}

export default App;
