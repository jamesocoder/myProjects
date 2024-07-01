import { defineConfig, loadEnv } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';

export default ({mode}: {mode: string}) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};

    return defineConfig({
        plugins:[...VitePluginNode({
            adapter: 'express',
            appPath: './src/server.ts',
            exportName: 'viteNodeApp'
        })],
        server: {
            host: process.env.VITE_HOST,
            port: parseInt(process.env.VITE_PORT as string)
        },
        build: {
            outDir: './build'
        }
    })
}