import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'

export default defineConfig({
  plugins: [pluginReact()],
  output: {
    assetPrefix: '/mini-apps-react/',
  },
  server: {
    port: 9711,
    base: '/mini-apps-react/',
  },
  html: {
    favicon: './src/favicon.ico',
  },
})
