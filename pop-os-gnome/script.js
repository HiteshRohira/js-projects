// For Date and Time in top panel
let date = new Date();
let dateTime = document.querySelector("#date-time");
let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let hours = date.getHours();
let amPm = "AM";

if (hours > 12) {
	hours -= 12;
	amPm = "PM";
}

dateTime.textContent = `${weekDays[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()}  	${hours}: ${date.getMinutes()} ${amPm}`;

// Dash autohide
let dash = document.querySelector("#dash");
// dash.style.display = "none";