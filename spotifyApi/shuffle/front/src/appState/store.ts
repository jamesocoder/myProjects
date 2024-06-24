import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './slices/counter';

export const store = configureStore({
    reducer: {
        counter: counterReducer
    }
});

export type AppDispatch = typeof store.dispatch;
/* As we add more state slices, RootState's type will be
automatically updated thanks to this line and TypeScript's
built-in inference */
export type RootState = ReturnType<typeof store.getState>;