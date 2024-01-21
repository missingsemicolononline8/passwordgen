import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist', // Specify your output directory
  },
  css: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
});