
import game  from "../core/Game.js";
import { constants } from "../core/config.js";

/* Function to handle window resize event
-p5.js function */
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    updateDimensions();
}

/* Function to update the game elements whenever browser windows is resized
- Custom function */

export function updateDimensions() {
    // Update board dimensions
    game.board.boardWidth = width - 2 * constants.margin;
    game.board.boardHeight = height - 2 * constants.margin;
    game.board.centerCircleRadius = min(width, height) * 0.1;
    game.board.goalPost.goalHeight = height * 0.25;
    game.board.goalPost.goalY = height / 2 ;
}

window.windowResized = windowResized;