/* eslint-disable arrow-parens */
/* eslint-disable react/jsx-one-expression-per-line */

import React from 'react';

import { Container, FilterButtons, List } from 'views/TodoList/style';
import TodoItem from 'views/TodoList/components/TodoItem';
import TodoAddBar from 'views/TodoList/components/TodoAddBar';
import {
  PrimaryButton,
  SuccessButton,
  InfoButton,
  DangerButton,
} from 'components/Button';
import useTodo from 'hooks/useTodo';

function TodoList() {
  const {
    filterTodoList,
    onAddTodoClick,
    onEditTodoClick,
    onDeleteTodoClick,
    onToggleDoneTodoClick,
    updateTodoType,
    clearTodos,
  } = useTodo();
  return (
    <Container>
      <TodoAddBar onClick={onAddTodoClick} />
      <FilterButtons>
        <PrimaryButton onClick={() => updateTodoType('all')}>
          全部任務
        </PrimaryButton>
        <SuccessButton onClick={() => updateTodoType('done')}>
          已完成
        </SuccessButton>
        <InfoButton onClick={() => updateTodoType('undone')}>未完成</InfoButton>
        <DangerButton onClick={clearTodos}>刪除全部</DangerButton>
      </FilterButtons>
      <List>
        {filterTodoList.map((element) => (
          <TodoItem
            todo={element}
            key={element.id}
            onEditTodoClick={onEditTodoClick}
            onDeleteTodoClick={onDeleteTodoClick}
            onToggleDoneTodoClick={onToggleDoneTodoClick}
          />
        ))}
      </List>
    </Container>
  );
}

export default TodoList;
