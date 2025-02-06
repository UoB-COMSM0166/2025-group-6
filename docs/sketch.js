let margin = 40;
let boardWidth, boardHeight;
let centerCircleRadius;
let goalWidth = 10;
let goalHeight;
let goalY;
let gameState = 'welcome';
let gameMode = '';
let exitButtonSize =40 ;

/* Function called only once at the beginning of the program to setup the game elements 
- p5.js function */

function setup() {
    createCanvas(windowWidth, windowHeight);
    updateDimensions();
}

/* Function called only once at the beginning of the program to load images and other media files
-called before setup() 
- p5.js function */

function preload() {
    welcomeBg = loadImage('./resources/welcome.jpg');
}

/* Function to update the game elements whenever browser windows is resized
- Custom function */

function updateDimensions() {
    boardWidth = width - 2 * margin;
    boardHeight = height - 2 * margin;
    centerCircleRadius = min(width, height) * 0.1;
    goalHeight = height * 0.25;
    goalY = height / 2 - goalHeight / 2;
}

/* Main function which is executed in a loop to draw the game elements on the screen
- By default it is called 60 times per second 
- p5.js function */

function draw() {
    background(220);
    if (gameState === 'welcome') {
        drawWelcome();
    } else {
        drawGame(gameMode);
        drawExitButton();
    }
}

/* Fuction to draw the welcome screen with buttons for single player and multiplayer
- Custom function */

function drawWelcome() {
    image(welcomeBg, 0, 0, width, height);
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(0);
    text('Air Hockey', width / 2, height / 3);

    let buttonWidth = 200;
    let buttonHeight = 50;
    let buttonY = height / 2;
    let spacing = 30;

    // Single Player Button
    if (isMouseOverButton(width / 2 - buttonWidth - spacing, buttonY, buttonWidth, buttonHeight)) {
        fill(200);
    } else {
        fill(255);
    }
    rect(width / 2 - buttonWidth - spacing, buttonY, buttonWidth, buttonHeight);
    fill(0);
    textSize(20);
    text('Single Player', width / 2 - buttonWidth / 2 - spacing, buttonY + buttonHeight / 2);

    // Multiplayer Button
    if (isMouseOverButton(width / 2 + spacing, buttonY, buttonWidth, buttonHeight)) {
        fill(200);
    } else {
        fill(255);
    }
    rect(width / 2 + spacing, buttonY, buttonWidth, buttonHeight);
    fill(0);
    text('Multiplayer', width / 2 + buttonWidth / 2 + spacing, buttonY + buttonHeight / 2);
}

/* Function to check if mouse is over a button
- It makes use of the mouseX and mouseY system variables which are updated by p5.js
- mouseX and mouseY represent the  x and y coordinates of the mouse pointer respectively
- Custom function */

function isMouseOverButton(x, y, w, h) {
    return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}

/* Function to draw the game elements on the screen
- Custom function */
function drawGame(mode) {

    noFill();
    strokeWeight(2);
    rect(margin, margin, boardWidth, boardHeight);
    circle(width / 2, height / 2, centerCircleRadius * 2);
    line(width / 2, margin, width / 2, height - margin);
    rect(margin - goalWidth, goalY, goalWidth, goalHeight);
    rect(width - margin, goalY, goalWidth, goalHeight);

    // Display game mode
    fill(0);
    textAlign(LEFT, TOP);
    textSize(16);
    text(`Mode: ${mode === 'single' ? 'Single Player' : 'Multiplayer'}`, margin, margin - 25);
}

/* Function to draw the exit button on the screen
- Custom function */

function drawExitButton() {
    let exitButtonWidth = exitButtonSize; 
    let exitButtonHeight = exitButtonSize / 2; 
    
    fill(255, 0, 0);
    rect(width - exitButtonWidth - 10, 10, exitButtonWidth, exitButtonHeight);
    
    fill(255);
    textSize(16); 
    textAlign(CENTER, CENTER);
    text('Exit', width - exitButtonWidth / 2 - 10, 10 + exitButtonHeight / 2);
}

/* Function to handle mouse click event
- It works by chekcing which button is clicked by checking 
the mouse coordinates and comparing it with the button coordinates
- p5.js function */
function mousePressed() {
    if (gameState === 'welcome') {
        let buttonWidth = 200;
        let buttonHeight = 50;
        let buttonY = height / 2;
        let spacing = 30;
       // check if single player or multiplayer button is clicked
        if (isMouseOverButton(width / 2 - buttonWidth - spacing, buttonY, buttonWidth, buttonHeight)) {
            gameMode = 'single';
            gameState = 'game';
        } else if (isMouseOverButton(width / 2 + spacing, buttonY, buttonWidth, buttonHeight)) {
            gameMode = 'multi';
            gameState = 'game';
        }
    } else {
        // Check if exit button is clicked
        if (mouseX > width - exitButtonSize - 10 && mouseX < width - 10 &&
            mouseY > 10 && mouseY < 10 + exitButtonSize) {
            gameState = 'welcome';
        }
    }
}

/* Function to handle window resize event
-p5.js function */

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    updateDimensions();
}
