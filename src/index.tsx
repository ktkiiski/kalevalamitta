import React from 'react';
import { hydrate, render } from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
