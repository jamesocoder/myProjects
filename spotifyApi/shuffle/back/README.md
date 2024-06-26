# Toolchain

## TypeScript

Our backend takes advantage of the Intellisense typing afforded by public @types and my own custom types.  We also enjoy some advanced build options from tsconfig.json.

## Express.js

Much of the setup and routing is handled by Express.  Writing the backend is made very simple using its well-documented API.

## dotenv

It took some work to get this working in a TypeScript application, but this library now helps us set up environment variables as the Express server starts up.  On the frontend, Vite uses this library in the background to load its environment variables.