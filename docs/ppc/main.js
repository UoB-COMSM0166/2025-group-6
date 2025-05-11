import game from "./src/core/Game.js";

let gameBackImg;
let paddleSound;
let boardSound;
let goalSound;
let powerupSound;
let backgroundSound;
let welcomeImg;
let celebrationImg;
let clickSound;
let obstacleSound;
let canvasWidth = 1280;
let canvasHeight = 720;

function preload() {
  celebrationImg = loadImage("./assets/images/bg10.jpg");
  welcomeImg     = loadImage("./assets/images/welcome.jpg");
  gameBackImg    = loadImage("./assets/images/bg12.jpg");

  paddleSound   = loadSound("./assets/sounds/puck_paddle.mp3");
  powerupSound  = loadSound("./assets/sounds/powerup3.mp3");
  goalSound     = loadSound("./assets/sounds/goal_1.wav");
  boardSound    = loadSound("./assets/sounds/puck_board.mp3");
  obstacleSound = loadSound("./assets/sounds/obstacle.mp3");
  clickSound    = loadSound("./assets/sounds/button.mp3");
}

function setup() {
  const availableHeight = window.innerHeight - 64; 
  const maxWidth = window.innerWidth;
  const canvasWidth = Math.min(maxWidth, (availableHeight * 16) / 9);
  const canvasHeight = canvasWidth * 9 / 16;
  createCanvas(canvasWidth, canvasHeight);
  game.initializeGame();

  game.landingPage.welcomeImg   = welcomeImg;
  game.winnerPage.celebrationImg = celebrationImg;
  game.gameBackImg              = gameBackImg;
  game.welcomeImg               = welcomeImg;

  // Register sounds
  game.sounds.paddle      = paddleSound;
  game.sounds.board       = boardSound;
  game.sounds.goal        = goalSound;
  game.sounds.powerup     = powerupSound;
  game.sounds.obstacleSound   = obstacleSound;
  game.sounds.click       = clickSound;
}


function draw() {
  game.updateGame();
}

window.preload = preload;
window.setup   = setup;
window.draw    = draw;

// Spacebar toggles pause/play in-game
window.addEventListener("keydown", (e) => {
  if (e.code === "Space" && game.gameState === "gameboard") {
    game.gamePage.pauseButton.togglePause();
    e.preventDefault();
  }
});
