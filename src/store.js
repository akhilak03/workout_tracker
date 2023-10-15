import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice.js';
import exerciseReducer from './slices/exerciseSlice.js'
export const store=configureStore({
    reducer:{
        user:userReducer,
        exercise:exerciseReducer
    }
})
