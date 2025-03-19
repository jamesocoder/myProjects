import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';

export default defineConfig({
    plugins: [...VitePluginNode({
        adapter: 'express',
        appPath: './src/main.ts',
        exportName: 'server'
    })],
    server: {
        host: process.env.VITE_HOST,
        port: parseInt(process.env.VITE_PORT as string),
        strictPort: true
    }
})