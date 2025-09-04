import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitestMarkdownReporter } from "vitest-markdown-reporter";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    include: ['tests/**/*.test.ts', 'tests/**/*.spec.ts'],
    environment: 'jsdom',
    reporters: ["default","junit", new VitestMarkdownReporter()],
    outputFile: {
       markdown: "test-coverage.md", // Specify the output file name
       junit:'vitest-junit.xml'
    },
    globals: true,
    setupFiles:['tests/vitest.setup.ts'],
    coverage: {
      reporter: ['text', 'lcov'],
    },
  },
})
