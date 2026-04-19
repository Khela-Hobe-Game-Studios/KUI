import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      exclude: ['**/*.test.*'],
    }),
  ],
  build: {
    lib: {
      entry: {
        index:      resolve(__dirname, 'src/index.ts'),
        cpdb:       resolve(__dirname, 'src/cpdb.ts'),
        fixedprice: resolve(__dirname, 'src/fixedprice.ts'),
      },
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react:           'React',
          'react-dom':     'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
        assetFileNames: 'style.css',
      },
    },
    cssCodeSplit: false,
  },
})
