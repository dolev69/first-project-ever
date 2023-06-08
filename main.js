let tasks = [];
loadFromLocalStorage()
function addTask() {
    event.preventDefault();
    const taskTextArea = document.getElementById("taskTextArea");
    const dateBox = document.getElementById("dateBox");
    const timeBox = document.getElementById("timeBox");

    const task = {
        task: taskTextArea.value,
        date: dateBox.value,
        time: timeBox.value
    };
    tasks.push(task);
    saveToLocalStorage()

    printTasks()

    taskTextArea.value = "";
    dateBox.value = "";
    timeBox.value = "";
    taskTextArea.focus();
}

function saveToLocalStorage() {
    localStorage.setItem("dolevTasks", JSON.stringify(tasks));
}

function loadFromLocalStorage() {
    const savedTasks = localStorage.getItem("dolevTasks");
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        printTasks();
    }
}

function printTasks() {
    const taskContainer = document.getElementById("taskContainer");
    let html = "";
    for (let i = 0; i < tasks.length; i++) {
        html += `<div class="task">
        <div class="taskArea">Task:<br>${tasks[i].task}</div>
        <div class="timeAndDateArea">${tasks[i].date}<br>${tasks[i].time}</div>
        <div class="x-icon"><button onclick="deleteTask(this)" id="${i}"><i class="bi bi-x-lg"></i></button></div>
    </div>`
    }

    taskContainer.innerHTML = html;
}

function deleteTask(element) {
    const index = element.id;
    console.log(index);
    tasks.splice(index, 1);
    saveToLocalStorage();
    printTasks()
}