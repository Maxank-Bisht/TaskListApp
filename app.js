const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListensers();

function loadEventListensers() {
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //addTaskEvent
    form.addEventListener('submit', addTask);
    //removeListEvent
    taskList.addEventListener('click', removeTask);
    //clearTasksEvent
    clearBtn.addEventListener('click', clearTasks);
    //filterTaskEvent
    filter.addEventListener('keyup', filterTasks);
}
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) { 
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task) {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
    }); 
}
function addTask(e) { 
    if (taskInput.value === '') {
        alert('Add a task!');
    } else {
        //creat li
        const li = document.createElement('li');
        //add class 
        li.className = 'collection-item';
        //add the text to li
        li.appendChild(document.createTextNode(taskInput.value));
        //create the link for remove bttn
        const link = document.createElement('a');
        //add class to link
        link.className = 'delete-item secondary-content';
        //add remove bttn class
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //append link to li
        li.appendChild(link);
        //append li to ul
        taskList.appendChild(li);
        
        //add data to Localstorage
        addToLocalStorage(taskInput.value);
        
        //clear input
        taskInput.value = '';
    }
    e.preventDefault();
}
//Store Task input
function addToLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) { 
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();
            removeItemFromLS(e.target.parentElement.parentElement);
            
        }
    }
}
function removeItemFromLS(taskItem) { 
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task,index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function clearTasks(){
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    // Alternative
    // taskList.innerHTML = '';
    clearTasksfromLS();
}
function clearTasksfromLS() {
    localStorage.clear();
}
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;

        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}