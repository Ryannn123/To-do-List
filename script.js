const taskInput = document.querySelector('.todo-input')
const submitBtn = document.querySelector('.todo-form button')
const todoLists = document.querySelector('.todo-lists')
const todoDoneLists = document.querySelector('.todo-done-lists')
const claerAllBtn = document.querySelector('.clear-all-btn')

let tasks = JSON.parse(localStorage.getItem('tasks')) || []
let doneTasks = JSON.parse(localStorage.getItem('doneTasks')) || []

renderTaskListsHTML()

submitBtn.addEventListener('click', () => {
    event.preventDefault()
    
    if (taskInput.value.trim().length > 0) {
        const taskData = {
            name: taskInput.value,
            id: Date.now(),
            done: false
        }
        tasks.push(taskData)
        saveToStorage()

        renderTaskListsHTML()
    }

    taskInput.value = ''
})

claerAllBtn.addEventListener('click', () => {
    doneTasks = []
    saveToStorage()

    renderTaskListsHTML()
})

function deleteTask() {
    const id = event.target.parentElement.dataset.id
    removeFromLists(tasks, id)
    removeFromLists(doneTasks, id)
    saveToStorage()
}

function doneTask() {
    const id = event.target.parentElement.dataset.id
    const allTasks = [...tasks, ...doneTasks]
    
    allTasks.forEach(task => {
        if (task.id == id) {
            if (task.done == false) {
                task.done = true
                doneTasks.push(task)
                removeFromLists(tasks, id)
            } else {
                task.done = false
                tasks.push(task)
                removeFromLists(doneTasks, id)
            }
        }
    })
    saveToStorage()
}

function removeFromLists(lists, id) {
    lists.forEach((task, i) => {
        if (task.id == id) {
            lists.splice(i, 1)
        }
    })

    renderTaskListsHTML()
}

function renderTaskListsHTML() {
    todoLists.innerHTML = ''
    todoDoneLists.innerHTML = ''

    tasks.forEach(task => {
        const {name, id} = task
        todoLists.innerHTML += `
            <li data-id=${id}>
                <span class="task-name">${name}</span>
                <button class="delete-btn" onclick="deleteTask()">Delete</button>
                <input type="checkbox" class="done-btn" onclick="doneTask()">
            </li>
        `
    })

    doneTasks.forEach(task => {
        const {name, id} = task
        todoDoneLists.innerHTML += `
            <li data-id=${id}>
                <span class="task-name">${name}</span>
                <button class="delete-btn" onclick="deleteTask()">Delete</button>
                <input type="checkbox" class="done-btn" onclick="doneTask()" checked>
            </li>
        `
    })

    document.title = tasks.length > 0 ?
    `To-do List (${tasks.length})` :
    'To-do List'

    claerAllBtn.style.display = doneTasks.length > 0 ? 'block' : 'none'
}

function saveToStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
    localStorage.setItem('doneTasks', JSON.stringify(doneTasks))
}