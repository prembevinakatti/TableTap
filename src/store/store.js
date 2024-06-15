import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authslice';
import profileSlice from './profileslice'


const store = configureStore({
    reducer: {
        auth: authSlice,
        profile: profileSlice,
    },
});

export default store;