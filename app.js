//Load JSON
function getJson() {
  fetch("./dino.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const dino_arr = data.Dinos.map(
        (el) => new Dino(el.species, el.height, el.weight, el.diet, el.fact)
      );
      generateTile(dino_arr);
    });
}

// Create Dino Constructor
class Dino {
  constructor(species, height, weight, diet, fact) {
    this.species = species;
    this.height = height;
    this.weight = weight;
    this.diet = diet;
    this.fact = fact;
  }
}
// Create Dino Objects
let dino = new Dino();

// Create Human Object
let human = new Object();

//input DOM
const name = document.getElementById("name");
const feet = document.getElementById("feet");
const inches = document.getElementById("inches");
const weight = document.getElementById("weight");
const diet = document.getElementById("diet");

// Use IIFE to get human data from form
const getHumanData = function () {
  (function () {
    human.species = name.value;
    human.height = parseInt(feet.value) * 12 + parseInt(inches.value);
    human.weight = weight.value;
    human.diet = diet.value;
  })(name, feet, inches, weight, diet);
};

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareHeight = function () {
  console.log("this is height comparison");
};
// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareWeight = function () {
  console.log("this is weight comparison");
};
// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

//randomize fact
let randomized_fact = [];

function randomFact(data) {
  //extracting fact element from Dino array
  data.forEach((el) => {
    randomized_fact.push(el.fact);
  });
  //randomize by sort
  randomized_fact.sort(() => Math.random() - 0.5);
  //remove pigeon's fact from randomized fact array
  const index = randomized_fact.indexOf("All birds are living dinosaurs.");
  randomized_fact.splice(index, 1);
}
// Generate Tiles for each Dino in Array
function generateTile(data) {
  randomFact(data);
  //insert randomized fact into new dino data
  let updatedDino = [];
  let count = 0;
  data.forEach((el) => {
    dino.species = el.species;
    dino.height = el.height;
    dino.weight = el.weight;
    dino.diet = el.diet;
    if (el.species === "Pigeon") {
      dino.fact = "All birds are living dinosaurs.";
    } else {
      dino.fact = randomized_fact[count];
      count++;
    }
    updatedDino.push(JSON.parse(JSON.stringify(dino)));
  });
  let array_dino = updatedDino;
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
  getHumanData(name, feet, inches, weight, diet);
  removeForm();
  resetValue();
}
// On button click, prepare and display infographic
const compareBtn = document.getElementById("btn");
compareBtn.addEventListener("click", compareWithDino);
