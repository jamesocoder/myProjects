import dotenv from 'dotenv';
import express from 'express';

async function main() {
    let result = dotenv.config();
    if (result.error) {throw result.error;}
    console.log(process.env.CLIENT_ID);
}

main().catch(console.error);