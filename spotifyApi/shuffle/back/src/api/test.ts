import express, {Router} from 'express';
export const routes = Router();
import {AccessToken, SpotifyApi} from '@spotify/web-api-ts-sdk';

routes.use(express.json());

// Expects a POST request because GET requests do not support JSON bodies
routes.post('/top-5', async (req, res, next) => {
    let token: AccessToken = req.body;
    let api = SpotifyApi.withAccessToken(process.env.CLIENT_ID!, token);
    await api.currentUser.topItems('artists', 'long_term', 5)
        .then(json => res.json(json))
        .catch(err => next(err));
});