var _ = require('lodash');

//console.log(_)
let array = [1,2,3,4,5,6,7,8];
console.log('answer ', _.without(array,3));
let css = document.querySelector("h3");
let color1 = document.querySelector(".color1");
let color2 = document.querySelector(".color2");
let body = document.getElementById("gradient");
let rButton = document.querySelector(".randomButton");
let addColorBtn = document.getElementById("addColorBtn");							
let colorDivContainer = document.getElementById("colorDiv");
let gradientDirection = document.getElementById("direction")

color1.addEventListener("input", changeColor);
color2.addEventListener("input", changeColor);
rButton.addEventListener("click", generateRandomColor);
addColorBtn.addEventListener("click", addNewColor);
colorDivContainer.addEventListener("click", deleteColor);
colorDivContainer.addEventListener("input", changeColor);
window.addEventListener("DOMContentLoaded", changeColor);
gradientDirection.addEventListener("change",changeColor);

let colorID = 3;

function changeColor(){

    let colorSelectors = document.querySelectorAll("input[type='color']");
    let colors = Array.from(colorSelectors).map(input => input.value); // Extract color values
 	let direction = getDirection();
    let finalLinearColor = `linear-gradient(${direction}, ${colors.join(", ")})`;

    body.style.background = finalLinearColor;
    css.textContent = body.style.background + ";";
}

function randomHexColorGenerator() {
	return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
}

function getDirection() {
	let direction = document.getElementById("direction");
	return direction.value;
}

function generateRandomColor(){

	let colorSelectors = document.querySelectorAll("input[type='color']");
    let colors = Array.from(colorSelectors).map(input => randomHexColorGenerator());
    let direction = getDirection();
    colorSelectors.forEach((selector,i) => selector.value = colors[i]);

    let finalLinearColor = `linear-gradient(${direction}, ${colors.join(", ")})`;

	body.style.background = finalLinearColor;
	css.textContent = body.style.background + ";";
}

function addNewColor() {
	
	const maxColor = 7

	if (colorID <= maxColor) {
		let newColorDiv = document.createElement("div");
		let newColorInput = document.createElement("input");
		let xBtn = document.createElement("button");

		newColorDiv.classList = "colorGroup";
		newColorInput.classList.add("color" + colorID);
		newColorInput.type = "color";
		newColorInput.value = "#00ff00";
		newColorInput.id = "color0" + colorID;
		newColorDiv.appendChild(newColorInput);

		xBtn.classList.add("exitBtn");
		xBtn.textContent = "X";
		newColorDiv.appendChild(xBtn);

		colorDivContainer.appendChild(newColorDiv);
		colorID++;
		changeColor();
	}
	else {
		alert(`The max number of color generators is 7`)
	}
}

function deleteColor(event) {
	if (event.target.classList.contains("exitBtn")) {
		event.target.parentElement.remove();
		colorID--;
		changeColor();
	}

	  console.log('target:', event.target);
  console.log('currentTarget:', event.currentTarget);
}