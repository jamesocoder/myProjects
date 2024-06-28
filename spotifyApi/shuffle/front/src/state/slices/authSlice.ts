import {createSlice, PayloadAction} from "@reduxjs/toolkit";

/* Source root: https://github.com/spotify/spotify-web-api-ts-sdk/blob/main/src
AuthenticationResponse: ./types.ts
emptyAccessToken: ./auth/IAuthStrategy.ts */
import {AuthenticationResponse, emptyAccessToken} from "@spotify/web-api-ts-sdk";

const initialState: AuthenticationResponse = {
    authenticated: false,
    accessToken: emptyAccessToken
};

const slice = createSlice({
    name: 'apiSpotify',
    initialState,
    reducers: {
        authorize(state, action: PayloadAction<AuthenticationResponse>) {
            state.authenticated = action.payload.authenticated;
            state.accessToken = { ...action.payload.accessToken };
        }
    }
});

export const {authorize} = slice.actions;
export const authReducer = slice.reducer;