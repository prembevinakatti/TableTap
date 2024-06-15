import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: null,
    verified:false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
            state.verified=false
        },
        varifed:(state,action)=>{
            state.status = true;
            state.userData = action.payload.userData;
            state.verified=true

        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            state.verified=false
        }
     }
})

export const {login, logout,varifed} = authSlice.actions;

export default authSlice.reducer;