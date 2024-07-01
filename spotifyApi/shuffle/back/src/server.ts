import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import {routes as rtTest} from './api/test.js';
import {AddressInfo} from 'net';

async function run(): Promise<void> {
    if (process.env.NODE_ENV !== 'production') {
      let result = dotenv.config();
      if ('error' in result) {throw result.error;}      
    }

    const app: express.Application = express();

    app.use(cors({
      origin: process.env.CLIENT_HOST
    }));

    app.all('/', (req, res) => {res.sendStatus(400);});
    app.use(rtTest);

    const server = app.listen(process.env.PORT, () => {
      const address = server.address() as AddressInfo;
      let root: string;
      if (process.env.DEPLOYED as boolean == true) {
        root = `https\://${address.address}`;
      } else {
        root = `http\://localhost\:${address.port}`
      }
      process.env.ADDRESS = root;

      console.log(
        `\nServer listening...\n` +
        `${root}\n\n` +
        `Client ID: ${process.env.CLIENT_ID}\n` +
        `Node Env: ${process.env.NODE_ENV}\n` +
        `Debug: ${process.env.DEBUG}\n`
      );
    });
}

run();