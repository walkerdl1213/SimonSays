/**
 * DOM SELECTORS
 */

const startButton = document.querySelector(".js-start-button");
// TODO: Add the missing query selectors:
const statusSpan = document.querySelector(".js-status"); // Use querySelector() to get the status element
const heading = document.querySelector(".js-heading"); // Use querySelector() to get the heading element
const padContainer = document.querySelector(".js-pad-container"); // Use querySelector() to get the heading element

/**
 * VARIABLES
 */
let computerSequence = []; // track the computer-generated sequence of pad presses
let playerSequence = []; // track the player-generated sequence of pad presses
let maxRoundCount = 8; // the max number of rounds, varies with the chosen level
let roundCount = 0; // track the number of rounds that have been played so far

/**
 *
 * The `pads` array contains an array of pad objects.
 *
 * Each pad object contains the data related to a pad: `color`, `sound`, and `selector`.
 * - The `color` property is set to the color of the pad (e.g., "red", "blue").
 * - The `selector` property is set to the DOM selector for the pad.
 * - The `sound` property is set to an audio file using the Audio() constructor.
 *
 * Audio file for the green pad: "../assets/simon-says-sound-2.mp3"
 * Audio file for the blue pad: "../assets/simon-says-sound-3.mp3"
 * Audio file for the yellow pad: "../assets/simon-says-sound-4.mp3"
 *
 */

 const pads = [
  {
    color: "red",
    selector: document.querySelector(".js-pad-red"),
    sound: new Audio("https://github.com/Thinkful-Ed/js-dev-final-capstone-starter-simon-says/blob/9020712080fd6c94e95c0cf3c9f7b9308d86d79e/assets/simon-says-sound-1.mp3?raw=true"),
  },
  {
    color: "green",
    selector: document.querySelector(".js-pad-green"),
    sound: new Audio("https://github.com/Thinkful-Ed/js-dev-final-capstone-starter-simon-says/blob/9020712080fd6c94e95c0cf3c9f7b9308d86d79e/assets/simon-says-sound-2.mp3?raw=true"),
  },
  {
    color: "blue",
    selector: document.querySelector(".js-pad-blue"),
    sound: new Audio("https://github.com/Thinkful-Ed/js-dev-final-capstone-starter-simon-says/blob/9020712080fd6c94e95c0cf3c9f7b9308d86d79e/assets/simon-says-sound-3.mp3?raw=true"),
  },
  {
    color: "yellow",
    selector: document.querySelector(".js-pad-yellow"),
    sound: new Audio("https://github.com/Thinkful-Ed/js-dev-final-capstone-starter-simon-says/blob/9020712080fd6c94e95c0cf3c9f7b9308d86d79e/assets/simon-says-sound-4.mp3?raw=true"),
  },
  // TODO: Add the objects for the green, blue, and yellow pads. Use object for the red pad above as an example.
];

/**
 * EVENT LISTENERS
 */

padContainer.addEventListener("click", padHandler);
// TODO: Add an event listener `startButtonHandler()` to startButton.
startButton.addEventListener("click", startButtonHandler);
/**
 * EVENT HANDLERS
 */


/**
 * Called when the start button is clicked.
 */
function startButtonHandler() {
    roundCount++;

  startButton.classList.add("hidden");
  statusSpan.classList.remove("hidden");

  playComputerTurn();

  return {
    startButton: startButton,
    statusSpan: statusSpan,
  };
}



// Called when one of the pads is clicked.
function padHandler(event) {
  const { color } = event.target.dataset;
  if (!color) return;
  const pad = pads.find((pad) => pad.color === color);
  pad.sound.play();
  checkPress(color);
  return color;
}



function getRandomItem(collection) {
  if (collection.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * collection.length);
  return collection[randomIndex];
}


// Sets the status text of a given HTML element with a given a message
function setText(element, text) {
  element.textContent = text;
  return element;
}

// Activates a pad of a given color by playing its sound and light

function activatePad(color) {
  const pad = pads.find((pad) => pad.color === color);
  pad.selector.classList.add("activated");
  pad.sound.play();

  setTimeout(() => {
    pad.selector.classList.remove("activated");
  }, 500);
}

// Activates a sequence of colors passed as an array to the function
function activatePads(sequence) {
  sequence.forEach((color, index) => {
    setTimeout(() => {
      activatePad(color);
    }, index * 600);
  });
}


// Allows the computer to play its turn.
function playComputerTurn() {
  padContainer.classList.add("unclickable");
  setText(statusSpan, "The computer's turn!!");
  setText(heading, `Round ${roundCount} of ${maxRoundCount}`);
  const randomColor = getRandomItem(["red", "green", "blue", "yellow"]);
  computerSequence.push(randomColor);

  activatePads(computerSequence);

  setTimeout(() => playHumanTurn(), roundCount * 600 + 1000); // 5
}


// Allows the player to play their turn.

function playHumanTurn() {
  padContainer.classList.remove("unclickable");
  const remainingPresses = maxRoundCount - playerSequence.length;
  setText(statusSpan, `Your turn: ${remainingPresses} presses left`);
}

//  Checks the player's selection every time the player presses on a pad during the player's turn
function checkPress(color) {
  playerSequence.push(color);
  const index = playerSequence.length - 1;
  const remainingPresses = computerSequence.length - playerSequence.length;
  setText(statusSpan, `Your turn ${remainingPresses} presses left`);

  if (computerSequence[index] !== playerSequence[index]) {
    resetGame("Better Luck Next Time");
    return;
  }

  if (remainingPresses === 0) {
    setTimeout(() => checkRound(), 1000);
  }
}

 

// Checks each round to see if the player has completed all the rounds of the game * or advance to the next round if the game has not finished.
function checkRound() {
  if (playerSequence.length === maxRoundCount) {
    resetGame("Congratulations! You've won!");
  } else {
    roundCount++;
    playerSequence = [];
    setText(statusSpan, "Winner!");
    setTimeout(() => playComputerTurn(), 1000);
  }
}

//  * Resets the game. Called when either the player makes a mistake or wins the game.
function resetGame(text) {
  alert(text);
  setText(heading, "Simon Says");
  startButton.classList.remove("hidden");
  statusSpan.classList.add("hidden");
  padContainer.classList.add("unclickable");

  computerSequence = [];
  playerSequence = [];
  roundCount = 0;
}

