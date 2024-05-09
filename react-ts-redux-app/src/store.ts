// store.ts

import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from './slices/tasksSlice';

const store = configureStore({
    reducer: {
        tasks: tasksReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;   
export type AppDispatch = typeof store.dispatch;