import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'server',
    initialState: {addr: ''},
    reducers: {
        initAddr(state) {
            state.addr = (() => {
                return `${process.env.NODE_ENV === 'development' ? 'http' : 'https'}://` +
                    `${process.env.HOST}:${process.env.PORT}`;
            })();
        }
    }
});

export const {initAddr} = slice.actions;
export const addrReducer = slice.reducer;