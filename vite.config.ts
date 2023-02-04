import fs from 'fs';
import { resolve, basename } from 'path';
import { defineConfig } from 'vite';

const getChapters = () => {
  const rootPath = resolve(__dirname, 'chapters');
  const chapters: Record<string, string> = {};

  fs.readdirSync( rootPath ).forEach( file => {
    const filename = basename( file );
    chapters[filename] = resolve( rootPath, file, 'index.html' );
  });

  return chapters;
}
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ...getChapters()
      },
    },
  },
})
