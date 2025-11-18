import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [],
  base: "/web-components-test/dist",
  
  server: {
    port: 5174,
    strictPort: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Add global SCSS variables, mixins, etc. here if needed
        // additionalData: `@import "src/styles/variables.scss";`
      }
    }
  }
})
