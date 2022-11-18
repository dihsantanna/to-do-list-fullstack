import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    watch: false,
    reporters: 'verbose',
    alias: {
      '@api': fileURLToPath(new URL('./src/api', import.meta.url)),
      '@app': fileURLToPath(new URL('./src/app', import.meta.url)),
      '@db': fileURLToPath(new URL('./src/db', import.meta.url)),
      '@src': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
});
