let taskInput = document.querySelector("#task-input");
let button = document.querySelector("button");
let taskList = document.querySelector("#tasks-list");

function addTask() {
  taskInput.value

  let task = document.createElement("span");
  let taskText = document.createElement("p");
  let taskBtn = document.createElement("button");

  taskText.textContent = taskInput.value;
  taskBtn.textContent = "X";

  task.appendChild(taskText);
  task.appendChild(taskBtn);

  taskBtn.addEventListener("click", () => task.remove());

  taskList.appendChild(task);
}

button.addEventListener("click", () => addTask());