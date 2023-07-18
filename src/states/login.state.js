import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    isLoggedIn: false,
    token: "",
    expiresAt: "",
}

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.expiresAt = action.payload.expiresAt;
        },

        logout(state) {
            state.isLoggedIn = false;
            state.token = "";
            state.expiresAt = "";
        }
    }
});


export const { login, logout } = loginSlice.actions;

export default loginSlice;