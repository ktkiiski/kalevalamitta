import { useState } from 'react';
import './App.css';
import PoemEditor from './editor/PoemEditor';

function App() {
  const [poem, setPoem] = useState('');

  return (
    <div className="App">
      <header className="App-header">
        <h1>Kalevalamitta</h1>
        <PoemEditor content={poem} onChange={setPoem} />
      </header>
    </div>
  );
}

export default App;
