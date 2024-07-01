import express from 'express';
import cors from 'cors';
import {routes as rtTest} from './api/test.js';

const app: express.Application = express();

app.use(cors({
  origin: import.meta.env.VITE_FRONTEND
}));

app.all('/', (req, res) => {res.sendStatus(400);});
app.use(rtTest);

if (import.meta.env.PROD)
  app.listen(import.meta.env.VITE_PORT);

export const viteNodeApp = app;