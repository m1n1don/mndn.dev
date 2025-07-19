import {
  coverageConfigDefaults,
  defaultExclude,
  defineConfig,
} from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: [...defaultExclude],
    coverage: {
      provider: 'v8',
      include: ['src/**/*'],
      exclude: [...coverageConfigDefaults.exclude, '**/types/**'],
      all: true,
    },
    setupFiles: './vitest.setup.ts',
  },
});
