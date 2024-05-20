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
    - Add "CLIENT_ID=" + any random string to it
    - The text inside should look like: `CLIENT_ID=a209d8e4f`
4. Use the terminal command `tsc`
    - This will create a build folder
5. Run the built files with `node ./build/_____.js`
6. Your CLIENT_ID should be printed in the terminal