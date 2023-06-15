const createDomList = (todo) => {
  const listElement = document.createElement('li');
  listElement.classList.add('list-item');
  const todoDescriptionContainer = document.createElement('div');
  const checkboxElement = document.createElement('input');
  const todoDescription = document.createElement('p');
  todoDescriptionContainer.classList.add('todo-description');
  checkboxElement.setAttribute('type', 'checkbox');
  checkboxElement.setAttribute('value', todo.completed);
  todoDescription.innerHTML = todo.description;
  todoDescriptionContainer.appendChild(checkboxElement);
  todoDescriptionContainer.appendChild(todoDescription);

  const moreElement = document.createElement('i');
  const deleteElement = document.createElement('i');
  moreElement.classList.add('fa-solid', 'fa-ellipsis-vertical', 'icon', 'show');
  deleteElement.classList.add('fa', 'fa-trash', 'icon', 'delete-icon', 'hide');

  listElement.appendChild(todoDescriptionContainer);
  listElement.appendChild(deleteElement);
  listElement.appendChild(moreElement);
  return listElement;
};

export default createDomList;