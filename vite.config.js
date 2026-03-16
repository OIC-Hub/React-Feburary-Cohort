import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000, // Try a different common port like 3000 or 8080
    strictPort: true, // Optional: forces Vite to fail if this port isn't available
  }
})
