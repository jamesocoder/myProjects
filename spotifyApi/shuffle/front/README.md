# Toolchain

## Vite, React, & TypeScript

This project was started from a Vite + React + TypeScript template that provided a minimal setup to get React working in Vite with HMR (Hot Module Replacement) and some ESLint rules.

Vite's HMR and build optimization behind the scenes makes iterating on the app very fast.  We don't have to rebuild and restart everything after every change like we do on the backend, Vite intelligently handles that for us; effectively allowing us to keep the frontend app running and constantly reflecting our changes to its codebase.

Currently, two official Vite-React plugins are available.  This app currently uses the first:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Adding Redux

I followed this tutorial to get introduced to Redux: [Let's Learn Modern Redux!](https://youtu.be/9zySeP5vH9c?si=FlKG2VmqtNQZKted&t=1120)

The Redux Toolkit, in combination with TypeScript, has greatly reduced the amount of boilerplate code that Redux requires. It is now much easier to define our state variables and their mutators (reducers) while also benefitting from the typing inferred by TS.  We can create "slice" files for each of our application's features, modularizing the code that changes each slice of the state.

The [store.ts](./src/app/store.ts) and [hooks.ts](./src/app/hooks.ts) files demonstrate how easy it is to create and export pointers to and action dispatchers for each state variable using a couple lines of code.  After setting these up, they rarely have to be modified to handle new state variables or action types.  When a new action type is added to a slice, we only have to update the slice's file.  When we add a new slice, we only have to add a couple things to the store file to hook that new slice up to our global state.

## Spotify Web API TypeScript SDK

I am really enjoying exploring this SDK and have been learning a lot of techniques from reading its [source code](https://github.com/spotify/spotify-web-api-ts-sdk/tree/main).

## Option to expand the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
