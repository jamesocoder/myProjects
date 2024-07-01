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
    - `npm install`
    - `yarn install`
4. In `./back`, create a .env file
    - The text inside should be:
    ```
    DEPLOYED=0
    PORT=8081
    CLIENT_ID=AskMe
    NODE_ENV=production
    ```
    - Ask me for the actual value of the CLIENT_ID
    - Note that you can change NODE_ENV to *development* to cause an Express.js error stack trace to be printed in the browser as well as the server's terminal.
5. Build the backend with the `tsc` command in the backend's terminal
6. Start the backend server with `node ./build/server.js`
    - Note that you can cause the server to print debug messages the terminal DEBUG environment variable to `DEBUG=express:*`
7. In `./front`, create a .env file
    - The text inside should be:
    ```
    VITE_CLIENT_ID=SameAsBackendClientId
    VITE_HOST=localhost
    VITE_PORT=8080
    VITE_BACKEND=http://localhost:8081
    ```
8. In the frontend's terminal, use `vite` to start it
9. Open the address that the frontend prints in a browser
    - It should immediately ask you to sign into Spotify
    - A denial will print a simple message
10. An authorization will print the access token issued by Spotify allowing us to use its API
    - You then have access to some self-explanatory buttons on the bottom demonstrating use of Spotify's API
    - Your authorization will persist throughout browser sessions for an hour, after which you'll need to authorize the application again.