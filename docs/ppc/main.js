import game from "./src/core/Game.js";
import { updateDimensions } from "./src/utils/windowResizer.js";
let gameBackImg;
let paddleSound;
let boardSound;
let goalSound;
let powerupSound;
let backgroundSound;
let welcomeImg;
let instructionContent;
let celebrationImg;


function preload() {
  celebrationImg = loadImage("./assets/images/bg10.jpg");
  welcomeImg = loadImage("./assets/images/welcome.jpg");
  gameBackImg = loadImage("./assets/images/bg12.jpg");
  paddleSound = loadSound( "./assets/sounds/puck_paddle.mp3");
  powerupSound = loadSound( "./assets/sounds/powerup3.mp3");
  goalSound = loadSound( "./assets/sounds/goal_1.wav");
  boardSound = loadSound( "./assets/sounds/puck_board.mp3");
  backgroundSound = loadSound( "./assets/sounds/backgound.mp3");
  instructionContent = loadStrings("./assets/textFiles/Instructions.txt");

}
function setup() {
  createCanvas(windowWidth, windowHeight);
  game.initializeGame();
  game.landingPage.welcomeImg = welcomeImg;
  game.landingPage.instructionContent = instructionContent;
  game.winnerPage.celebrationImg = celebrationImg;
  game.gameBackImg = gameBackImg;

  // Load sounds
  game.sounds.paddle= paddleSound;
  game.sounds.board = boardSound;
  game.sounds.goal = goalSound;
  game.sounds.powerup = powerupSound;
  game.sounds.backgroundSound = backgroundSound;

  // game.gameEngine.soundHandler.loadSound("paddle", paddleSound);
  // game.gameEngine.soundHandler.loadSound("board", boardSound);
  // game.gameEngine.soundHandler.loadSound("goal", goalSound);
  // game.gameEngine.soundHandler.loadSound("powerup", powerupSound);
  // game.gameEngine.soundHandler.loadSound("backgroundSound", backgroundSound);
  // game.gameEngine.soundHandler.loopSound("backgroundSound");


  // game.gameEngine.soundHandler.setVolumeAll();


  updateDimensions();
}
function draw() {
  game.updateGame();
}

window.setup = setup;
window.draw = draw;
window.preload = preload;