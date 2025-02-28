/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_HOST: string
    readonly VITE_PORT: number
    readonly VITE_FRONTEND: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}