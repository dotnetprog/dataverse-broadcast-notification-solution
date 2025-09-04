import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
  include: ['tests/**/*.test.ts', 'tests/**/*.spec.ts'],
    environment: 'jsdom',
    globals: true,
    setupFiles:['tests/vitest.setup.ts'],
    coverage: {
      reporter: ['text', 'lcov'],
    },
  },
})
