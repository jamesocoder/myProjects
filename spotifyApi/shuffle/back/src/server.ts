import dotenv from 'dotenv';
import express from 'express';

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
    const PORT: number = 8081;
    const SERVER_URL: string = `http://localhost:${PORT}`;

    app.use(setRoutes());

    app.listen(PORT, () => {
      console.log(`\nServer listening...\n${SERVER_URL}\n
        Client ID: ${process.env.CLIENT_ID}
        Node Env: ${process.env.NODE_ENV}
        Debug: ${process.env.DEBUG}\n`
      );
    });
}

run();