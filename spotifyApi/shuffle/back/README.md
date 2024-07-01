# Toolchain

## TypeScript

Our backend takes advantage of the Intellisense typing afforded by public @types and my own custom types.  We also enjoy some advanced build options from tsconfig.json.

## Express.js

Much of the setup and routing is handled by Express.  Writing the backend is made very simple using its well-documented API.

## vite-plugin-node

This Vite plugin by [axe-me](https://github.com/axe-me-vite-plugin-node) allows us to use Vite's Hot Module Replacement on our backend server.  It also has a side effect of replacing our dotenv dependency with Vite's version of dotenv.  Now we don't have to use the `tsc && node ./build/server.js` command every time we make changes to the backend's code; Vite handles it for us intelligently.

## Spotify Web API TypeScript SDK

Introduced in [July 2023](https://developer.spotify.com/blog/2023-07-03-typescript-sdk), this package greatly simplifies interacting with the web API.