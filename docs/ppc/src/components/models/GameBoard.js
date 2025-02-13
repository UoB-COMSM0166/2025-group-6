import { constants } from "../../core/config.js";


export class GameBoard {
    constructor() {
        // Board properties moved from Game
        this.boardWidth = width - 2 * constants.margin;
        this.boardHeight = height - 2 * constants.margin;
        this.centerCircleRadius = min(width, height) * 0.1;
        this.goalWidth = 10;
        this.goalHeight = undefined;  
        this.goalY = undefined;       

        // Optionally, pre-calculate the center of the canvas (if it never changes)
        this.centerX = width / 2;
        this.centerY = height / 2;
    }

    draw() {
        // Draw the board background using board properties
        rectMode(CENTER);
        fill(0); // Black background
        rect(width / 2, height / 2, this.boardWidth, this.boardHeight);

        // Draw center circle
        noFill();
        stroke(255); // White stroke
        strokeWeight(2);
        circle(width / 2, height / 2, this.centerCircleRadius * 2);

        // Reset drawing settings if needed
        noStroke();
        // You can also reset fill if necessary: fill(255);
    }

    // Helper method to check if a point is within board boundaries
    isInBounds(x, y) {
        return x >= constants.Margin && 
               x <= this.width - constants.Margin &&
               y >= constants.Margin && 
               y <= this.height - constants.Margin;
    }

    // Get board dimensions (useful for other components)
    getDimensions() {
        return {
            width: this.width,
            height: this.height,
            centerX: this.centerX,
            centerY: this.centerY,
            margin: constants.Margin
        };
    }
} 