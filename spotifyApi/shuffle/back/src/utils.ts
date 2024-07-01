export const serverAddr = (() => {
    return `${import.meta.env.DEV ? 'http' : 'https'}://` +
        `${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}`;
})();