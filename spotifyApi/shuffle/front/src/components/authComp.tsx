import {useNavigate, useSearchParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector, authorize, logout} from '../state';
import {useCallback} from 'react';
import {saveErrToTxt} from '../utils';

/* Source root: https://github.com/spotify/spotify-web-api-ts-sdk/blob/main/src
Scopes: ./Scopes.ts
SpotifyApi: ./SpotifyApi.ts */
import {Scopes, SpotifyApi} from "@spotify/web-api-ts-sdk";

export function Login(): JSX.Element {
    const serverAddr = useAppSelector(state => state.server.addr);
    const authorization = useAppSelector(state => state.authorization);
    const dispatch = useAppDispatch();

    /* Note that the following 2 declarations are for 2 different ways of
    routing the user in the browser:
    - useSearchParams edits the current page's search query.  If the component's
    rendering logic is conditional on the contents of the query, it will react
    accordingly.
    - useNavigate can also be used to change the search query.  It can also direct
    the user to completely different pages, causing entirely different components to
    be rendered. */
    const [qry, setQry] = useSearchParams();
    const navigate = useNavigate();

    const cbLogout = useCallback(() => {
        dispatch(logout());
        navigate('?logged-out=1');
    }, [navigate]);
    const cbTop5 = useCallback(() => {
        navigate('/myTop5');
    }, [navigate]);
    const cbShowToken = useCallback(() => {
        return <div>
            <h1>Current Token Information</h1>
            <ul style={{textAlign: 'left'}}>
                <li><strong>Access Token: </strong>{authorization.accessToken.access_token}</li>
                <li><strong>Refresh Token: </strong>{authorization.accessToken.refresh_token}</li>
                <li><strong>Expires on: </strong>{new Date(authorization.accessToken.expires!).toString()}</li>
            </ul>
            <button onClick={() => cbTop5()}>Show My Top 5 Artists</button>
            <button onClick={() => cbLogout()}>Logout</button>
        </div>
    }, [authorization, cbLogout, cbTop5]);

    let result: JSX.Element = <></>;

    if (authorization.authenticated) {
        result = cbShowToken();
    } else {
        if (qry.has('error')) {
            result = <div>
                <h1>Authorization Declined</h1>
                <p>This app doesn't do anything until you give it your authorization.</p>
            </div>
        } else if (qry.has('logged-out')) {
            result = <div>
                <h1>Logged Out</h1>
                <button onClick={() => setQry('')}>Log Back In</button>
            </div>
        } else {
            /* Explanation of SpotifyApi.performUserAuthorization()
            This function helps us perform Spotify's client-side authorization
            with PKCE.  We aren't initializing an instance of SpotifyAPI here because
            I don't want the client to have access to its functions; calls to retrieve
            data out of Spotify's Web API should be handled by the backend server while
            this frontend only displays said data and dispatches modification actions
            for the backend to process.
            
            We expect serverAddr to have been assigned a value by App.tsx before
            this state action is ever dispatched.
    
            This overload of .performUserAuthorization() requires a callback
            function to capture the AccessToken, but I want to capture the
            additional 'authenticated' value that .performUserAuthorization()
            returns in addition to an AccessToken; thus, I will give it a callback
            that does nothing. */
            SpotifyApi.performUserAuthorization(
                // TODO: Change to using Docker secrets
                import.meta.env.VITE_CLIENT_ID,
                serverAddr,
                Scopes.userDetails.concat(Scopes.userRecents),
                async () => {}
            ).then(authResp => {
                /* To account for lag between the frontend and the backend, and because
                Date.now() is a factor in 'expires' value, we should calculate the token's
                expiry datetime as soon as we get it; otherwise, the server would calculate
                it when it receives a raw AccessToken (one that doesn't already have an
                'expires' value) some time later.
                
                The formula for this calculation can be found in:
                ./auth/AccessTokenHelpers.ts
    
                Although its container class is exported from its module, this module is not
                declared an export by the SDK's package.json (which names ./index.ts as the
                file that declares what is exported). */
                if (authResp.authenticated){
                    authResp.accessToken.expires = Date.now() + (authResp.accessToken.expires_in * 1000);
                    dispatch(authorize(authResp));
                    result = cbShowToken();
                }
            }).catch(err => {
                saveErrToTxt(err)
                result = <div>
                    <h1>An error prevented us from completing the authorization.</h1>
                    <p>Failed to authorize.</p>
                </div>
            });
        }
    }

    return result;
}