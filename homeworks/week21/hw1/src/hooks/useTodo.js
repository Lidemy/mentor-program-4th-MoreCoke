import { useState, useEffect, useMemo } from 'react';

export default function useTodo() {
  const [todoList, setTodoList] = useState([]);
  const [todoType, setTodoType] = useState('all');

  useEffect(() => {
    console.log(
      'todoList',
      todoList.map((e) => e.isDone)
    );
  }, [todoList]);

  const onAddTodoClick = (title) => {
    const todo = {
      id: new Date().getTime(),
      todo: title,
      isDone: false,
      isEdit: false,
    };
    setTodoList((prev) => [todo, ...prev]);
  };

  const onEditTodoClick = (id, editValue) => {
    const newTodoList = todoList.map((element) =>
      element.id === id
        ? { ...element, isEdit: !element.isEdit, todo: editValue }
        : element
    );
    setTodoList(newTodoList);
  };

  const onDeleteTodoClick = (id) => {
    const newTodoList = todoList.filter((element) => element.id !== id);
    setTodoList(newTodoList);
  };

  const onToggleDoneTodoClick = (id) => {
    const newTodoList = todoList.map((element) =>
      element.id === id ? { ...element, isDone: !element.isDone } : element
    );
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
      default:
        alert('can not find todo filter type!');
    }
  }, [todoList, todoType]);

  const updateTodoType = (value) => {
    setTodoType(value);
  };

  const clearTodos = () => {
    setTodoType('all');
    setTodoList([]);
  };

  return {
    filterTodoList,
    onAddTodoClick,
    onEditTodoClick,
    onDeleteTodoClick,
    onToggleDoneTodoClick,
    updateTodoType,
    clearTodos,
  };
}
