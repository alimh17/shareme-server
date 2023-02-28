import { createSlice } from '@reduxjs/toolkit';

const ChatSlice = createSlice({
  name: 'chat',
  initialState: {
    currentChat: {},
    userData: {},
  },
  reducers: {
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setCurrentChat, setUserData } = ChatSlice.actions;

export default ChatSlice.reducer;
