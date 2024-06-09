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

    /* TODO: The localhost URL won't be applicable once this app is
    deployed.  Should delete this as well as modify the printout on
    deployment. */
    const server = app.listen(process.env.PORT, () => {
      const address = server.address() as AddressInfo;
      let host = process.env.DEPLOYED as boolean == true ? address.address : 'localhost';

      console.log(`\nServer listening...\nhttp://${host}\:${process.env.PORT}\n
        Client ID: ${process.env.CLIENT_ID}
        Node Env: ${process.env.NODE_ENV}
        Debug: ${process.env.DEBUG}\n`
      );
    });
}

run();