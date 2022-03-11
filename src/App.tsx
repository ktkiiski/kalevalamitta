import { useState } from 'react';
import './App.css';
import PoemEditor from './editor/PoemEditor';
import Layout from './layout/Layout';

const initialPoem = `Mieleni minun tekevi,
Aivoni ajattelevi
Lähteäni laulamahan
Saa'ani sanelemahan.`;

function App() {
  const [poem, setPoem] = useState(initialPoem);

  return (
    <div className="App">
      <Layout>
        <h1>Kalevalamitta</h1>
        <PoemEditor content={poem} onChange={setPoem} />
      </Layout>
    </div>
  );
}

export default App;
