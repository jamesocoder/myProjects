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

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

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
