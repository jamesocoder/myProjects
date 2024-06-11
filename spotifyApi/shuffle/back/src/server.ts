import dotenv from 'dotenv';
import express from 'express';
import {AddressInfo} from 'net';
import * as api from './api.js';

const setEnv = (): void => {
  let result = dotenv.config();
  if ('error' in result) {throw result.error;}
}

const setRoutes = (): express.Router => {
  const router = express.Router();

  router.all('/', (req, res) => {res.sendStatus(400);});
  router.get('/authorize', api.authorize);
  router.get('/token-get', api.getToken);

  return router;
}

async function run(): Promise<void> {
    if (process.env.NODE_ENV !== 'production') {setEnv();}

    const app: express.Application = express();

    app.use(setRoutes());

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