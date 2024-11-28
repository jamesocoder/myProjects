const fs = require('fs');
const rl = require('readline');

console.log(
    process.env.HOST,
    process.env.PORT,
    process.env.FRONTEND
);

let stream = fs.createReadStream(
    './secrets/sec1'
);
stream.on('error', err => {
    console.log(`Error reading file: ${err}`)
});

let line = rl.createInterface({
    input: stream,
    crlfDelay: Infinity
});
line.on('line', line => {
    console.log(line);
});
line.on('close', () => {
    console.log('Finished reading secrets');
});

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