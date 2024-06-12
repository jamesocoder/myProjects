import { Router } from 'express';
import * as crypto from 'node:crypto'

/* Example of Immediately Invoked Function Expression (IIFE)
A concept that I learned about in class that fits this use-case
perfectly.  This function will only ever be invoked once and helps
us encapsulate the variables used to generate its output, stopping
us from polluting the global namespace.

https://developer.mozilla.org/en-US/docs/Glossary/IIFE */
const codeVerifier = ((): string => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' +
        '0123456789';
    const randomValues = crypto.getRandomValues(new Uint8Array(64));
    const result = randomValues.reduce(
        (acc, x) => acc + possible[x % possible.length],
        ""
    );
    return result;
})();

export const routes = Router();

routes.all('/', (req, res) => {res.sendStatus(400);});

routes.get('/authorize', async (req, res) => {
    if (!('PostAuthHandler' in req.query)) {res.sendStatus(400);}

    const authUrl = new URL('https://accounts.spotify.com/authorize');

    const hashed = await crypto.subtle.digest(
        'SHA-256',
        new TextEncoder().encode(codeVerifier)
    );
    /* The replacements here remove characters that would be
    problematic in a URL's Search Query; they are reserved characters
    in URLs */
    const codeChallenge =
        btoa(String.fromCharCode(...new Uint8Array(hashed)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');

    /* Note how TypeScript forces us to conform to the key:value
    type, Record<string, string>, when declaring members for an
    object that will be passed into URLSearchParams.  We must
    explicitly declare that req.query's elements are strings. */
    const params = {
        response_type: 'code',
        client_id: process.env.CLIENT_ID,
        scope: 'user-read-private user-read-email',
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: req.query['PostAuthHandler'] as string
    }
    authUrl.search = new URLSearchParams(params).toString();
    /* TODO: Implement frontend
    res.redirect(authUrl.toString());
    */ res.send(`Valid request received<br><br>${authUrl.toString()}`);
});

routes.get('/token-get', (req, res, next) => {
    if (
        !(
            'AuthCode' in req.query && 
            'PostTokenHandler' in req.query
        )
    ) {res.sendStatus(400);} else {
        /* TODO: Implement frontend
        await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: new URLSearchParams({
                client_id: process.env.CLIENT_ID,
                grant_type: 'authorization_code',
                code: req.query['AuthCode'] as string,
                redirect_uri: req.query['PostTokenHandler'] as string,
                code_verifier: codeVerifier
            })
        }).then(result => {
            // On success, send the retrieved token
            res.json(result.json());
        }).catch(err => {
            // On fail, send the Error object
            next(err);
        });
        */ res.send("Valid request received");
    }
});