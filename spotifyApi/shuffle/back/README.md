# How to run

Required modules:
- Node.js & npm (Node Package Manager)
    - Use Google to find the right installer,<br>which is typically nvm (Node Version Manager)
- TypeScript
    - `npm install -g typescript`

Steps:

1. Clone repository
2. In a terminal, navigate to the root directory (where the tsconfig.json file is located)
3. Install node modules with the command `npm install`
    - My preferred Node package manager is yarn
        - This can be installed with `npm install -g yarn`
        - It can be run with `yarn install`
3. Create a .env file in the root directory
    - The text inside should look like:
    ```
    DEPLOYED=0
    PORT=8081
    CLIENT_ID=a209d8e4f
    NODE_ENV=production
    ```
    - Note that you can change .env's NODE_ENV value to *development* to cause an Express.js error stack trace to be printed in the browser as well as the server's terminal.
4. Use the terminal command `tsc`
    - This will create a build folder
5. Run the built files with `node ./build/_____.js`
    - You can try setting your environment up beforehand to cause Express.js to print its debug messages to the server's terminal: `DEBUG = express:*`
6. All environment variables should be printed in the terminal.  Browser should display a http status code 400 response to raw requests made to any valid endpoint (root, `/authorize`, or `/token-get`).  Add the proper URL search query parameters to receive an OK response.