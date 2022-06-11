import TodoItem from "./TodoItem";
import React from "react";
import useTodos from "./useTodos";

function App() {
  const {
    todos,
    handleButtonClick,
    handleToggleIsDone,
    handleDeleteTodo,
    value,
    handleChange,
  } = useTodos();

  return (
    <div className="App">
      <input
        type="text"
        placeholder="todo"
        value={value}
        onChange={handleChange}
      />
      <button onClick={handleButtonClick}>Add todo</button>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleDeleteTodo={handleDeleteTodo}
          handleToggleIsDone={handleToggleIsDone}
        />
      ))}
    </div>
  );
}

export default App;
