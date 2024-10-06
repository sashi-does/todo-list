let inputEl = document.getElementById("inputEl");
let addBtn = document.getElementById("addBtn");
let saveBtn = document.getElementById("saveBtn");
let listContainer = document.getElementById("listContainer");
let fromLocalStorage = localStorage.getItem("todoList");
let showcase = document.getElementById("showcase");
let todoList = [];
let spinner = document.getElementById('spinner');
let savedStatus = document.getElementById("savedStatus");
let spinner2 = document.getElementById('spinner2');
let addStatus = document.getElementById('status');
let error = document.getElementById("errorMsg");
addStatus.textContent = "";

if (fromLocalStorage !== null) {
    todoList = JSON.parse(localStorage.getItem("todoList"));
}

let count = todoList.length;

function deleteTodo(todoId) {
    savedStatus.textContent = "";
    let todoEl = document.getElementById(todoId);
    let index = todoList.findIndex(function(eachItem) {
        if ("todo" + eachItem.uniqueNo === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(index, 1);
    listContainer.removeChild(todoEl);
}

function changeStatus(labelId, divId, todoId, checkboxId) {
    let label = document.getElementById(labelId);
    // let checkbox = document.getElementById(checkboxId);
    let divEl = document.getElementById(divId);
    let index = todoList.findIndex(function(eachItem) {
        if (todoId === 'todo' + eachItem.uniqueNo) {
            return true;
        } else {
            return false;
        }
    });
    let arrayObject = todoList[index];
    if (arrayObject.isChecked === false) {
        arrayObject.isChecked = true;
    } else {
        arrayObject.isChecked = false;
    }

    label.classList.toggle('completed');
    divEl.classList.toggle('task-completed');
}

function createAndAppend(newTodo) {
    inputEl.value = "";
    let listItem = document.createElement("li");
    let todoId = "todo" + newTodo.uniqueNo;
    listItem.id = todoId;
    let checkbox = document.createElement("input");
    let checkboxId = 'checkbox' + newTodo.uniqueNo;
    checkbox.id = checkboxId;
    let label = document.createElement("label");
    let labelId = 'label' + newTodo.uniqueNo;
    label.id = labelId;
    label.setAttribute('for', checkboxId);
    let deleteIcon = document.createElement("i");
    let divItem = document.createElement("div");
    let divId = 'div' + newTodo.uniqueNo;
    divItem.id = divId;

    listItem.classList.add("d-flex", "flex-row");
    label.textContent = newTodo.task;
    checkbox.type = 'checkbox';
    checkbox.checked = newTodo.isChecked;
    if (checkbox.checked === true) {
        label.classList.add('completed');
        divItem.classList.add('task-completed');
    } else {
        label.classList.remove('completed');
        divItem.classList.remove('task-completed');
    }
    divItem.classList.add('label');
    divItem.classList.add("d-flex", "flex-row");
    deleteIcon.classList.add("fa-solid", "fa-trash", "trash");
    checkbox.classList.add("checkbox");
    label.classList.add('w-100');
    label.style.height = 30 + "px";
    listItem.classList.add("mt-4");

    deleteIcon.addEventListener("click", function() {
        deleteTodo(todoId);
    });

    checkbox.onclick = function() {
        changeStatus(labelId, divId, todoId, checkboxId);
    };
    spinner2.classList.add('d-none');
    listContainer.appendChild(listItem);
    listItem.appendChild(checkbox);
    listItem.appendChild(divItem);
    divItem.appendChild(label);
    divItem.appendChild(deleteIcon);
}

addBtn.addEventListener("click", function() {
    if (inputEl.value === "") {
        error.textContent = "Please enter a valid input!!!";
        return;
    } else {
        error.textContent = "";
    }
    addStatus.textContent = "";
    spinner2.classList.remove('d-none');
    setTimeout(function() {
        let inputElValue = inputEl.value;
        count += 1;
        let newTodo = {
            task: inputElValue,
            uniqueNo: count,
            isChecked: false
        };
        todoList.push(newTodo);
        createAndAppend(newTodo);
        addStatus.textContent = "Added Successfully!!";
        setTimeout(function() {
            addStatus.textContent = "";
        }, 1200);
    }, 1000);
});

saveBtn.addEventListener("click", function() {
    savedStatus.textContent = "";
    localStorage.setItem("todoList", JSON.stringify(todoList));
    spinner.classList.remove('d-none');
    setTimeout(function() {
        spinner.classList.add('d-none');
    }, 1500);
    setTimeout(function() {
        savedStatus.textContent = "Saved Successfully";
    }, 1505);
    setTimeout(function() {
        savedStatus.textContent = "Happy Learning!!";
    }, 2507);
});
for (let eachItem of todoList) {
    createAndAppend(eachItem);
}

if (todoList.length === 0) {
    showcase.textContent = "Add your tasks to track your learning"
} else {
    showcase.textContent = "";
}