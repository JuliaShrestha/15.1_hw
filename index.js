/*
Доробити TODO лист, в якому буде можливість:

Додати завдання
Видалити завдання
Відзначити як виконану
Усі дані повинні зберегтися після перезавантаження сторінки.
*/

const input = document.querySelector('#input');
const addTaskButton = document.querySelector('#add-task-btn');
const taskList = document.querySelector('#task-list');



function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.todo-item').forEach(item => {
        const taskText = item.querySelector('.todo-item__description').innerText;
        const isChecked = item.querySelector('input[type="checkbox"]').checked;
        tasks.push({ text: taskText, checked: isChecked });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const newTask = document.createElement('li');
        newTask.classList.add('todo-item');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.checked;

        const span = document.createElement('span');
        span.classList.add('todo-item__description');
        span.innerText = task.text;

        const newDeleteButton = document.createElement('button');
        newDeleteButton.innerText = 'Видалити';
        newDeleteButton.classList.add('todo-item__delete');

        newTask.appendChild(checkbox);
        newTask.appendChild(span);
        newTask.appendChild(newDeleteButton);

        taskList.appendChild(newTask);

        checkbox.addEventListener('change', handleCheckboxChange);
    });
}

function handleCheckboxChange(event) {
    const checkbox = event.target;
    const listItem = checkbox.closest('.todo-item');
    listItem.classList.toggle('todo-item--checked', checkbox.checked);
    saveTasks();
}

document.addEventListener('DOMContentLoaded', loadTasks);

addTaskButton.addEventListener('click', () => {
    const taskText = input.value;

    if(taskText.trim() ==='') { 
        return;
    }

    const newTask = document.createElement('li');
    newTask.classList.add('todo-item');
        
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const span = document.createElement('span');
    span.classList.add('todo-item__description');
    span.innerText = taskText;

    const newDeleteButton = document.createElement('button');
    newDeleteButton.innerText = 'Видалити';
    newDeleteButton.classList.add('todo-item__delete');

    newTask.appendChild(checkbox);
    newTask.appendChild(span);
    newTask.appendChild(newDeleteButton);

    taskList.appendChild(newTask);

    checkbox.addEventListener('change', handleCheckboxChange);

    saveTasks();

    input.value = '';
});

taskList.addEventListener('click', (event) => {
    if(event.target && event.target.matches('.todo-item__delete')) {
        const listItem = event.target.closest('.todo-item');
        if(listItem) {
            listItem.remove();
            saveTasks();
        }
    }
});