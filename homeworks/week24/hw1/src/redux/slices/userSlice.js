import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, setLoading } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export const selectLoading = (state) => state.user.loading;

export default userSlice.reducer;
