import game from "./src/core/Game.js";
import { constants } from "./src/core/config.js";
import gameScreen from "./src/components/screens/GameScreen.js";
import { updateDimensions } from "./src/utils/windowResizer.js";
let gameBackImg;

function preload() {
  gameBackImg = loadImage("./assets/images/bg12.jpg");
  game.gameEngine.soundHandler.loadSound("paddle", "./assets/sounds//puck_paddle (mp3cut.net).mp3");
  game.gameEngine.soundHandler.loadSound("powerUp", "./assets/sounds/powerup3 (mp3cut.net).mp3");
  game.gameEngine.soundHandler.loadSound("goal", "./assets/sounds/goal_1 (mp3cut.net).wav");
  game.gameEngine.soundHandler.loadSound("board", "./assets/sounds/puck_board (mp3cut.net).mp3");
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