
import gameState from "../models/GameState.js";

/* Function to handle window resize event
-p5.js function */
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    updateDimensions();
}

/* Function to update the game elements whenever browser windows is resized
- Custom function */

export function updateDimensions() {
    gameState.boardWidth = width - 2 * gameState.margin;
    gameState.boardHeight = height - 2 * gameState.margin;
    gameState.centerCircleRadius = min(width, height) * 0.1;
    gameState.goalHeight = height * 0.25;
    gameState.goalY = height / 2 - gameState.goalHeight / 2;
}

window.windowResized = windowResized;