import { GameObject } from './models/GameObject.js';
import { Mallet } from './models/Mallet.js';
import { Puck } from './models/Puck.js';
import gameState from './models/GameState.js';

import { drawGame, drawWelcome,drawExitButton } from './utils.js/drawScreens.js';



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
    gameState.welcomeBg = loadImage('./resources/background_image_3.jpg');
    gameState.mainpage = loadImage('./resources/main_page_2.jpg');
}


/* Function to update the game elements whenever browser windows is resized
- Custom function */

function updateDimensions() {
    gameState.boardWidth = width - 2 * gameState.margin;
    gameState.boardHeight = height - 2 * gameState.margin;
    gameState.centerCircleRadius = min(width, height) * 0.1;
    gameState.goalHeight = height * 0.25;
    gameState.goalY = height / 2 - gameState.goalHeight / 2;
}

/* Main function which is executed in a loop to draw the game elements on the screen
- By default it is called 60 times per second 
- p5.js function */

function draw() {
    background(220);
    if (gameState.screen === 'welcome') {
        drawWelcome();
    } else {
        drawGame(gameState.gameMode);
        drawExitButton();
    }
}


/* Function to handle window resize event
-p5.js function */

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    updateDimensions();
}


// Expose p5.js callback functions to the global scope
window.preload = preload;
window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;