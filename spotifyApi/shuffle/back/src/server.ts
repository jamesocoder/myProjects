import dotenv from 'dotenv';
//import express from 'express';

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
    CLIENT_ID?: string
}

async function main(): Promise<void> {
    let env: Environment = {};
    let result = dotenv.config({
        processEnv: env
    });
    if ('error' in result) {throw result.error;}
    console.log(env.CLIENT_ID);
}

main().catch(console.error);