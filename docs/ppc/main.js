import game from "./src/core/Game.js";

let gameBackImg;
let paddleSound;
let boardSound;
let goalSound;
let powerupSound;
let welcomeImg;
let celebrationImg;
let losingImg;
let clickSound;
let obstacleSound;
let victorySound;
let looseSound;



function preload() {
  celebrationImg = loadImage("./assets/images/newbg1.png");
  losingImg      = loadImage("./assets/images/newbg2.png");
  welcomeImg     = loadImage("./assets/images/welcome.jpg");
  gameBackImg    = loadImage("./assets/images/bg12.jpg");
  paddleSound   = loadSound("./assets/sounds/puck_paddle.mp3");
  powerupSound  = loadSound("./assets/sounds/powerup3.mp3");
  goalSound     = loadSound("./assets/sounds/goal_1.wav");
  boardSound    = loadSound("./assets/sounds/puck_board.mp3");
  obstacleSound = loadSound("./assets/sounds/obstacle.mp3");
  clickSound    = loadSound("./assets/sounds/button.mp3");
  victorySound = loadSound('assets/sounds/victory.mp3');
  looseSound = loadSound('assets/sounds/loose.mp3');

}

function setup() {
  const availableHeight = window.innerHeight - 64; 
  const maxWidth = window.innerWidth;
  const canvasWidth = Math.min(maxWidth, (availableHeight * 16) / 9);
  const canvasHeight = canvasWidth * 9 / 16;
  createCanvas(canvasWidth, canvasHeight);
  game.initializeGame();

  game.landingPage.welcomeImg    = welcomeImg;
  game.winnerPage.celebrationImg = celebrationImg;
  game.winnerPage.losingImg      = losingImg;
  game.gameBackImg               = gameBackImg;
  game.welcomeImg                = welcomeImg;

  game.sounds.paddle      = paddleSound;
  game.sounds.board       = boardSound;
  game.sounds.goal        = goalSound;
  game.sounds.powerup     = powerupSound;
  game.sounds.obstacleSound   = obstacleSound;
  game.sounds.click       = clickSound;
  game.sounds.victory     = victorySound;
  game.sounds.loose       = looseSound;
}


function draw() {
  game.updateGame();
}

window.preload = preload;
window.setup   = setup;
window.draw    = draw;

window.addEventListener("keydown", (e) => {
  if (e.code === "Space" && game.gameState === "gameboard") {
    game.gamePage.pauseButton.togglePause();
    e.preventDefault();
  }
});
