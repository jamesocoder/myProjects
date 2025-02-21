import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
/* Note that Vite can be configured to host using https
https://vite.dev/config/server-options.html#server-https */
/* Also note how we don't need to go through import.meta.env
in this config file.  When this file is in use, Node's
environment variables are presumably in context. */
const PORT = parseInt(process.env.VITE_PORT as string);
export default defineConfig({
  plugins: [react()],
  server: {
    host: process.env.VITE_HOST,
    port: PORT,
    strictPort: true,
    open: true
  },
  preview: {
    port: PORT
  }
})