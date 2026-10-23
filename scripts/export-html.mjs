import { build } from 'esbuild';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const destination = path.resolve(process.argv[2] || path.join(root, 'exports/illustrator-portfolio.html'));
const result = await build({
  absWorkingDir: root,
  entryPoints: ['src/main.jsx'],
  bundle: true,
  write: false,
  outfile: '/tmp/portfolio-html-export/app.js',
  format: 'iife',
  platform: 'browser',
  target: ['es2020'],
  minify: true,
  legalComments: 'none',
  define: {
    'process.env.NODE_ENV': '"production"',
    'import.meta.env.BASE_URL': '"/"',
    'import.meta.env.VITE_ROUTER_MODE': '"hash"',
  },
  loader: { '.woff': 'dataurl', '.woff2': 'dataurl' },
  plugins: [{
    name: 'self-contained-preview',
    setup(builder) {
      builder.onLoad({ filter: /\/src\/(main\.jsx|data\.js)$/ }, async ({ path: sourcePath }) => {
        let contents = (await readFile(sourcePath, 'utf8')).replace(/^\s*\/\/.*$/gm, '');
        if (sourcePath.endsWith('data.js')) {
          const files = [...contents.matchAll(/'\/art\/([^']+\.png)'/g)];
          for (const match of files) {
            const bytes = await readFile(path.join(root, 'public/art', match[1]));
            contents = contents.replace(match[0], JSON.stringify(`data:image/png;base64,${bytes.toString('base64')}`));
          }
        }
        return { contents, loader: sourcePath.endsWith('.jsx') ? 'jsx' : 'js', resolveDir: path.dirname(sourcePath) };
      });
    },
  }],
});

const js = result.outputFiles.find(file => file.path.endsWith('.js')).text.replace(/<\/script/gi, '<\\/script');
const css = result.outputFiles.find(file => file.path.endsWith('.css')).text;
const icon = (await readFile(path.join(root, 'public/favicon.svg'))).toString('base64');
const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#f8f6f0">
  <meta name="description" content="An independent illustrator’s colourful portfolio. Self-contained, offline preview.">
  <link rel="icon" href="data:image/svg+xml;base64,${icon}">
  <title>Alma Ríos — Illustration & little wonders</title>
  <style>${css}</style>
</head>
<body>
  <div id="root"></div>
  <noscript>This portfolio needs JavaScript enabled to display its artwork and navigation.</noscript>
  <script>${js}</script>
</body>
</html>`;
await mkdir(path.dirname(destination), { recursive: true });
await writeFile(destination, html);
console.log(`Exported ${destination} (${(Buffer.byteLength(html) / 1024 / 1024).toFixed(1)} MB). All artwork, fonts, styles and scripts are embedded.`);
