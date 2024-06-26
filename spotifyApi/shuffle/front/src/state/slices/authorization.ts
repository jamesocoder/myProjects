import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface savedToken {access: string}
const initialState: savedToken = {access: ""}

const slice = createSlice({
    name: 'authToken',
    initialState,
    reducers: {
        save(state, action: PayloadAction<savedToken>) {
            state.access = action.payload.access;
            /* state.refresh = action.payload.refresh_token;
            state.expiresIn = action.payload.expires_in;
            state.expiry = new Date(new Date().getTime() + (action.payload.expires_in * 1000)); */
        }
    }
});

export const {save} = slice.actions;
export const authorize = slice.reducer;