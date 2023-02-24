import { createSlice } from '@reduxjs/toolkit';

const ChatSlice = createSlice({
  name: 'chat',
  initialState: {
    chatList: [],
    currentChat: {},
  },
  reducers: {
    initChatList: (state, action) => {
      state.chatList = action.payload;
    },
    addUserToChetList: (state, action) => {
      const cpState: any = { ...state };
      const user = state.chatList.find((f: any) => f.username === action.payload.username);
      if (!user) cpState.chatList.push(action.payload);
      state = cpState;
    },
    removeUserOfChatList: (state, action) => {
      const cpState: any = { ...state };
      const filter = cpState.chatList.filter((f: any) => f.username !== action.payload);
      state.chatList = filter;
      state.currentChat = state.chatList[0];
    },
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
  },
});

export const { initChatList, addUserToChetList, removeUserOfChatList, setCurrentChat } = ChatSlice.actions;

export default ChatSlice.reducer;
