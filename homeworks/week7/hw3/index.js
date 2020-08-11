function addTodo(e) {
  if (e.keyCode === 13) {
    const todoAdd = document.querySelector('.todo-add');
    if (!todoAdd.value) return;
    const todoList = document.querySelector('.todo-list');
    const li = document.createElement('li');
    const id = new Date().valueOf();
    li.className = 'todo-item';
    li.id = id;
    li.innerHTML = `<label>
    <input type="checkbox">${todoAdd.value}
  </label>
  <span class="todo-item__del">X</span>`;
    todoAdd.value = '';
    todoList.appendChild(li);
  }
}


function clickTodo(e) {
  const { target } = e;
  const isChecked = target.checked;
  const isDelete = target.classList.contains('todo-item__del');
  const todoItem = target.parentNode;
  const label = target.parentNode;
  // 點選刪除時
  if (isDelete) {
    todoItem.remove();
    return;
  }
  // 點選完成時
  if (isChecked) {
    label.classList.add('done');
  } else {
    label.classList.remove('done');
  }
}

const todo = document.querySelector('.todo');

todo.addEventListener('keydown', addTodo);
todo.addEventListener('click', clickTodo);
