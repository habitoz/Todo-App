import { repaintDOM, getFromLocalStorage } from './utils.js';

class Todo {
  constructor() {
    this.editTodo = this.editTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.todos = getFromLocalStorage();
    repaintDOM(this.todos, this.editTodo, this.removeTodo);
  }

  addTodo(todo) {
    this.todos.push(todo);
    this.todos = this.todos.map((item, index) => ({ ...item, index: index + 1 }));
    this.saveToLocalStorage();
    repaintDOM(this.todos, this.editTodo, this.removeTodo);
  }

  editTodo(todo) {
    this.todos = this.todos.map((item) => {
      if (item.index === todo.index) item.description = todo.description;
      return item;
    });
    this.saveToLocalStorage();
    repaintDOM(this.todos, this.editTodo, this.removeTodo);
  }

  removeTodo(todo) {
    this.todos = this.todos.filter((item) => item.index !== todo.index);
    this.todos = this.todos.map((item, index) => ({ ...item, index: index + 1 }));
    this.saveToLocalStorage();
    repaintDOM(this.todos, this.editTodo, this.removeTodo);
  }

  saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}

export default Todo;