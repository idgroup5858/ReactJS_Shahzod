import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5180,
  },
  // Nisbiy baza: HashRouter bilan sayt ham github.io/ReactJS_Shahzod/ da,
  // ham keyin ulanadigan custom domenda (ildizda) o'zgartirishsiz ishlaydi.
  base: './',
})
