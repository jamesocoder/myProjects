/* This file enables TypeScript's intellisense features, loading
Vite's objects (vite/client) as well as user-defined environment
variables (ImportMetaEnv) into memory
https://vite.dev/guide/env-and-mode.html#intellisense-for-typescript */

/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_HOST: string
    readonly VITE_PORT: number
    readonly VITE_BACKEND: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}