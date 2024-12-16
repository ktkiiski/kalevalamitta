import fs from 'node:fs/promises';
import path from 'node:path';

const distPath = path.resolve(import.meta.dirname, '../dist');
const prerendererPath = path.join(distPath, 'prerenderer/prerenderer.mjs');
const indexHtmlPath = path.join(distPath, 'client/index.html');

async function prerenderIndex() {
  const render = (await import(prerendererPath)).default;
  const prerenderedElement = render();
  const indexHtml = await fs.readFile(indexHtmlPath, 'utf-8');
  const resultHtml = indexHtml.replace(`<!-- pre-rendering placeholder -->`, () => prerenderedElement);
  await fs.writeFile(indexHtmlPath, resultHtml);
}

prerenderIndex();
