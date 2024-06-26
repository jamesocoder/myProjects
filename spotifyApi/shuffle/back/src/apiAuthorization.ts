import { Router } from 'express';
import * as crypto from 'node:crypto';

export const routes = Router();

/* Example of Immediately Invoked Function Expression (IIFE)
A concept that I learned about in class that fits this use-case
perfectly.  This function will only ever be invoked once and helps
us encapsulate the variables used to generate its output, stopping
us from polluting the global namespace.

https://developer.mozilla.org/en-US/docs/Glossary/IIFE */
const CODE_VERIFIER = ((): string => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' +
        '0123456789';
    const randomValues = crypto.getRandomValues(new Uint8Array(64));
    const result = randomValues.reduce(
        (acc, x) => acc + possible[x % possible.length],
        ""
    );
    return result;
})();

const TOKEN_API = 'https://accounts.spotify.com/api/token';
const TOKEN_REQUEST = {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
}

const AUTH_ENDPOINT = '/authorize';
routes.get(AUTH_ENDPOINT, async (req, res, next) => {
    if (Object.keys(req.query).length === 0) {
        // The client is requesting an authorization
        const authUrl = new URL('https://accounts.spotify.com/authorize');

        const hashed = await crypto.subtle.digest(
            'SHA-256',
            new TextEncoder().encode(CODE_VERIFIER)
        );
        /* The replacements here remove characters that would be
        problematic in a URL's Search Query; they are reserved characters
        in URLs */
        const codeChallenge =
            btoa(String.fromCharCode(...new Uint8Array(hashed)))
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');

        const params = {
            response_type: 'code',
            client_id: process.env.CLIENT_ID,
            scope: 'user-read-private user-read-email',
            code_challenge_method: 'S256',
            code_challenge: codeChallenge,
            redirect_uri: process.env.ADDRESS + AUTH_ENDPOINT
        }
        authUrl.search = new URLSearchParams(params).toString();

        res.redirect(authUrl.toString());
    } else if (req.query['code'] !== undefined) {
        // Spotify has sent an authorization code
        await fetch(TOKEN_API, {
            ...TOKEN_REQUEST,
            body: new URLSearchParams({
                client_id: process.env.CLIENT_ID,
                grant_type: 'authorization_code',
                code: req.query['code'] as string,
                redirect_uri: process.env.ADDRESS + AUTH_ENDPOINT,
                code_verifier: CODE_VERIFIER
            })
        }).then(async result => {
            // On success, send the retrieved token to the client
            res.json(await result.json());
        }).catch(err => {
            // On fail, send the Error object
            next(err);
        });
    } else if (req.query['error'] !== undefined) {
        // Spotify has sent an {error: 'access_denied'}
        res.sendStatus(401);
    } else {
        next(new Error(
            '/authorize endpoint has received an unexpected request: ' +
            req.url.toString()
        ));
    }
});

routes.get('/token-refresh', async (req, res, next) => {
    if (!('tokenRefresh' in req.query)) {res.sendStatus(400);}
    else {
        /* Note how TypeScript forces us to conform to the key:value
        type, Record<string, string>, when declaring members for an
        object that will be passed into URLSearchParams.  We must
        explicitly declare that req.query's elements are strings. */
        await fetch(TOKEN_API, {
            ...TOKEN_REQUEST,
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: req.query['tokenRefresh'] as string,
                client_id: process.env.CLIENT_ID
            })
        }).then(async result => {
            res.json(await result.json());
        }).catch(err => {
            next(err);
        })
    }
});