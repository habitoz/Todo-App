const domContainer = document.getElementById('todo-list');

const createDomList = (todo, editCb, removeCb) => {
  const listElement = document.createElement('li');
  listElement.setAttribute('tabindex', todo.index);
  listElement.setAttribute('draggable', true);
  listElement.classList.add('list-item');
  const todoDescriptionContainer = document.createElement('div');
  const checkboxElement = document.createElement('input');
  const todoDescription = document.createElement('p');
  const todoDescriptionInput = document.createElement('input');
  todoDescriptionInput.setAttribute('value', todo.description);
  todoDescriptionInput.classList.add('hide', 'descriptionInput');
  todoDescriptionContainer.classList.add('todo-description');
  checkboxElement.setAttribute('type', 'checkbox');
  checkboxElement.checked = todo.completed;
  todoDescription.innerHTML = todo.description;
  if (todo.completed) todoDescription.classList.add('completed-todo');

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
  checkboxElement.addEventListener('change', (e) => editCb({ ...todo, completed: e.target.checked }));
  listElement.appendChild(todoDescriptionContainer);
  listElement.appendChild(deleteElement);
  listElement.appendChild(moreElement);

  listElement.addEventListener('dragstart', () => listElement.classList.add('dragging'));
  listElement.addEventListener('dragover', () => listElement.classList.add('dragging'));
  todoDescriptionInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      todo.description = todoDescriptionInput.value;
      editCb(todo);
    }
  });

  return listElement;
};

const observeList = (e, siblings) => {
  e.preventDefault();
  const draggingItem = document.querySelector('.dragging');
  const nextSibling = siblings.find((sibling) => e.clientY <= sibling.offsetTop);
  domContainer.insertBefore(draggingItem, nextSibling);
};

const repaintDOM = (todos, editCb, removeCb) => {
  domContainer.innerHTML = '';
  const childNodes = [];
  todos.forEach((todo) => {
    const listElement = createDomList(todo, editCb, removeCb);
    domContainer.appendChild(listElement);
    childNodes.push(listElement);
  });
  domContainer.addEventListener('dragover', (e) => observeList(e, childNodes));
  domContainer.addEventListener('dragenter', (e) => e.preventDefault());
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