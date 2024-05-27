/**
 * DOM SELECTORS
 */
const startButton = document.querySelector(".js-start-button");
const statusSpan = document.querySelector(".js-status");
const heading = document.querySelector(".js-heading");
const padContainer = document.querySelector(".js-pad-container");

/**
 * VARIABLES
 */
let computerSequence = []; // Track the computer-generated sequence of pad presses
let playerSequence = []; // Track the player-generated sequence of pad presses
const maxRoundCount = 8; // Set the max number of rounds to 8
let roundCount = 0; // Track the number of rounds that have been played so far

/**
 * The `pads` array contains an array of pad objects.
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
];

/**
 * EVENT LISTENERS
 */
padContainer.addEventListener("click", padHandler);
startButton.addEventListener("click", startButtonHandler);

/**
 * EVENT HANDLERS
 */
function startButtonHandler() {
  roundCount = 1;
  computerSequence = [];
  playerSequence = [];

  startButton.classList.add("hidden");
  statusSpan.classList.remove("hidden");

  playComputerTurn();
}

function padHandler(event) {
  const { color } = event.target.dataset;
  if (!color) return;
  const pad = pads.find((pad) => pad.color === color);
  if (pad) {
    pad.sound.play();
    checkPress(color);
  }
}

/**
 * HELPER FUNCTIONS
 */
function getRandomItem(collection) {
  if (collection.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * collection.length);
  return collection[randomIndex];
}

function setText(element, text) {
  element.textContent = text;
}

function activatePad(color) {
  const pad = pads.find((pad) => pad.color === color);
  if (pad) {
    pad.selector.classList.add("activated");
    pad.sound.play();

    setTimeout(() => {
      pad.selector.classList.remove("activated");
    }, 500);
  }
}

function activatePads(sequence) {
  sequence.forEach((color, index) => {
    setTimeout(() => {
      activatePad(color);
    }, index * 600);
  });
}

function playComputerTurn() {
  padContainer.classList.add("unclickable");
  alert("Computer's Turn!");
  setText(statusSpan, "Computer's Turn");
  setText(heading, `Round ${roundCount} of ${maxRoundCount}`);
  const randomColor = getRandomItem(["red", "green", "blue", "yellow"]);
  computerSequence.push(randomColor);

  activatePads(computerSequence);

  setTimeout(() => playHumanTurn(), computerSequence.length * 600 + 1000);
}

function playHumanTurn() {
  alert("You're Up!");
  padContainer.classList.remove("unclickable");
  const remainingPresses = computerSequence.length - playerSequence.length;
  setText(statusSpan, `Your turn: ${remainingPresses} presses left`);
}

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

function checkRound() {
  if (roundCount === maxRoundCount) {
    resetGame("Congratulations! You've won!");
  } else if (playerSequence.length === computerSequence.length) {
    roundCount++;
    playerSequence = [];
    setText(statusSpan, "Nice! Keep going!");
    setTimeout(() => playComputerTurn(), 1000);
  }
}

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
