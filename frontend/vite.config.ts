import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/pages': path.resolve(__dirname, 'src/pages'),
      '@/assets': path.resolve(__dirname, 'src/assets'),
      '@/lib': path.resolve(__dirname, 'src/lib'),
      '@/models': path.resolve(__dirname, 'src/models'),
      '@/router': path.resolve(__dirname, 'src/router'),
      '@/hooks': path.resolve(__dirname, 'src/hooks'),
      '@/api': path.resolve(__dirname, 'src/api'),
    },
  },
});
