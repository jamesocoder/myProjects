# How to run

## Required modules:

- Node.js & npm (Node Package Manager)
    - Use Google to find the right installer,<br>which is typically nvm (Node Version Manager)
    - If you already have Node.js installed, you may need to update it:
    ```
    nvm install latest
    nvm use newest
    ```
- TypeScript and Vite
    - `npm install -g typescript vite`

## Optional:
- yarn
    - This is the Node.js package manager I use most often
    - `npm install -g yarn`
- Redux DevTool browser extension
    - Helps you observe changes to the app's state made with Redux
    - After installation in Chrome, it can be found in the "Redux" tab of Chrome's dev tools

## Steps:

1. Clone repo
2. Open 2 terminals:
    - All subsequent paths are relative to `myProjects/spotifyApi/shuffle`; this is what `.` is equivalent to.
    - Navigate one terminal to `./back`
    - Navigate the other to `./front`
3. In both terminals run your preferred package manager's install command
    - e.g. `npm install` OR `yarn install`
4. In `./back`, create a .env file
    - The text inside should be:
    ```
    VITE_CLIENT_ID=AskMe
    VITE_HOST=localhost
    VITE_PORT=8081
    VITE_FRONTEND=http://localhost:8080
    ```
    - Ask me for the actual value of VITE_CLIENT_ID
    - Note that by default, Vite runs in development mode, meaning `NODE_ENV=development`.  This causes Express.js to display error stack traces in the browser in addition to the default of in the terminal.  You can disable this additional behavior (while possibly also causing other probably harmless side effects with Vite) by adding a `mode: 'production'` member to the `defineConfig` Object argument in `./vite.config.ts`.
5. In the backend's terminal, use `vite` to start it
    - Note that you can cause Express.js to print debug messages in the terminal by setting the DEBUG environment variable: `DEBUG=express:*`
6. In `./front`, create a .env file
    - The text inside should be:
    ```
    VITE_CLIENT_ID=SameAsBackendClientId
    VITE_HOST=localhost
    VITE_PORT=8080
    VITE_BACKEND=http://localhost:8081
    ```
7. In the frontend's terminal, use `vite` to start it
8. Open the address that the frontend prints in a browser
    - It should immediately ask you to sign into Spotify
    - A denial will print a simple message
9. On authorization, the app will print the access token issued by Spotify that allows us to use its API
    - You then have access to some self-explanatory buttons on the bottom demonstrating use of the API
    - Your authorization will persist throughout browser sessions for an hour, after which you'll need to authorize the application again.