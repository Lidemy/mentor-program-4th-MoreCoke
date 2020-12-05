/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-one-expression-per-line */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function TodoItem({
  todo,
  onEditTodoClick,
  onDeleteTodoClick,
  onToggleDoneTodoClick,
}) {
  // 我記得用 prop 當作 component 中 state 並不是好的設計方式，但又不知道除此之外能怎麼做比較好
  const [todoEditInputValue, setTodoEditInputValue] = useState(todo.todo);

  const onEditTodoChange = (e) => {
    setTodoEditInputValue(e.target.value);
  };

  return (
    <li className="list-group-item" data-id={todo.id}>
      <div className="d-flex justify-content-between align-items-baseline">
        <div className="d-flex align-items-baseline">
          <div onClick={() => onToggleDoneTodoClick(todo.id)}>
            <input
              type="checkbox"
              className="mr-2 todo-mark"
              id={todo.id}
              defaultChecked={todo.isDone}
            />
            <label className={todo.isDone ? 'done' : ''} htmlFor={todo.id}>
              {todo.todo}
            </label>
          </div>
          {todo.isEdit && (
            <input
              type="text"
              className="ml-2 form-group"
              name="edit"
              value={todoEditInputValue}
              onChange={onEditTodoChange}
            />
          )}
        </div>
        <div>
          <button
            className="btn btn-warning mr-3"
            type="button"
            onClick={() => onEditTodoClick(todo.id, todoEditInputValue)}
          >
            {todo.isEdit ? '完成編輯' : '編輯'}
          </button>
          <button
            className="btn btn-danger mr-3"
            type="button"
            onClick={() => onDeleteTodoClick(todo.id)}
          >
            刪除
          </button>
        </div>
      </div>
    </li>
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
