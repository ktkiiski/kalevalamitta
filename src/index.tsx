import { ReactNode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import 'normalize.css/normalize.css';
import './index.css';
import rootElement from './rootElement';

function renderApp(element: ReactNode, containerElement: HTMLElement) {
  const root = containerElement.children.length ? hydrateRoot(containerElement, element) : createRoot(containerElement);
  root.render(element);
}

renderApp(rootElement, document.getElementById('root')!);
