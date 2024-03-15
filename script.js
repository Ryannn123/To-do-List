const taskInput = document.querySelector('.todo-input')
const submitBtn = document.querySelector('.todo-form button')
const todoLists = document.querySelector('.todo-lists')

let tasks = [{
    name: 'Task 1',
    id: 123,
    done: false
}]
let doneTasks = []

if (tasks.length > 0) {
    renderTaskListsHTML()
}

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
}

function doneTask() {
    const id = event.target.parentElement.dataset.id
    
    tasks.forEach(task => {
        if (task.id == id) {
            if (task.done = false) {
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
    const newTask = lists.filter(task => {
        return task.id != id
    })

    lists = newTask
    renderTaskListsHTML()
}

function renderTaskListsHTML() {
    todoLists.innerHTML = ''

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
}