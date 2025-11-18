import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/react-test/dist",
  css: {
    preprocessorOptions: {
      scss: {
        // Add global SCSS variables, mixins, etc. here if needed
        // additionalData: `@import "src/styles/variables.scss";`
      }
    }
  }
})
