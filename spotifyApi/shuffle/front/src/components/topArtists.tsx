import axios from 'axios';
import { useAppSelector } from '../state';
import { AccessToken, Artist, Image } from '@spotify/web-api-ts-sdk';
import { useEffect, useState } from 'react';

/* Axios.js's GET function doesn't support sending a JSON body.  This is
because browsers automatically ignore all GET request bodies by default.
Although this endpoint responds to requests in a way that is typical for
GET requests -- not POST requests -- we must use one of the request
methods that supports a JSON body.
https://stackoverflow.com/questions/46404051/send-object-with-axios-get-request/46404151#46404151 */
export function TopArtists(): JSX.Element {
    const axDefault = axios.create({
        baseURL: import.meta.env.VITE_BACKEND
    })
    const token: AccessToken = useAppSelector(state => state.authorization.accessToken);

    const [data, setData] = useState([]);

    useEffect(() => {
        axDefault.post('/top-5', token)
            .then(result => setData(result.data.items))
            .catch(err => console.error(err));
    }, [setData]);

    return <>
        <h1>Your All-Time Top Artists</h1>
        <table><tbody>{
            data.map((artist: Artist, index: number) => {
                let image: Image = artist.images[0];
                return <tr key={artist.id}>
                    <h2>{'#' + (index + 1)}</h2>
                    <img
                        src={image.url}
                        height={image.height}
                        width={image.width}
                        border='5px' />
                    <p>{artist.name}</p>
                    <a href={artist.external_urls.spotify} target='_blank'>{artist.external_urls.spotify}</a>
                </tr>
            })
        }</tbody></table>
        <div>{JSON.stringify(data)}</div>
    </>
}