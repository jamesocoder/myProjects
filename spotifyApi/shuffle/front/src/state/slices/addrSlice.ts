import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'server',
    initialState: {addr: ''},
    reducers: {
        initAddr(state) {
            state.addr = (() => {
                return `${import.meta.env.DEV ? 'http' : 'https'}://` +
                    `${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}`;
            })();
        }
    }
});

export const {initAddr} = slice.actions;
export const addrReducer = slice.reducer;