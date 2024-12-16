import React, { ReactNode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import 'normalize.css/normalize.css';
import './index.css';

function renderApp(element: ReactNode, rootElement: HTMLElement) {
  const root = rootElement.hasChildNodes() ? hydrateRoot(rootElement, element) : createRoot(rootElement);
  root.render(element);
}

renderApp(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')!,
);
