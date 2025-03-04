import express, { Application } from 'express';
import cors from 'cors';
import { routes as rtSecrets } from './api/secrets.js';
import accessPolicy from './accessPolicy.js';

export const server: Application = express();

/* Configure Express app built-in settings
https://expressjs.com/en/api.html#app.settings.table */
server.enable('case sensitive routing');

// Use cors() with no arguments to allow all origins
server.use(cors({
    origin: import.meta.env.VITE_FRONTEND
}));

/* Prevent direct connections to the server using custom middleware.
It's important to put custom middleware after .use(cors()) is called since cors-related
headers don't seem to persist when each middleware function passes the request onto the
next one with next() */
if (import.meta.env.PROD) {server.use(accessPolicy)}

server.all('/', (req, res) => {res.sendStatus(400);});
server.use(rtSecrets);

if (import.meta.env.PROD) {
    console.log(`\nListening on ${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}\n`)
    server.listen(import.meta.env.VITE_PORT)
}