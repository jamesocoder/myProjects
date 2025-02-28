import express, { Application } from 'express';
import cors from 'cors';
import { routes as rtSecrets } from './api/secrets.js';

export const server: Application = express();

server.use(cors({
    origin: import.meta.env.VITE_FRONTEND
}));

server.all('/', (req, res) => {res.sendStatus(400);});
server.use(rtSecrets);

if (import.meta.env.PROD)
    server.listen(import.meta.env.VITE_PORT)