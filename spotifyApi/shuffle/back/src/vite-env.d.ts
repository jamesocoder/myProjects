/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_CLIENT_ID: string // Spotify Developer's App ID
    readonly VITE_HOST: string
    readonly VITE_PORT: number
    readonly VITE_FRONTEND: string // Address of the frontend
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}