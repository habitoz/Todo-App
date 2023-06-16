const domContainer = document.getElementById('todo-list');

const createDomList = (todo, editCb, removeCb) => {
  const listElement = document.createElement('li');
  listElement.setAttribute('tabindex', todo.index);
  listElement.classList.add('list-item');
  const todoDescriptionContainer = document.createElement('div');
  const checkboxElement = document.createElement('input');
  const todoDescription = document.createElement('p');
  const todoDescriptionInput = document.createElement('input');
  todoDescriptionInput.setAttribute('value', todo.description);
  todoDescriptionInput.classList.add('hide', 'descriptionInput');
  todoDescriptionContainer.classList.add('todo-description');
  checkboxElement.setAttribute('type', 'checkbox');
  checkboxElement.setAttribute('value', todo.completed);
  todoDescription.innerHTML = todo.description;

  todoDescriptionContainer.appendChild(checkboxElement);
  todoDescriptionContainer.appendChild(todoDescription);
  todoDescriptionContainer.appendChild(todoDescriptionInput);
  const moreElement = document.createElement('i');
  const deleteElement = document.createElement('i');
  moreElement.classList.add('fa-solid', 'fa-ellipsis-vertical', 'icon', 'show');
  deleteElement.classList.add('fa', 'fa-trash', 'icon', 'delete-icon', 'hide');
  deleteElement.addEventListener('click', () => {
    removeCb(todo);
  });

  todoDescriptionContainer.addEventListener('click', () => {
    todoDescription.classList.add('hide');
    listElement.classList.add('highlight-todo');
    todoDescriptionInput.classList.remove('hide');
    todoDescriptionInput.classList.add('show');
    deleteElement.classList.remove('hide');
    deleteElement.classList.remove('show');
    moreElement.classList.remove('show');
    moreElement.classList.add('hide');
    listElement.focus();
    todoDescriptionInput.focus();
  });

  listElement.appendChild(todoDescriptionContainer);
  listElement.appendChild(deleteElement);
  listElement.appendChild(moreElement);

  todoDescriptionInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      todo.description = todoDescriptionInput.value;
      editCb(todo);
    }
  });

  return listElement;
};

const repaintDOM = (todos, editCb, removeCb) => {
  domContainer.innerHTML = '';
  todos.forEach((todo) => {
    domContainer.appendChild(createDomList(todo, editCb, removeCb));
  });
};
const getFromLocalStorage = () => {
  const todo = localStorage.getItem('todos');
  return todo ? JSON.parse(todo) : [];
};

export {
  createDomList,
  repaintDOM,
  getFromLocalStorage,
};