import { SyntheticEvent, useRef } from 'react';
import './App.css';

const preservedNodeNames = ['DIV', 'BR'];

function sanitize(element: ChildNode) {
  const parent = element.parentNode;
  let child = element.firstChild;
  while (child) {
    const nextChild = child.nextSibling;
    if (parent && element.nodeName !== 'DIV') {
      parent.insertBefore(child, element);
    }
    sanitize(child);
    if (child.nodeType === Node.ELEMENT_NODE && !preservedNodeNames.includes(child.nodeName)) {
      element.removeChild(child);
    }
    child = nextChild;
  }
}

function App() {
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const onContentEditableChange = (event: SyntheticEvent<HTMLDivElement>) => {
    sanitize(event.currentTarget);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Kalevalamitta</h1>
        <div
          style={{ backgroundColor: 'black', minHeight: 100, minWidth: 100 }}
          contentEditable
          ref={contentEditableRef}
          onInput={onContentEditableChange}
          onBlur={onContentEditableChange}
          onKeyUp={onContentEditableChange}
          onKeyDown={onContentEditableChange}
        />
      </header>
    </div>
  );
}

export default App;
