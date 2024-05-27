const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['./app/entry.client.jsx', './app/entry.server.jsx'],
  bundle: true,
  platform: 'node', // Especificar que la plataforma es Node.js
  external: ['http', 'https', 'zlib', 'stream', 'events', 'url', 'assert'], // Excluir módulos de Node.js
  outdir: 'dist',
}).catch(() => process.exit(1));
