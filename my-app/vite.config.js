import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  preview: {
    host: '127.0.0.1',
    port: 3002,
  },
  server: {
    host: "127.0.0.1",
    port: 3001,
  },
  build: {
    target: 'esnext',
  },
});
