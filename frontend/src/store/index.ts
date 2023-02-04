import { configureStore } from '@reduxjs/toolkit';
import User from './UserSlice';

const store = configureStore({
  reducer: {
    User,
  },
});

export default store;
