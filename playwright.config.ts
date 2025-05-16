import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [['list'], ['html'], ['json', { outputFile: 'test-log.json' }]],
  use: {
    video: 'on',
    trace: 'on',
  },
});