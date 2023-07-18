import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    selectedChat: null,
    chats: [],
};


export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addChat: (state, action) => {
            state.chats.push(action.payload);
        },
        setSelectedChat: (state, action) => {
            state.selectedChat = action.payload;
        },
    },
})