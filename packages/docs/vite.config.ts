import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@khelahobe/kui/cpdb':       resolve(__dirname, '../lib/src/cpdb.ts'),
      '@khelahobe/kui/fixedprice': resolve(__dirname, '../lib/src/fixedprice.ts'),
      '@khelahobe/kui':            resolve(__dirname, '../lib/src/index.ts'),
    },
  },
})
