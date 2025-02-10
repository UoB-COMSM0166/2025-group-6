import { GameObject } from "./models/GameObject.js";
import { Mallet } from "./models/Mallet.js";
import { Puck } from "./models/Puck.js";
import gameState from "./models/GameState.js";
import { updateDimensions } from "./utils/WindowResizer.js";
import { drawGame, drawWelcome, drawExitButton } from "./utils/DrawScreens.js";

/* Function called only once at the beginning of the program to setup the game elements 
- p5.js function */

function setup() {
  createCanvas(windowWidth, windowHeight);
  updateDimensions();
  rectMode(CENTER);
}

/* Function called only once at the beginning of the program to load images and other media files
-called before setup() 
- p5.js function */

function preload() {
  gameState.welcomeBg = loadImage("./resources/background_image_3.jpg");
  gameState.mainpage = loadImage("./resources/main_page_2.jpg");
}

/* Main function which is executed in a loop to draw the game elements on the screen
- By default it is called 60 times per second 
- p5.js function */

function draw() {
  background(220);
  if (gameState.screen === "welcome") {
    drawWelcome();
  } else {
    drawGame(gameState.gameMode);
    drawExitButton();
  }
}

// Expose p5.js callback functions to the global scope
window.preload = preload;
window.setup = setup;
window.draw = draw;
