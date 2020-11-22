//Load JSON
function getJson() {
  fetch("./dino.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      generateTile(data);
    });
}

// Create Dino Constructor
function Dino(species, height, weight, diet) {
  this.species = species;
  this.height = height;
  this.weight = weight;
  this.diet = diet;
}
// Create Dino Objects

// Create Human Object
const human = new Object();

//input DOM
const name = document.getElementById("name");
const feet = document.getElementById("feet");
const inches = document.getElementById("inches");
const weight = document.getElementById("weight");
const diet = document.getElementById("diet");

// Use IIFE to get human data from form

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array
function generateTile(data) {
  const array_dino = data.Dinos;
  console.log(human);
  array_dino.splice(4, 0, human);
  array_dino.forEach((el) => {
    addToDom(el);
  });
}

// Add tiles to DOM
function addToDom(el) {
  const grid = document.getElementById("grid");
  const div = document.createElement("div");
  div.className = "grid-item";
  //create dom elements
  const h3Node = document.createElement("h3");
  const imgNode = document.createElement("img");
  const pNode = document.createElement("p");

  //link data contents with DOM
  imgNode.src = `./images/${el.species}.png`;
  h3Node.textContent = el.species;
  pNode.textContent = el.fact;

  //append DOM element div under the grid
  div.appendChild(h3Node);
  div.appendChild(imgNode);
  div.appendChild(pNode);
  grid.appendChild(div);
}
// Remove form from screen
function removeForm() {
  const form = document.getElementById("dino-compare");
  form.style.display = "none";
}
//reset input value
function resetValue() {
  name.value = "";
  feet.value = "";
  inches.value = "";
  weight.value = "";
  diet.value = "";
}

//compare Me eventlistner
function compareWithDino() {
  getJson();
  removeForm();
  resetValue();
}
// On button click, prepare and display infographic
const compareBtn = document.getElementById("btn");
compareBtn.addEventListener("click", compareWithDino);
