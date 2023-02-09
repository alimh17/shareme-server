import { configureStore } from '@reduxjs/toolkit';
import User from './UserSlice';
import Profile from './ProfileSlice';

const store = configureStore({
  reducer: {
    User,
    Profile,
  },
});

export default store;
