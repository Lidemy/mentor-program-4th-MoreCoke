import { createSlice } from '@reduxjs/toolkit';

import { getMe, login, signup } from '../../WebAPI';

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

export const loginAsync = (username, password) => (dispatch, getState) => {
  return login(username, password);
};

export const signupAsync = (nickname, username, password) => (dispatch, getState) => {
  return signup(nickname, username, password);
}

export const getMeAsync = () => (dispatch, getState) => {
  return getMe().then((response) => {
    if (response.ok) {
      dispatch(setUser(response.data));
    } else {
      throw new Error(response);
    }
  });
};

export const { setUser, setLoading } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export const selectLoading = (state) => state.user.loading;

export default userSlice.reducer;
