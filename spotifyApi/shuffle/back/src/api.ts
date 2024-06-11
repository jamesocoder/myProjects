import { Request, Response } from "express";

export function authorize(req: Request, res: Response) {
    if (
        !(
            'CodeChallenge' in req.query &&
            'PostAuthHandler' in req.query
        )
    ) {res.sendStatus(400);}

    const authUrl = new URL('https://accounts.spotify.com/authorize');

    // TODO: Store code_verifier on server.  Create code_challenge here.

    /* Note how TypeScript forces us to conform to the type
    Record<string, string> when declaring members for an object
    that will be passed into URLSearchParams.  We must explicitly
    declare that req.query's elements are strings. */
    const params = {
        response_type: 'code',
        client_id: process.env.CLIENT_ID,
        scope: 'user-read-private user-read-email',
        code_challenge_method: 'S256',
        code_challenge: req.query['CodeChallenge'] as string,
        redirect_uri: req.query['PostAuthHandler'] as string
    }
    authUrl.search = new URLSearchParams(params).toString();
    /* TODO: Implement frontend
    res.redirect(authUrl.toString());
    */ res.send("Valid request received");
}

export async function getToken(req: Request, res: Response, next: Function) {
    if (
        !(
            'AuthCode' in req.query && 
            'PostTokenHandler' in req.query &&
            'CodeVerifier' in req.query
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
                code_verifier: req.query['CodeVerifier'] as string
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
}