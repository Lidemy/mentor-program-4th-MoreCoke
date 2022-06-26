/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-one-expression-per-line */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import {
  TodoItemWrapper,
  TodoItemContent,
  TodoItemCheckbox,
  TodoItemEditInput,
  TodoItemLabel,
  TodoItemButtons,
} from 'views/TodoList/components/TodoItem/style';
import { WarningButton, DangerButton } from 'components/Button';

export default function TodoItem({
  todo,
  onEditTodoClick,
  onDeleteTodoClick,
  onToggleDoneTodoClick,
}) {
  const [todoEditInputValue, setTodoEditInputValue] = useState(todo.todo);
  const dispatch = useDispatch();

  const onEditTodoChange = (e) => {
    setTodoEditInputValue(e.target.value);
  };

  return (
    <TodoItemWrapper>
      <div className="d-flex align-items-baseline">
        <TodoItemContent onClick={() => dispatch(onToggleDoneTodoClick(todo.id))}>
          {/* 練習用 styled-component attr */}
          <TodoItemCheckbox defaultChecked={todo.isDone} id={todo.id} />
          <TodoItemLabel htmlFor={todo.id}>{todo.todo}</TodoItemLabel>
        </TodoItemContent>
        {todo.isEdit && (
          // 不透過 attr 直接傳 input 也行
          <TodoItemEditInput
            type="text"
            value={todoEditInputValue}
            onChange={onEditTodoChange}
          />
        )}
      </div>

      <TodoItemButtons>
        <WarningButton
          onClick={() => dispatch(onEditTodoClick({id: todo.id, todo: todoEditInputValue}))}
        >
          {todo.isEdit ? '完成編輯' : '編輯'}
        </WarningButton>
        <DangerButton onClick={() => dispatch(onDeleteTodoClick(todo.id))}>
          刪除
        </DangerButton>
      </TodoItemButtons>
    </TodoItemWrapper>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    todo: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired,
    isEdit: PropTypes.bool.isRequired,
  }),
  onEditTodoClick: PropTypes.func,
  onDeleteTodoClick: PropTypes.func,
  onToggleDoneTodoClick: PropTypes.func,
};
