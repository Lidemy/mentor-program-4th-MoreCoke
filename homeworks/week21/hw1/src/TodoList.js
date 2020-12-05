/* eslint-disable arrow-parens */
/* eslint-disable react/jsx-one-expression-per-line */

import React, { useState, useEffect } from 'react';

import TodoItem from './TodoItem';

function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const [todoAddInputValue, setTodoAddInputValue] = useState('');

  // useEffect(() => {
  //   console.log('todoAddInputValue', todoAddInputValue);
  //   console.log('todoList', todoList);
  // }, [todoAddInputValue, todoList]);

  useEffect(() => {
    console.log(
      'todoList',
      todoList.map((e) => e.isDone)
    );
  }, [todoList]);

  const onAddTodoClick = () => {
    if (!todoAddInputValue) return;
    const todo = {
      id: new Date().getTime(),
      todo: todoAddInputValue,
      isDone: false,
      isEdit: false,
    };
    setTodoList((prevTodoList) => [todo, ...prevTodoList]);
    setTodoAddInputValue('');
  };

  const onAddTodoKeyPress = (e) => {
    if (e.key === 'Enter') {
      onAddTodoClick();
    }
  };

  const onEditTodoClick = (id, editValue) => {
    const newTodoList = todoList.map((element) => {
      if (element.id === id) {
        return { ...element, isEdit: !element.isEdit, todo: editValue };
      }
      return element;
    });
    setTodoList(newTodoList);
  };

  const onDeleteTodoClick = (id) => {
    const newTodoList = todoList.filter((element) => element.id !== id);
    setTodoList(newTodoList);
  };

  const onToggleDoneTodoClick = (id) => {
    const newTodoList = todoList.map((element) => {
      if (element.id === id) {
        return { ...element, isDone: !element.isDone };
      }
      return element;
    });
    setTodoList(newTodoList);
  };

  const onAddInputValueChange = (e) => {
    setTodoAddInputValue(e.target.value);
  };

  return (
    <div className="TodoList container">
      <div className="p-4 todo-add">
        <div className="form-group row">
          <div className="col-sm-10 d-flex align-items-center">
            <input
              type="text"
              className="form-control"
              name="add"
              onChange={onAddInputValueChange}
              onKeyPress={onAddTodoKeyPress}
              value={todoAddInputValue}
            />
          </div>
          <div className="col-sm-2 col-form-label">
            <button
              className="btn btn-primary"
              type="button"
              onClick={onAddTodoClick}
            >
              新增
            </button>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-around mb-3 todo-btns">
        <button className="btn btn-primary todo-all active" type="button">
          全部任務
        </button>
        <button className="btn btn-success todo-done__all" type="button">
          已完成
        </button>
        <button className="btn btn-info todo-undone" type="button">
          未完成
        </button>
        <button className="btn btn-danger todo-delete__completed" type="button">
          刪除已完成任務
        </button>
      </div>
      <ul className="list-group list-group-flush todo-list">
        {todoList.map((element) => (
          <TodoItem
            todo={element}
            key={element.id}
            onEditTodoClick={onEditTodoClick}
            onDeleteTodoClick={onDeleteTodoClick}
            onToggleDoneTodoClick={onToggleDoneTodoClick}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
