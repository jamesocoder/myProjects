The goal of this folder is to document my progress learning TypeScript.  I plan to write my Spotify shuffle program in this language.

# notes.pdf

I used Microsoft's OneNote to make notes as I learned how to use TypeScript.  To retype all of it in this README while preserving formatting, pictures, and links would be too labor intensive so I will be uploading my notes as a PDF instead.

# How To Run

There are 3 files that were used to experiment with as I progressed through the TypeScript tutorial.

## interfaces.ts

This file is not really meant to be run.  You're meant to hover over the code in VS Code to see how TypeScript manages its interfaces.  If you still want to run it anyways, follow the instructions for classes.ts but use the interfaces.ts file in its place.

## classes.ts

With ts-node installed (`npm install -g ts-node`), use terminal command:<br>
`ts-node classes.ts`

Without ts-node:
1. Transpile classes.ts using tsc (TypeScript Compiler).  tsc will output a .js file
2. Run the .js file with the terminal command `node classes.js`

## app.ts

Demonstrates a basic function and a unique capability of JavaScript and TypeScript: the spread operator

1. Transpile app.ts using tsc
2. Use whatever method you prefer to serve the app.js file and view it in a browser 