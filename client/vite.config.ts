import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig(({ mode }) => ({
  base: './',
  resolve: {
    alias: { '@party/shared': fileURLToPath(new URL('../shared/src/index.ts', import.meta.url)) },
  },
  server: { port: 5173 },
  build: {
    outDir: mode === 'demo' ? 'dist-demo' : 'dist',
    chunkSizeWarningLimit: 900,
  },
}));
