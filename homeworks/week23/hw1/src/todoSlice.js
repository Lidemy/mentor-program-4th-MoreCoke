import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todoList: [],
    todoType: 'all'
  },
  reducers: {
    add: (state, action) => {
      const todo = {
        id: new Date().getTime(),
        todo: action.payload,
        isDone: false,
        isEdit: false,
      };
      state.todoList.unshift(todo);
    },
    edit: (state, action) => {
      const i = state.todoList.findIndex(todo => todo.id === action.payload.id);
      state.todoList[i].isEdit = !state.todoList[i].isEdit;
      state.todoList[i].todo = action.payload.todo;
    },
    del: (state, action) => {
      const i = state.todoList.findIndex(todo => todo.id === action.payload);
      state.todoList.splice(i, 1);
    },
    toggleDone: (state, action) => {
      const i = state.todoList.findIndex(todo => todo.id === action.payload);
      state.todoList[i].isDone = !state.todoList[i].isDone;
    },
    updateType: (state, action) => {
      state.todoType = action.payload;
    },
    reset: state => {
      state.todoType = 'all';
      state.todoList = [];
    }
  }
});

export const { add, edit, del, toggleDone, updateType, reset } = todoSlice.actions;

export default todoSlice.reducer;

