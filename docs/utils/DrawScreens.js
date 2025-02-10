import gameState from "../models/GameState.js";
import {isMouseOverButton} from "./MouseHandler.js";
import {updateGame} from "./GameUpdater.js"

/* Fuction to draw the welcome screen with buttons for single player and multiplayer
- Custom function */

export function drawWelcome() {
    image(gameState.welcomeBg, 0, 0, width, height);
    textAlign(CENTER, CENTER);
    textSize(32);
    
    // Add text shadow effect
    fill(0, 0, 139, 160);  // Dark blue with some transparency for shadow
    text('Power Puck Clash', width / 2 + 3, height / 3 + 3);  // Shadow offset
    
    // Main text
    fill(0, 100, 255);  // Bright blue
    text('Power Puck Clash', width / 2, height / 3);

    let buttonWidth = 200;
    let buttonHeight = 50;
    let buttonY = height / 2;
    let spacing = 30;

    // Single Player Button
    if (isMouseOverButton(width / 2 - buttonWidth - spacing, buttonY-buttonHeight/2, buttonWidth, buttonHeight)) {
        fill(200);
    } else {
        fill(255);
    }
    rect(width / 2 - buttonWidth/2 - spacing, buttonY, buttonWidth, buttonHeight);
    fill(0);
    textSize(20);
    text('Single Player', width / 2 - buttonWidth/2 - spacing, buttonY);

    // Multiplayer Button
    if (isMouseOverButton(width / 2 + spacing, buttonY-buttonHeight/2, buttonWidth, buttonHeight)) {
        fill(200);
    } else {
        fill(255);
    }
    rect(width / 2 + buttonWidth/2 + spacing, buttonY, buttonWidth, buttonHeight);
    fill(0);
    text('Multiplayer', width / 2 + buttonWidth/2 + spacing, buttonY);
}

/* Function to draw the game elements on the screen
- Custom function */
export function drawGame(mode) {
    image(gameState.mainpage, 0, 0, width, height);
    noFill();
    strokeWeight(2);
    rect(width/2, height/2, gameState.boardWidth, gameState.boardHeight);
    circle(width / 2, height / 2, gameState.centerCircleRadius * 2);
    line(width / 2, gameState.margin, width / 2, height - gameState.margin);
    stroke(255);  // Set stroke color to white
    strokeWeight(4);  // Make border bold
    rect(gameState.margin+gameState.goalWidth/2, height/2, gameState.goalWidth, gameState.goalHeight);
    rect(width - gameState.margin-gameState.goalWidth/2,height/2 , gameState.goalWidth, gameState.goalHeight);
    strokeWeight(2);  // Reset stroke weight for other elements
    stroke(0);

    // Update and draw game objects
    updateGame();
    
    // Draw scores with player colors and enhanced style
    textSize(24);  // Larger text size
    textStyle(BOLD);  // Make text bold
    textAlign(CENTER, CENTER);
    
    // Player 1 score (red)
    fill(255, 0, 0);  // Red color matching player 1's mallet
    text(gameState.player1.score, width * 0.25, gameState.margin-15);
    
    // Player 2 score (blue)
    fill(0, 0, 255);  // Blue color matching player 2's mallet
    text(gameState.player2.score, width * 0.75, gameState.margin-15);
    
    // Reset text style
    textStyle(NORMAL);

    // Draw game objects with rectMode for mallets
    // rectMode(CENTER);
    fill(255, 0, 0);
    gameState.player1.draw();
    fill(0, 0, 255);
    gameState.player2.draw();
    
    // Draw puck
    fill(0);
    ellipseMode(RADIUS);
    gameState.puck.draw();

    // Display game mode
    fill(0);
    textAlign(LEFT, TOP);
    textSize(16);
    text(`Mode: ${mode === 'single' ? 'Single Player' : 'Multiplayer'}`, gameState.margin, gameState.margin - 25);
}

/* Function to draw the exit button on the screen
- Custom function */

export function drawExitButton() {
    let exitButtonWidth = gameState.exitButtonSize; 
    let exitButtonHeight = gameState.exitButtonSize / 2; 
    
    fill(255, 0, 0);
    rect(width - exitButtonWidth/2 - 10, 10 + exitButtonHeight/2, exitButtonWidth, exitButtonHeight);
    
    fill(255);
    textSize(16); 
    textAlign(CENTER, CENTER);
    text('Exit', width - exitButtonWidth / 2 - 10, 10 + exitButtonHeight / 2);
}