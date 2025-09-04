import { defineConfig } from 'vite';
import { resolve } from 'path';
export default defineConfig({
  build: {
    // Use Rollup output settings to force a single IIFE bundle and attach to the global `broadcast` name
    rollupOptions: {
      input: resolve(__dirname, 'app', 'main.ts'),
      output: {
        format: 'iife',
        name: 'broadcast',
        // single output file
        entryFileNames: 'broadcast.js',
        assetFileNames: 'assets/[name].[ext]',
        // inline dynamic imports to avoid code-splitting
        inlineDynamicImports: true
      }
    },
    emptyOutDir: true,
    outDir: 'dist',
    sourcemap: true,
    target: 'es2020'
  },
   resolve: {
    alias: {
      '@app': resolve(__dirname, './app'),
    },
  },
});
