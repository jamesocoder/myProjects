import {useLoaderData, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../state/hooks';
import {save, reset} from '../state/slices/authorization';

interface Token {
    access_token: string;
    refresh_token: string;
    expires_in: number;
}
function refreshToken(): boolean {
    let result = false;
    fetch(
        `${import.meta.env.VITE_BACKEND}/token-refresh?tokenRefresh=${localStorage.getItem('tokenRefresh')}` 
    ).then(async res => {
        let {access_token, refresh_token, expires_in} = await res.json() as Token;
        storeToken(access_token, refresh_token, expires_in);
        result = true;
    }).catch(() => {
        const dispatch = useAppDispatch();
        dispatch(reset());
        localStorage.removeItem('tokenRefresh');
        localStorage.removeItem('tokenExpire');
        result = false;
    });
    return result;
}
export function checkToken() {
    let getAuth = async () => await fetch (`${import.meta.env.VITE_BACKEND}/authorize`);

    if (localStorage.getItem('tokenRefresh') !== null) {
        // We have a previous authorization
        let expiration = new Date(
        localStorage.getItem('tokenExpire') as string
        ).getTime();
        let now = new Date().getTime();
        if (now >= expiration) {
        // The previous authorization is expired
        if (refreshToken()) {
            /* We've successfully refreshed the authorization.
            Throw an "error" to cause it to be displayed  by our errorElement */
            throw new Response("Successfully Refreshed", {status: 200});
        } else {
            // The refresh didn't work and we need a new authorization
            return getAuth();
            }
        } else {
        // The previous authorization is still valid
        throw new Response("Token Still Current", {status: 200});
        }
    } else {
        // We don't have a previous authorization
        return getAuth();
    }
}
function storeToken(access: string, refresh: string, expire: number): void {
    const dispatch = useAppDispatch();
    dispatch(save({access: access}));

    localStorage.setItem('tokenRefresh', refresh);
    localStorage.setItem(
        'tokenExpire',
        new Date(new Date().getTime() + (expire * 1000)).toUTCString()
    )
}
export function SaveToken(): JSX.Element {
    const {access_token, refresh_token, expires_in} = useLoaderData() as Token;
    storeToken(access_token, refresh_token, expires_in);

    const navTo = useNavigate();
    setTimeout(() => navTo('/'), 3000);

    return <h1>Authorization Token Saved</h1>
}
export function ShowToken(): JSX.Element {
    const access = useAppSelector(state => state.authorize.access);

    let display = access !== "" ?
        <ul style={{textAlign: 'left'}}>
            <li><strong>Access Token: </strong>{access}</li>
            <li><strong>Refresh Token: </strong>{localStorage.getItem('tokenRefresh')}</li>
            <li><strong>Expires on: </strong>{localStorage.getItem('tokenExpire')}</li>
        </ul>
        :
        <p>Failed to authorize.</p>;

    return (<div>
        <h1>Current Token Information</h1>
        {display}
    </div>);
}