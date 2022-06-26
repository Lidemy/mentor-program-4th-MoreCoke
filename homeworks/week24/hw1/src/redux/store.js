import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import postSlice from './slices/postSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    posts: postSlice,
  },
});
