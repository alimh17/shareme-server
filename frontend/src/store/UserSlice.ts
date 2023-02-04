import { createSlice } from '@reduxjs/toolkit';

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
  },
  reducers: {
    initUser: (state: any, action: any) => {
      state.user = action.payload;
    },
  },
});

export const { initUser } = UserSlice.actions;

export default UserSlice.reducer;
