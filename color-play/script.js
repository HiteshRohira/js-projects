let playground = document.querySelector("#play-ground");
let plaything = document.body.style.backgroundColor;
let click = false;
playground.addEventListener("mousemove", runEvent);
playground.addEventListener("click", () => {click = true;});

function runEvent (e) {
  if (!click) {
    document.body.style.backgroundColor = `rgb(${e.offsetX}, ${e.offsetY}, 255)`;
  }
  else {
    document.body.style.backgroundColor = "#000";
    document.body.style.color = `rgb(${e.offsetX}, 255, ${e.offsetY})`;
  }
}

function display () {
  document.querySelector("#instruction").textContent = "Click in the box to play with text color";
}

setTimeout(display, 7500);
