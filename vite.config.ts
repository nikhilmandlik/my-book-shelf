import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    // root: resolve(__dirname, 'src'),
    define: {
      'process.env.CLIENT_ID': JSON.stringify(env.CLIENT_ID),
      'process.env.MY_BOOK_SHELF_FILE_NAME': JSON.stringify(env.MY_BOOK_SHELF_FILE_NAME)
    },
    plugins: [react()],
    resolve: {
      alias: {
        '~bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
      }
    },
    server: {
      port: 8080,
      hot: true
    }
  }
})