/* eslint-disable arrow-parens */
/* eslint-disable react/jsx-one-expression-per-line */

import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Container, FilterButtons, List } from './style';
import TodoItem from './components/TodoItem';
import TodoAddBar from './components/TodoAddBar';
import {
  PrimaryButton,
  SuccessButton,
  InfoButton,
  DangerButton,
} from '../../components/Button';
import {
  add,
  edit,
  del,
  toggleDone,
  reset,
  updateType
} from '../../todoSlice';

function TodoList() {
  const todos = useSelector(state => state.todo.todoList);
  const todoType = useSelector(state => state.todo.todoType);
  const dispatch = useDispatch();

  const filterTodoList = useMemo(() => {
    switch (todoType) {
      case 'all':
        return todos;
      case 'done':
        return todos.filter((element) => element.isDone);
      case 'undone':
        return todos.filter((element) => !element.isDone);
      default:
        alert('can not find todo filter type!');
    }
  }, [todos, todoType]);

  return (
    <Container>
      <TodoAddBar onClick={add} />
      <FilterButtons>
        <PrimaryButton onClick={() => dispatch(updateType('all'))}>
          全部任務
        </PrimaryButton>
        <SuccessButton onClick={() => dispatch(updateType('done'))}>
          已完成
        </SuccessButton>
        <InfoButton onClick={() => dispatch(updateType('undone'))}>未完成</InfoButton>
        <DangerButton onClick={() => dispatch(reset())}>刪除全部</DangerButton>
      </FilterButtons>
      <List>
        {filterTodoList.map((element) => (
          <TodoItem
            todo={element}
            key={element.id}
            onEditTodoClick={edit}
            onDeleteTodoClick={del}
            onToggleDoneTodoClick={toggleDone}
          />
        ))}
      </List>
    </Container>
  );
}

export default TodoList;
