import { createSlice } from '@reduxjs/toolkit';

const ProfileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: {},
  },
  reducers: {
    initProfile: (state, action) => {
      state.profile = action.payload;
    },
    deletePost: (state: any, { payload }) => {
      const cpProfile = { ...state.profile };

      const filter = cpProfile.posts.filter((post: any) => post._id !== payload);
      cpProfile.posts = filter;

      state.profile = cpProfile;
    },
  },
});

export const { initProfile, deletePost } = ProfileSlice.actions;

export default ProfileSlice.reducer;
