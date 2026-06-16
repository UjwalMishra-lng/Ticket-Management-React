import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/v2': {
        target: 'https://lgconsultancyhelp.zendesk.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
