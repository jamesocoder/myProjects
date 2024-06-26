/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_HOST: string
    readonly VITE_PORT: number
    readonly VITE_BACKEND: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}