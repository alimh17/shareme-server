import { configureStore } from '@reduxjs/toolkit';
import User from './UserSlice';
import Profile from './ProfileSlice';
import Chat from './ChatSlice';

const store = configureStore({
  reducer: {
    User,
    Profile,
    Chat,
  },
});

export default store;
