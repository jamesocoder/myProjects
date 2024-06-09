import dotenv from 'dotenv';
import express from 'express';
import {AddressInfo} from 'net';

const setEnv = (): void => {
  let result = dotenv.config();
  if ('error' in result) {throw result.error;}
}

const setRoutes = (): express.Router => {
  const router = express.Router();

  router.get('/', (req, res) => {
    throw new Error('BROKEN');
  });

  return router;
}

async function run(): Promise<void> {
    setEnv();

    const app: express.Application = express();

    app.use(setRoutes());

    const server = app.listen(process.env.PORT, () => {
      const address = server.address() as AddressInfo;
      const deplyd: boolean = process.env.DEPLOYED as boolean == true;
      let host = deplyd ? address.address : 'localhost';

      console.log(
        `\nServer listening...\n` +
        `${deplyd ? 'https' : 'http'}://${host}\:${process.env.PORT}\n\n` +
        `Client ID: ${process.env.CLIENT_ID}\n` +
        `Node Env: ${process.env.NODE_ENV}\n` +
        `Debug: ${process.env.DEBUG}\n`
      );
    });
}

run();