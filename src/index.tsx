import React from 'react';
import { hydrate, render } from 'react-dom';
import App from './App';
import 'normalize.css/normalize.css';
import './index.css';

function renderApp(element: JSX.Element, rootElement: HTMLElement) {
  if (rootElement.hasChildNodes()) {
    hydrate(element, rootElement);
  } else {
    render(element, rootElement);
  }
}

renderApp(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')!,
);
