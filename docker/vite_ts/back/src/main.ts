import express, { Application } from 'express';
import cors from 'cors';
import { routes as rtSecrets } from './api/secrets.js';

export const server: Application = express();

// Use cors() with no arguments to allow all origins
server.use(cors({
    origin: import.meta.env.VITE_FRONTEND
}));

server.all('/', (req, res) => {res.sendStatus(400);});
server.use(rtSecrets);

if (import.meta.env.PROD) {
    console.log(`\nListening on ${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}\n`)
    server.listen(import.meta.env.VITE_PORT)
}