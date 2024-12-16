import { renderToString } from 'react-dom/server';
import rootElement from './rootElement';

export default function render() {
  return renderToString(rootElement);
}
