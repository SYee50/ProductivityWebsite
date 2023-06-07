// To-Do List Functionality

// add new task
const addTask = (e) => {
    e.preventDefault();

    // get task from input
    const inputEle = document.getElementById("new-task");
    const taskInput = inputEle.value;

    // create element for task
    let taskEle = document.createElement("div");

    // taskEle.setAttribute("value", taskInput);
    let checkBox = `<input type="checkbox" onclick="completeTask(this)"></input>`;
    let pEle = `<p class="task-item">${taskInput}</p>`
    let deleteBtn = `<button onclick="delTask(this)" class="list-btn"> Delete </button>`;
    let editBtn = `<button class="list-btn" onclick="editTask(this)"> Edit </button>`;
    let htmlContent = `${checkBox}${pEle}${deleteBtn}${editBtn}`;
    taskEle.innerHTML = htmlContent;

    // append new element to to-do list div
    if (taskInput === "") {
        // let user know that they must type in an input
        alert("You must type in an input!")
    } else {
        const toDoListDiv = document.querySelector("#to-do-list");
        toDoListDiv.appendChild(taskEle);
    }

    // remove text from input box
    inputEle.value = "";
};

const addBttn = document.getElementById("add-bttn");
addBttn.addEventListener("click", addTask);

// Delete task function
const delTask = (element) => {
    // element = this keyword in html
    // removes parent element of delete button
    element.parentElement.remove();
};

// Cross-off completed task
const completeTask = (element) => {
    // toggle (present -> remove / not present -> add)
    element.parentElement.children[1].classList.toggle("complete");
};

// Edit task
const editTask = (element) => {
    // save orginal element
    const divElement = element.parentElement;
    // get child nodes
    let childNodes = divElement.children;
    // get p element text
    let pText = childNodes[1].innerText;
    console.log(pText);

    // replace p with an input box
    let firstChild = divElement.firstChild;
    let newInput = document.createElement("input");
    // display original task in input box
    newInput.setAttribute("value", `${pText}`);
    newInput.setAttribute("ondblclick", "editComplete(this)");
    newInput.setAttribute("class", "edit-input");
    newInput.setAttribute("id", `${pText}`);
    divElement.insertBefore(newInput, firstChild.nextSibling);
    divElement.removeChild(childNodes[2]);
};

// edit complete - when use double clicks input box
const editComplete = (element) => {
    // save original task in case input is empty
    let originalTask = element.getAttribute("id");
    // get parent element
    const divElement = element.parentElement;
    // get child elements
    let childNodes = divElement.children;
    // get editted task
    let newTask = element.value;
    console.log(newTask);

    // let user know that they must type in an input
    // retain original task if input is empty
    if (newTask === "") {
        alert("You must type in a new task!")
        newTask = originalTask;
    };

    // replace input with new p if new text is entered
    let firstChild = divElement.firstChild;
    let newP = document.createElement("p");
    newP.innerText = newTask;
    newP.setAttribute("class", "task-item");
    divElement.insertBefore(newP, firstChild.nextSibling);
    divElement.removeChild(childNodes[2]);
};