import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' deixa o deploy funcionar em subpastas (GitHub Pages / Vercel)
export default defineConfig({
  plugins: [react()],
  base: './',
})
