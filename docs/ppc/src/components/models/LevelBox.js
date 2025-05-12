import { constants } from "../../core/config.js";

/**
 * This class displays the current game level on the screen
 * includes:
 * method to draw level box on game page
 * method to reset level box when game ends
 */
export class LevelBox {
  constructor(game) {
    this.x = width * 0.10; // Reset x position
    this.y = constants.margin/2; // Reset y position
    this.game = game;
    this.textColor = '#FFFFFF';
    this.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    this.height = game.board.boardHeight * 0.05;
    this.width = game.board.boardWidth * 0.20;
  }

  draw() {
    push();

    fill(this.textColor);
    textSize(this.game.board.boardHeight * 0.05);
    textAlign(CENTER, CENTER);
    
    const centerX = this.x;
    const centerY = this.y;
    text(`Level: ${this.game.level}`, centerX, centerY);
    
    pop();
  }

  reset() {
    this.x = width * 0.10;
    this.y = constants.margin/2;
    this.width = width * 0.2; 
  }
} 