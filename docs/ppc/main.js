import game from "./src/core/Game.js";
import { constants } from "./src/core/config.js";
import gameScreen from "./src/components/screens/GameScreen.js";
import { updateDimensions } from "./src/utils/windowResizer.js";
let gameBackImg;
let paddleSound;
let boardSound;
let goalSound;
let powerupSound;
let backgroundSound;

function preload() {
  gameBackImg = loadImage("./assets/images/bg12.jpg");
  paddleSound = loadSound( "./assets/sounds//puck_paddle (mp3cut.net).mp3");
  powerupSound = loadSound( "./assets/sounds/powerup2.mp3");
  goalSound = loadSound( "./assets/sounds/goal_1 (mp3cut.net).wav");
  boardSound = loadSound( "./assets/sounds/puck_board (mp3cut.net).mp3");
  backgroundSound = loadSound( "./assets/sounds/backgound.mp3");

}
function setup() {
  createCanvas(windowWidth, windowHeight);
  game.initializeGame();
  game.board.gameBackImg = gameBackImg;
  game.gameEngine.soundHandler.loadSound("paddle", paddleSound);
  game.gameEngine.soundHandler.loadSound("board", boardSound);
  game.gameEngine.soundHandler.loadSound("goal", goalSound);
  game.gameEngine.soundHandler.loadSound("powerup", powerupSound);
  game.gameEngine.soundHandler.loadSound("backgroundSound",backgroundSound);
  game.gameEngine.soundHandler.loopSound("backgroundSound");
  updateDimensions();

}

function draw() {
  game.updateGame();
  // game.gameEngine.soundHandler.playSound("backgroundSound");
  gameScreen.draw();
}

window.setup = setup;
window.draw = draw;
window.preload = preload;