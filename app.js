//Load JSON
function getJson() {
  fetch("./dino.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const dino_data = data.Dinos.map(
        (el) => new Dino(el.species, el.height, el.weight, el.diet, el.fact)
      );
      generateTile(dino_data);
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
const dino = new Dino();
// Create Human Object
const human = new Object();

//input DOM
const name = document.getElementById("name");
const feet = document.getElementById("feet");
const inches = document.getElementById("inches");
const weight = document.getElementById("weight");
const diet = document.getElementById("diet");
const compare = document.getElementById("compare");

// Use IIFE to get human data from form
const getHumanData = function () {
  (function () {
    human.species = name.value;
    human.height = parseInt(feet.value) * 12 + parseInt(inches.value);
    human.weight = weight.value;
    human.diet = diet.value;
    human.compare = compare.value;
  })(name, feet, inches, weight, diet, compare);
};
// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareHeight = function (fact) {
  dino_fact_arr = [];
  //original fact
  const original_fact = fact;
  //wow_fact
  const wow_fact = "Wow! This is one of the random fact!!!";

  if (dino.species === "Pigeon") {
    dino.fact = "All birds are living dinosaurs.";
  } else {
    if (dino.height > human.height) {
      //comparison fact
      const comparison_fact = `${dino.species} is ${
        dino.height - human.height
      } inches
    taller than ${human.species}`;

      //push three random fact in to dino_fact_arr
      dino_fact_arr.push(original_fact, comparison_fact, wow_fact);

      dino.fact = dino_fact_arr[Math.floor(Math.random() * 3)];
      return dino.fact;
    } else {
      //comparison fact
      const comparison_fact = `${dino.species} is ${
        human.height - dino.height
      } inches  smaller than ${human.species}`;

      //push three random fact in to dino_fact_arr
      dino_fact_arr.push(original_fact, comparison_fact, wow_fact);
      dino.fact = dino_fact_arr[Math.floor(Math.random() * 3)];
      return dino.fact;
    }
  }
};
// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareWeight = function (fact) {
  dino_fact_arr = [];
  //original fact
  const original_fact = fact;
  //wow_fact
  const wow_fact = "Wow! This is one of the random fact!!!";

  if (dino.species === "Pigeon") {
    dino.fact = "All birds are living dinosaurs.";
  } else {
    if (dino.weight > human.weight) {
      const comparison_fact = `${dino.species} is ${
        dino.weight - human.weight
      } lbs
    heavier than ${human.species}`;

      //push three random fact in to dino_fact_arr
      dino_fact_arr.push(original_fact, comparison_fact, wow_fact);
      dino.fact = dino_fact_arr[Math.floor(Math.random() * 3)];
      return dino.fact;
    } else {
      const comparison_fact = `${dino.species} is ${
        human.weight - dino.weight
      } lbs  lighter than ${human.species}`;

      //push three random fact in to dino_fact_arr
      dino_fact_arr.push(original_fact, comparison_fact, wow_fact);
      dino.fact = dino_fact_arr[Math.floor(Math.random() * 3)];

      return dino.fact;
    }
  }
};
// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareDiet = function (fact) {
  dino_fact_arr = [];
  //original fact
  const original_fact = fact;
  //wow_fact
  const wow_fact = "Wow! This is one of the random fact!!!";
  //comparison fact
  const comparison_fact = `${dino.species} is ${dino.diet}`;

  if (dino.species === "Pigeon") {
    dino.fact = "All birds are living dinosaurs.";
  } else {
    //push three random fact in to dino_fact_arr
    dino_fact_arr.push(original_fact, comparison_fact, wow_fact);
    dino.fact = dino_fact_arr[Math.floor(Math.random() * 3)];
    return dino.fact;
  }
};

// Generate Tiles for each Dino in Array
function generateTile(data) {
  //insert randomized fact into new dino data
  let updatedDino = [];
  data.forEach((el) => {
    dino.species = el.species;
    dino.height = el.height;
    dino.weight = el.weight;
    dino.diet = el.diet;
    if (human.compare === "Height") {
      dino.compareHeight(el.fact);
    } else if (human.compare === "Weight") {
      dino.compareWeight(el.fact);
    } else {
      dino.compareDiet(el.fact);
    }

    updatedDino.push(JSON.parse(JSON.stringify(dino)));
  });
  //add human card inthe middle of grid
  updatedDino.splice(4, 0, human);
  updatedDino.forEach((el) => {
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
  if (
    el.species !== "Triceratops" &&
    el.species !== "Tyrannosaurus Rex" &&
    el.species !== "Anklyosaurus" &&
    el.species !== "Brachiosaurus" &&
    el.species !== "Stegosaurus" &&
    el.species !== "Elasmosaurus" &&
    el.species !== "Pteranodon" &&
    el.species !== "Pigeon"
  ) {
    imgNode.src = "./images/human.png";
  } else {
    imgNode.src = `./images/${el.species}.png`;
  }
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
  // if (name.value === "") {
  //   //validate empty input
  //   alert("type info inside of input");
  // } else {
  //validate name - text only
  const re = /^[A-Za-z]*$/;
  if (re.test(name.value)) {
    getJson();
    getHumanData(name, feet, inches, weight, diet, compare);
    removeForm();
    // resetValue();
  } else {
    alert("Please type text only for name input");
  }
  // }
}
// On button click, prepare and display infographic
const compareBtn = document.getElementById("btn");
compareBtn.addEventListener("click", compareWithDino);
