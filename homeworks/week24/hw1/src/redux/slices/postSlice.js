import { createSlice } from '@reduxjs/toolkit';

import { getPostsByPage, getPostDetail, postPost } from '../../WebAPI';

export const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    total: 0,
    detail: {},
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    setDetail: (state, action) => {
      state.detail = action.payload;
    },
  },
});

export const getPostsByPageAsync = (currentPage) => (dispatch, getState) => {
  getPostsByPage(currentPage).then((res) => {
    dispatch(setPosts(res.posts));
    dispatch(setTotal(res.total));
  });
};

export const getPostDetailAsync = (pid) => (dispatch, getState) => {
  getPostDetail(pid).then((res) => {
    dispatch(setDetail(res));
  });
};

export const postPostAsync = (title, content) => (dispatch, getState) => {
  return postPost(title, content);
};

export const { setPosts, setTotal, setDetail } = postSlice.actions;

export const selectPosts = (state) => state.posts.posts;

export const selectTotal = (state) => state.posts.total;

export const selectDetail = (state) => state.posts.detail;

export default postSlice.reducer;
