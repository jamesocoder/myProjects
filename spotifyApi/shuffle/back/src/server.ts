import dotenv from 'dotenv';
import express from 'express';

/* Adding type safety to this project causes some inconvenience
- dotenv can't be loaded into its default process.env because
  TypeScript doesn't have a global 'process' variable
- A plain blank object can't be given to dotenv to populate because
  TypeScript doesn't allow downstream code to reference Object
  members that weren't explicitly declared
  - To get around this, we must declare the type below.
  - Making the members optional allows us to initiate it with an
    empty object
  - This allows us to then give an empty object to dotenv.config()
  - It's probably possible to disable strict Object member
    enforcement through some compiler setting, but then why even
    use TS at that point? */
type Environment = {
    // Spotify Developer's App ID
    CLIENT_ID?: string

    // For enabling Express's debug output
    DEBUG?: string

    /* For setting the app into production mode which disables
    Express's stack trace printing on error */
    NODE_ENV?: string
}
const setEnv = (): Environment => {
  let env: Environment = {};
  let result = dotenv.config({
    processEnv: env
  });
  if ('error' in result) {throw result.error;} else return env;
}

const setRoutes = (): express.Router => {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.send("test string");
  });

  return router;
}

async function run(): Promise<void> {
    const env: Environment = setEnv();

    const app: express.Application = express();
    const PORT: number = 8081;
    const SERVER_URL: string = `http://localhost:${PORT}`;

    app.use(setRoutes());

    app.listen(PORT, () => {
      console.log(`\nServer listening...\n${SERVER_URL}\nCient ID: ${env.CLIENT_ID}\n`);
    });
}

run().catch(console.error);