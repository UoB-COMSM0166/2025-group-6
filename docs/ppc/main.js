import game from "./src/core/Game.js";
import { constants } from "./src/core/config.js";
import gameScreen from "./src/components/screens/GameScreen.js";
import { updateDimensions } from "./src/utils/windowResizer.js";
let gameBackImg;

function preload() {
  gameBackImg = loadImage("./assets/images/bg12.jpg");
  game.soundManager.loadSound("paddle","./assets/sounds/puck_paddle (mp3cut.net).mp3");
  game.soundManager.loadSound("board","./assets/sounds/puck_board (mp3cut.net).mp3");
  game.soundManager.loadSound("powerup","./assets/sounds/powerup3 (mp3cut.net).mp3");
  game.soundManager.loadSound("goal","./assets/sounds/goal_1 (mp3cut.net).wav");



}
function setup() {
  createCanvas(windowWidth, windowHeight);
  game.initializeGame();
  game.board.gameBackImg = gameBackImg;
  updateDimensions();
  game.soundManager.setVolume("paddle", 0.5);
  game.soundManager.setVolume("board", 0.1);
  game.soundManager.setVolume("powerup", 0.1);
  game.soundManager.setVolume("goal", 0.1);


}

function draw() {
  game.updateGame();
  gameScreen.draw();
}

window.setup = setup;
window.draw = draw;
window.preload = preload;