import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  testMatch: ['**/*.test.tsx'],  
  timeout: 30000,
});
