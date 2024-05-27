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
