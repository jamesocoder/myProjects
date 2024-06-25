import {useLoaderData} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../state/hooks';
import {save} from '../state/slices/authorization';

export function GetAuth() {
    return (<div>
        <h1>Get Authorization Component Rendered</h1>
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

    const access = useAppSelector(state => state.authorize.access);

    return <>
        <h1>Authorization Token Obtained</h1>
        <ul style={{textAlign: 'left'}}>
            <li><strong>Access Token: </strong>{access}</li>
            <li><strong>Refresh Token: </strong>{refresh_token}</li>
            <li><strong>Duration (in seconds): </strong>{expires_in}</li>
        </ul>
    </>
}