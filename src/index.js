import './style.css';
import todos from './scripts/staticData.js';
import createDomList from './scripts/utils.js';
const listContainer = document.getElementById('todo-list');

todos.forEach((todo) => {
    const todoListElement= createDomList(todo);
    listContainer.appendChild(todoListElement);
})