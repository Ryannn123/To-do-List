const taskInput = document.querySelector('.todo-input')
const submitBtn = document.querySelector('.todo-form button')
const todoLists = document.querySelector('.todo-lists')
const todoDoneLists = document.querySelector('.todo-done-lists')

let tasks = [{
    name: 'Task 1',
    id: 123,
    done: false
}]
let doneTasks = []

renderTaskListsHTML()

submitBtn.addEventListener('click', () => {
    event.preventDefault()
    
    if (taskInput.value != '') {
        const taskData = {
            name: taskInput.value,
            id: Date.now(),
            done: false
        }
        tasks.push(taskData)

        renderTaskListsHTML()
    }

    taskInput.value = ''
})

function deleteTask() {
    const id = event.target.parentElement.dataset.id
    removeFromLists(tasks, id)
    removeFromLists(doneTasks, id)
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
}