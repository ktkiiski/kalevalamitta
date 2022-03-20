import { useState } from 'react';
import styles from './App.module.css';
import PoemEditor from './editor/PoemEditor';
import Layout from './layout/Layout';

const initialPoem = `Mieleni minun tekevi,
Aivoni ajattelevi
Lähteäni laulamahan
Saa'ani sanelemahan.`;

function App() {
  const [poem, setPoem] = useState(initialPoem);

  return (
    <Layout>
      <h1 className={styles.heading}>Kalevalamitta</h1>
      <PoemEditor content={poem} onChange={setPoem} />
    </Layout>
  );
}

export default App;
