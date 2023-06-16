import './style.css';
import Todo from './scripts/todoClass.js';

const todoInput = document.getElementById('todo-input');
const clearAllBtn = document.getElementById('clearAll');

const todoList = new Todo();

todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();

    todoList.addTodo({
      completed: false,
      index: todoList.todos.length + 1,
      description: todoInput.value,
    });
    todoInput.value = '';
  }
});

clearAllBtn.addEventListener('click', (e) => {
  e.preventDefault();
  todoList.clearAllCompleted();
});
