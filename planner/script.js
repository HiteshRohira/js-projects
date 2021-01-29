// DOM Elements
const taskInput = document.querySelector(".input");
const taskSubmit = document.querySelector(".task-submit");
const yearSelector = document.querySelector("#year-selector");
const monthSelector = document.querySelector("#month-selector");

// We setup a central place to hold the current date in here.

let fullDateToday = new Date();

let currentYear = fullDateToday.getFullYear();
let currentMonth = fullDateToday.getMonth();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

yearSelector.value = currentYear;
monthSelector.value = currentMonth;

// Fill table function to start here

let firstOfCurrentMonth = new Date(currentYear, currentMonth);

// Calculating the first sunday date to be displayed
let startDate = new Date( firstOfCurrentMonth - (firstOfCurrentMonth.getDay() * 24 * 60 * 60 * 1000) );

fillTable(startDate);

function fillTable(iteratedDate) {
	for (let i = 0; i < 6; i++) {
		let tableRow = document.createElement("tr");
		tableRow.className = "date-row";
		
		const tableBody = document.querySelector("tbody");
	
		for (let j = 0; j < 7; j++) {
	
			let tableCell = document.createElement("td");
			tableCell.classList.add("has-text-centered", "is-size-3", "is-clickable");
	
			let iteratedMonth = iteratedDate.getMonth() + 1;
			let iteratedMonthString = (iteratedMonth < 10) ? `0${iteratedMonth}` : `${iteratedMonth}`;

			let iteratedDateOfMonth = (iteratedDate.getDate() < 10) ? `0${iteratedDate.getDate()}` : `${iteratedDate.getDate()}`;
	
			tableCell.id = `${ iteratedDate.getFullYear() }-${ iteratedMonthString }-${ iteratedDateOfMonth }`;
			tableCell.textContent = iteratedDateOfMonth;
	
			tableCell.addEventListener("click", openModal);

			if ((new Date (tableCell.id).getMonth()) != monthSelector.value) {
				tableCell.classList.add("has-text-grey");
			}

			// console.log(new Date (tableCell.id).getMonth());
			// console.log(currentMonth);
	
			if (localStorage.getItem(tableCell.id)) {
				let numberOfTasks = localStorage.getItem(tableCell.id).split(",").length;
	
				let alertTag = tasksAlert(numberOfTasks, tableCell.id);
	
				tableCell.appendChild(alertTag);
			}
			
			tableRow.appendChild(tableCell);
			iteratedDate.setDate(iteratedDate.getDate() + 1);
	
		}
	
		tableBody.appendChild(tableRow);
	}
}

// Modal opening

const modal = document.querySelector(".modal");
const modalBackground = document.querySelector(".modal-background");
const modalClose = document.querySelector(".modal-close");


// Open Modal
function openModal(e) {

	let targetDate = new Date( Date.parse(e.target.id) );
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	
	const dateTemplate = `
	<h3 class="is-size-4">${days[targetDate.getDay()]}</h3>
	<h3 class="is-size-2 has-text-weight-medium">${months[targetDate.getMonth()]} ${targetDate.getDate()} ${targetDate.getFullYear()}</h3>
	`;

	taskSubmit.id = e.target.id;
	modalBackground.id = e.target.id;
	modalClose.id = e.target.id;

	const dateTemplateContainer = document.querySelector(".date-template-container");
	dateTemplateContainer.innerHTML = dateTemplate;
	modal.classList.add("is-active");

	showTasks(e.target.id);

}

// Modal closing
function closeModal(e) {
	modal.classList.remove("is-active");
	const tagList = document.querySelectorAll(".tag");

	for (let tag of tagList) {
		if (tag.id === e.target.id) {
			tag.textContent = localStorage.getItem(e.target.id).split(",").length;
		}
	}
	
}

modalBackground.addEventListener("click", closeModal);
modalClose.addEventListener("click", closeModal);

