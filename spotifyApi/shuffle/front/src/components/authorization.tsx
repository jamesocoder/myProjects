import {useLoaderData} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../state/hooks';
import {save} from '../state/slices/authorization';

export function GetAuth() {
    const access = useAppSelector(state => state.authorize.access);

    let err = access ? <></> : <p>User refused authorization.</p>;

    return (<div>
        <h1>Get Authorization Component Rendered</h1>
        {err}
    </div>);
}

interface authToken {
    access_token: string;
    refresh_token: string;
    expires_in: number;
}
export function SaveToken() {
    const {access_token, refresh_token, expires_in} = useLoaderData() as authToken;

    const dispatch = useAppDispatch();
    dispatch(save({access: access_token}));

    localStorage.setItem('tokenRefresh', refresh_token);
    localStorage.setItem(
        'tokenExpire',
        new Date(new Date().getTime() + (expires_in * 1000)).toUTCString()
    )

    const access = useAppSelector(state => state.authorize.access);

    return <>
        <h1>Authorization Token Obtained</h1>
        <ul style={{textAlign: 'left'}}>
            <li><strong>Access Token: </strong>{access}</li>
            <li><strong>Refresh Token: </strong>{localStorage.getItem('tokenRefresh')}</li>
            <li><strong>Expires at: </strong>{localStorage.getItem('tokenExpire')}</li>
        </ul>
    </>
}