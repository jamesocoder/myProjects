# How to run

Required modules:
- Node.js & npm (Node Package Manager)
    - Use Google to find the right installer,<br>which is typically nvm (Node Version Manager)
    - If you already have Node.js installed, you may need to update it:
    ```
    nvm install latest
    nvm use newest
    ```
- TypeScript
    - `npm install -g typescript`
- Vite
    - `npm install -g vite`

Steps:

1. Clone repository
2. In a terminal, navigate to the root directory (where the tsconfig.json file is located)
3. Install node modules with the command `npm install`
    - My preferred Node package manager is yarn
        - This can be installed with `npm install -g yarn`
        - It can be run with `yarn install`
4. Start the server with the `vite` command
5. Open the address that's printed to the terminal with a browser
6. The count button uses Redux's state management
    - Install Redux's DevTool browser extension to see it in action
    - After installation (in Chrome), it can be found in the "Redux" tab of the dev tools
    - You can change App.tsx's handleClick() function to dispatch an incremented() action instead of amountAdded().
        - After doing so and saving the file, you'll also see a demonstration of Vite's Hot Module Replacement.  Without having to reload the page, when you click the button, it will only be incremented by 1.

# Toolchain

This project was started from a Vite + React + TypeScript template that provided a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Adding Redux

Followed this tutorial to get introduced to Redux: [Let's Learn Modern Redux!](https://youtu.be/9zySeP5vH9c?si=FlKG2VmqtNQZKted&t=1120)

The Redux Toolkit, in combination with TypeScript, has greatly reduced the amount of boilerplate code that Redux requires. It is now much easier to define our state variables and their mutators (reducers) while also benefitting from the typing inferred by TS.  We can create "slice" files for each of our application's features, modularizing the code that changes each slice of the state.

The [store.ts](./src/app/store.ts) and [hooks.ts](./src/app/hooks.ts) files demonstrate how easy it is to create and export pointers to and action dispatchers for each state variable using a couple lines of code.  After setting these up, they rarely have to be modified to handle new state variables or action types.  When a new action type is added to a slice, we only have to update the slice's file.  When we add a new slice, we only have to add a couple things to the store file to hook that new slice up to our global state.

## Expanding the ESLint configuration

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
