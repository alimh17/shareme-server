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
    deletePost: (state: any) => {
      const cpProfile = { ...state.profile };
      cpProfile.posts -= 1;
      state.profile = cpProfile;
    },
  },
});

export const { initProfile, deletePost } = ProfileSlice.actions;

export default ProfileSlice.reducer;
