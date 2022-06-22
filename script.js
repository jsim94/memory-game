function getBestScore() {
  if (localStorage.bestScore) {
    bestScore = localStorage.bestScore;
    labelBestScore.innerText = bestScore;
  }
}

function setBestScore() {
  localStorage.setItem("bestScore", numTries);
}

function shuffle(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    array.push(array[i]);
  }
  let counter = array.length;
  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);

    counter--;

    const temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    //newDiv.style.backgroundColor = color;

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function checkForMatch(colors) {
  if (
    colors[0] !== colors[1] &&
    colors[0].getAttribute("class") === colors[1].getAttribute("class")
  ) {
    numMatches += 1;
    return true;
  } else {
    return false;
  }
}

function checkWinCondition() {
  if (numMatches === WIN_CONDITION) {
    if (!bestScore || numTries < bestScore) {
      bestScore = numTries;
      labelBestScore.innerText = bestScore;
      setBestScore();
    }
    console.log("YOU WON!!!!");
  }
  //unsure how to make css work like in the fancy solution
}

function handleCardClick(e) {
  switch (selectedColors.length) {
    case 0:
      selectedColors[0] = e.target;
      const temp0 = Object.assign(selectedColors[0], {});
      temp0.style.backgroundColor = temp0.className;

      break;
    case 1:
      if (selectedColors[0] !== e.target) {
        numTries++;
        labelcurrentScore.innerText = numTries;
        selectedColors[1] = e.target;
        const temp1 = Object.assign(selectedColors[1], {});
        temp1.style.backgroundColor = temp1.className;

        if (checkForMatch(selectedColors)) {
          checkWinCondition();
          for (let card of selectedColors) {
            card.removeEventListener("click", handleCardClick);
          }
        } else {
          //WEIRD SOLUTION FOR VALUE vs REFERENCE ISSUE. PLEASE ADVISE
          const temp0 = Object.assign(selectedColors[0], {});
          const temp1 = Object.assign(selectedColors[1], {});
          setTimeout(() => {
            temp0.style.backgroundColor = "white";
            temp1.style.backgroundColor = "white";
          }, 500);
        }
        selectedColors = [];
      }
      break;
    default:
      alert("UNEXPECTED ERROR: selectedColor");
  }
}

// when the DOM loads
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow",
  "lime",
  "pink",
  "magenta",
  "skyblue",
];
const WIN_CONDITION = COLORS.length;

let selectedColors = [];
let numMatches = 0;
let numTries = 0;
let bestScore = null;
let shuffledColors = shuffle(COLORS);

const gameContainer = document.getElementById("game");
const labelcurrentScore = document.getElementById("labelCurrentScore");
const labelBestScore = document.getElementById("labelBestScore");

getBestScore();
createDivsForColors(shuffledColors);
