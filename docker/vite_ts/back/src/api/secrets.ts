import express, { Router } from 'express';
import { readFileSync } from "fs";

function getSecret(name: string) {
    let secrets = JSON.parse(readFileSync('./secrets', 'utf8'));
    // Check if name is in secrets object.  Return value if yes.  Throw error if not.
    if (name in secrets) {
        return secrets[name]
    } else {
        throw new Error(`${name} was not found in secrets!`);
    }
}

export const routes = Router();

// Use json parsing middleware to comprehend requeset bodies
routes.use(express.json());
// Expects a POST request because GET requests do not support JSON bodies
routes.post('/secret', (req, res, next) => {
    let {name}: {name: string} = req.body;
    try {
        res.send(getSecret(name));
    } catch (err) {
        next(err);
    }
});