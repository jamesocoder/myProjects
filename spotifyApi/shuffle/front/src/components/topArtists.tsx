import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../state';
import axios from 'axios';
import { Artist, Image } from '@spotify/web-api-ts-sdk';

export function TopArtists(): JSX.Element {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const addr = useAppSelector(state => state.server.addr);

    // Example of setting a root URL for axios requests
    const axDefault = axios.create({baseURL: import.meta.env.VITE_BACKEND});

    /* Spotify's SDK doesn't have an easily accessible static getAccessToken() function.
    In order to get access to the current one, we must first create an instance of
    SpotifyApi with all the necessary arguments: ClientID, RedirectUri, and Scopes.
    
    The key for our app's token was found in:
    https://github.com/spotify/spotify-web-api-ts-sdk/blob/main/src/auth/AuthorizationCodeWithPKCEStrategy.ts
     - It is listed under the member variable cacheKey. */
    let token: any = localStorage.getItem('spotify-sdk:AuthorizationCodeWithPKCEStrategy:token');

    useEffect(() => {
        if (token) {
            token = JSON.parse(token);

            /* Axios.js's GET function doesn't support sending a JSON body.  This is
            because browsers automatically ignore all GET request bodies by default.
            Although this endpoint responds to requests in a way that is typical for
            GET requests -- not POST requests -- we must use one of the request
            methods that supports a JSON body.
            https://stackoverflow.com/questions/46404051/send-object-with-axios-get-request/46404151#46404151 */
            axDefault.post('/top-5', token)
                .then(result => setData(result.data.items))
                .catch(err => {
                    console.error(err);
                    /* Error was likely the result of an expired token.  Have user
                    reauthenticate. */
                    navigate('/');
                });
        }
    }, [setData, token, navigate]);

    return <>
        <h1>Your All-Time Top Artists</h1>
        <table><tbody><tr>{
            data.map((artist: Artist, index: number) => {
                let image: Image = artist.images[0];
                return <td key={artist.id}>
                    <h2>{'#' + (index + 1)}</h2>
                    <img
                        src={image.url}
                        height={image.height}
                        width={image.width}
                        border='5px' />
                    <p>{artist.name}</p>
                    <a href={artist.external_urls.spotify} target='_blank'>
                        {artist.external_urls.spotify}</a>
                </td>
            })
        }</tr></tbody></table>
    </>
}