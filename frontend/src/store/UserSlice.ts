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
    DecreaseFollowing: (state: any) => {
      state.user.followings = state.user.followings - 1;
    },
    IncreaseFollowings: (state: any) => {
      state.user.followings = state.user.followings + 1;
    },
  },
});

export const { initUser, DecreaseFollowing, IncreaseFollowings } = UserSlice.actions;

export default UserSlice.reducer;
