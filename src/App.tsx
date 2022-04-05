import styles from './App.module.css';
import PoemEditor from './editor/PoemEditor';
import Layout from './layout/Layout';
import useLocalState from './utils/useLocalState';

const initialPoem = `Mieleni minun tekevi,
Aivoni ajattelevi
Lähteäni laulamahan
Saa'ani sanelemahan.`;

function App() {
  const [poem, setPoem] = useLocalState<string>('poem', initialPoem);

  return (
    <Layout>
      <h1 className={styles.heading}>Kalevalamitta</h1>
      <p className={styles.intro}>
        Runos alle kirjottele, säkeitäsi raapustele. Muokkain tekstin tarkistavi, tavutukset näyttelevi, säännöissä
        opastelevi, vioista osoittelevi.
      </p>
      <PoemEditor content={poem} onChange={setPoem} />
    </Layout>
  );
}

export default App;
