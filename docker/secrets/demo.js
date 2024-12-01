const fs = require('node:fs');
const rl = require('readline');

/* Variables loaded into the environment in compose.yaml can be
read as usual.
*/
console.log(
    process.env.HOST,
    process.env.PORT,
    process.env.FRONTEND
);

// Variables loaded as secrets must be read from a file
let secretsJson = JSON.parse(fs.readFileSync('./secrets/sec1'));
// Show parsed object
console.log(secretsJson);
// Demonstrate accessing parsed secrets
console.log(secretsJson.CLIENT_ID, secretsJson.HOST);

// Wait for input before ending program
let inp = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});
console.log('Press Enter to end the program');
inp.on('line', () => inp.close());
inp.on('close', () => {
    console.log('Program ended.');
    process.exit(0);
});