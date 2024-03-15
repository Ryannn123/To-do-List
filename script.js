const taskInput = document.querySelector('.todo-input')
const submitBtn = document.querySelector('.todo-form button')
const todoLists = document.querySelector('.todo-lists')

let tasks = []

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
    
    const newTask = tasks.filter(task => {
        return task.id != id
    })

    tasks = newTask
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
                <input type="checkbox" class="done-btn">
            </li>
        `
    })
}