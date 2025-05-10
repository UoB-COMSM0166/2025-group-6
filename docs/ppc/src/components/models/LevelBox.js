import { constants } from "../../core/config.js";

/**
 * This class displays the current game level on the screen.
 */
export class LevelBox {
  constructor(game) {
    this.x = 100; // Reset x position
    this.y = constants.margin/2; // Reset y position
    this.game = game;
    this.textColor = '#FFFFFF';
    this.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    this.height = constants.margin;
    this.width = width * 0.2; 
  }

  // Renders the text.
  draw() {
    push();

    fill(this.textColor);
    textSize(18);
    textAlign(CENTER, CENTER);
    
    const centerX = this.x;
    const centerY = this.y;
    text(`Level: ${this.game.level}`, centerX, centerY);
    
    pop();
  }

  // Resets position and width based on screen size.
  reset() {
    this.x = 100; // Reset x position
    this.y = constants.margin/2; // Reset y position
    this.width = width * 0.2; 
  }
} 