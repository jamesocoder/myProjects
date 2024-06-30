import {createSlice, PayloadAction} from "@reduxjs/toolkit";

/* Source root: https://github.com/spotify/spotify-web-api-ts-sdk/blob/main/src
AuthenticationResponse: ./types.ts
emptyAccessToken: ./auth/IAuthStrategy.ts */
import {AuthenticationResponse, emptyAccessToken, SpotifyApi} from "@spotify/web-api-ts-sdk";

const initialState: AuthenticationResponse = {
    authenticated: false,
    accessToken: emptyAccessToken
};

const slice = createSlice({
    name: 'apiSpotify',
    initialState,
    reducers: {
        authorize(state, action: PayloadAction<AuthenticationResponse>) {
            /* Storing the AuthenticationResponse in our global state like
            this is unnecessary because Spotify's SDK takes care of storing
            and managing everything in localStorage by default. See:
            https://github.com/spotify/spotify-web-api-ts-sdk?tab=readme-ov-file#extensibility---cachingstrategy

            This code is left in anyways as an exercise on using Redux */
            state.authenticated = action.payload.authenticated;
            state.accessToken = { ...action.payload.accessToken };
        },
        logout(state) {
            SpotifyApi
                .withAccessToken(
                    import.meta.env.VITE_CLIENT_ID,
                    state.accessToken
                )
                .logOut();
            state.authenticated = initialState.authenticated;
            state.accessToken = {...initialState.accessToken};
        }
    }
});

export const {authorize, logout} = slice.actions;
export const authReducer = slice.reducer;