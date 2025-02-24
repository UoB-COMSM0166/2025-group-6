import game from "./src/core/Game.js";
import { constants } from "./src/core/config.js";
import gameScreen from "./src/components/screens/GameScreen.js";
import { updateDimensions } from "./src/utils/windowResizer.js";
let gameBackImg;

function preload() {
  gameBackImg = loadImage("./assets/images/bg12.jpg");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  game.initializeGame();
  game.board.gameBackImg = gameBackImg;
  updateDimensions();
}

function draw() {
  game.updateGame();
  gameScreen.draw();
}

window.setup = setup;
window.draw = draw;
window.preload = preload;
