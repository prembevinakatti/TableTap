import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profiledata: null,
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        updateProfile: (state, action) => {
            state.profiledata = action.payload.profiledata;
        },
    },
});

export const { updateProfile } = profileSlice.actions;

export default profileSlice.reducer;