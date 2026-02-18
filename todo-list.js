let todoList = JSON.parse(localStorage.getItem('list')) || [];

renderTodoList();   

function renderTodoList() {
    let renderHTML = '';

    for (let i = 0; i < todoList.length; i++) {
        const listElement = todoList[i];
        const name = listElement.name;
        const date = listElement.date;

        const html = `
        <div class="name-string ${listElement.completed ? 'completed' : ''}">${name}</div>
        <div class="date-string jsDate">${date}</div>
        <button onclick="
        todoList.splice(${i}, 1);
        renderTodoList();
        " class="delete-button">Delete</button>
        <button class="complete-button" onclick="
            todoList[${i}].completed = !todoList[${i}].completed;
            renderTodoList();
        ">${listElement.completed ? 'Completed!' : 'Complete'}</button>
        `;
       
        renderHTML += html;
    }

    document.querySelector('.delete-grid').innerHTML = renderHTML;
    saveToStorage();
}

function addTodoList() {
    const nameElement = document.querySelector('.js-input-name');
    const nameValue = nameElement.value;

    const dateElement = document.querySelector('.js-input-date');
    const dateValue = dateElement.value;

    todoList.push({
        name: nameValue,
        date: dateValue,
        completed: false
    });

    nameElement.value = '';
     
    renderTodoList();

    saveToStorage();
}

const inputButton = document.querySelector('.js-input');
inputButton.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTodoList();
        const button = document.querySelector('.js-add-button');
        button.innerHTML = 'Added!';

        setTimeout(() => {
            button.innerHTML = 'Add';
        }, 1000);
    }
});

function saveToStorage() {
    localStorage.setItem('list', JSON.stringify(todoList));
}

function added() {
    const button = document.querySelector('.js-add-button');
    button.addEventListener('click', () => {
    button.innerHTML = 'Added!';

    setTimeout(() => {
        button.innerHTML = 'Add';
    }, 1000);
    });
}

added();

document.querySelector('.js-clear-button')
    .addEventListener('click', () => {
        todoList = [];
        saveToStorage();
        renderTodoList();
    });