// Functionality for submitting task
taskSubmit.addEventListener("click", addTask);

function addTask(e) {

	if (!localStorage.getItem(e.target.id)) {
		localStorage.setItem(e.target.id, taskInput.value);
	} else {
		localStorage.setItem(e.target.id, `${localStorage.getItem(e.target.id)},${taskInput.value}`);
	}

	showTasks(e.target.id);
	
	taskInput.value = "";
}


// Show tasks function
function showTasks (date) {

	const imageContainer = document.querySelector(".content");

	if (!localStorage.getItem(date)) {
		
		imageContainer.innerHTML = `
		<img src="./not-found.svg" class="not-found" alt="No Tasks Found">
		<h3 class="has-text-weight-normal is-family-secondary has-text-centered">No tasks found</h3>
		`;

	} else {

		imageContainer.innerHTML = `<ul id="task-list"></ul>`;
		const taskList = document.querySelector("#task-list");

		let taskArray = localStorage.getItem(date).split(",");

		for ( let taskElement of taskArray ) {

			const taskItem = document.createElement("li");
			taskItem.classList.add("is-size-4");
			taskItem.textContent = taskElement;

			const taskDeleteBtn = document.createElement("button");
			taskDeleteBtn.classList.add("button", "is-danger", "is-light", "is-pulled-right");
			taskDeleteBtn.addEventListener("click", (e) => {

				let unfilteredTasks = localStorage.getItem(date).split(",");

				if (unfilteredTasks.length === 1) {
					localStorage.removeItem(date);
				} else {
					let filteredTasks = unfilteredTasks.filter(task => task !== taskItem.textContent);
					let newTaskList = filteredTasks.join();
					localStorage.setItem(date, newTaskList);
				}

				taskItem.remove();
			});

			const deleteIcon = document.createElement("i");
			deleteIcon.classList.add("fas", "fa-trash-alt");

			taskDeleteBtn.appendChild(deleteIcon);
			taskItem.appendChild(taskDeleteBtn);
			taskList.appendChild(taskItem);

		}

	}

}

function tasksAlert(n, alertId) {
	const tag = document.createElement("span");
	tag.classList.add("tag", "is-pulled-right", "is-danger", "is-light", "is-rounded");
	tag.textContent = n;
	tag.id = alertId;

	tag.addEventListener("click", (e) => {
		openModal(e);
	});

	return tag;
}

// Bottom select and arrow functionality
// const leftBtn = document.querySelector("#left-btn");
// const rightBtn = document.querySelector("#right-btn");

// leftBtn.addEventListener("click", () => {
	
// 	const dateRows = document.querySelectorAll(".date-row");

// 	for(let dateRow of dateRows) {
// 		dateRow.remove();
// 	}
// 	monthSelector.value = 9;
// 	console.log(monthSelector.value);

// 	if (monthSelector.value == 0) {
// 		console.log(monthSelector.value);
// 		monthSelector.value = 8;
// 		console.log(monthSelector.value);
// 	} else {
// 		monthSelector.value -= 1;
// 	}

// 	firstOfCurrentMonth = new Date(yearSelector.value, monthSelector.value);
	
// 	startDate = new Date( firstOfCurrentMonth - (firstOfCurrentMonth.getDay() * 24 * 60 * 60 * 1000) );

// 	fillTable(startDate);
// });

// rightBtn.addEventListener("click", () => {
// 	monthSelector.value++;
// });

monthSelector.onchange = handleDateChange;
yearSelector.onchange = handleDateChange;

function handleDateChange() {

	const dateRows = document.querySelectorAll(".date-row");

	for(let dateRow of dateRows) {
		dateRow.remove();
	}

	firstOfCurrentMonth = new Date(yearSelector.value, monthSelector.value);
	startDate = new Date( firstOfCurrentMonth - (firstOfCurrentMonth.getDay() * 24 * 60 * 60 * 1000) );

	fillTable(startDate);
}


