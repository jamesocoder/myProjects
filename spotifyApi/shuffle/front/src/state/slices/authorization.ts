import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface savedToken {access: string}
const initialState: savedToken = {access: ""}

const slice = createSlice({
    name: 'authToken',
    initialState,
    reducers: {
        save(state, action: PayloadAction<savedToken>) {
            state.access = action.payload.access;
        },
        reset(state) {
            state.access = initialState.access
        }
    }
});

export const {save, reset} = slice.actions;
export const authorize = slice.reducer;