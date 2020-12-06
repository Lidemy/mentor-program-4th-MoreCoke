/* eslint-disable arrow-parens */
/* eslint-disable react/jsx-one-expression-per-line */

import React, { useState, useEffect, useMemo } from 'react';

import TodoItem from './TodoItem';

function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const [todoAddInputValue, setTodoAddInputValue] = useState('');
  const [todoType, setTodoType] = useState('all');

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

  const filterTodoList = useMemo(() => {
    switch (todoType) {
      case 'all':
        return todoList;
      case 'done':
        return todoList.filter((element) => element.isDone);
      case 'undone':
        return todoList.filter((element) => !element.isDone);
      // case 'deleteAll':
      //   return [];
      default:
        throw new Error("can't find todo filter type!");
    }
  }, [todoList, todoType]);

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
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => setTodoType('all')}
        >
          全部任務
        </button>
        <button
          className="btn btn-success"
          type="button"
          onClick={() => setTodoType('done')}
        >
          已完成
        </button>
        <button
          className="btn btn-info"
          type="button"
          onClick={() => setTodoType('undone')}
        >
          未完成
        </button>
        <button
          className="btn btn-danger"
          type="button"
          onClick={() => {
            // setTodoType('deleteAll');
            // 會有奇怪的 bug,當刪除全部後再新增 todo 時不會被 render 出來，
            // 還要再點選任意 todoType 按鈕才會 render
            setTodoList([]);
          }}
        >
          刪除全部
        </button>
      </div>
      <ul className="list-group list-group-flush todo-list">
        {filterTodoList.map((element) => (
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
