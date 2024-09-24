import { fileURLToPath } from 'node:url'
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      coverage: {
        provider: 'v8', // istanbul, v8
        reporter: ['text', 'html'],
        reportsDirectory: './test/unit/coverage',
      },
      ui: true,
      // enable jest-like global test APIs
      globals: true,
      // simulate DOM with happy-dom
      // (requires installing happy-dom as a peer dependency)
      //environment: 'happy-dom',
      environment: 'jsdom',
      exclude: [
        ...configDefaults.exclude,
        'e2e/**',
        '**/{lint-staged, volar}.config.*',
      ],
      root: fileURLToPath(new URL('./', import.meta.url)),
      setupFiles: ['./test/vitest.setup.js'],
    },
  })
)
