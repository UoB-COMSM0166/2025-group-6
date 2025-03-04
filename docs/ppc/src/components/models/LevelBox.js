import { constants } from "../../core/config.js";


export class LevelBox {
  constructor(game) {
    this.x = width / 4; // Reset x position
    this.y = constants.margin/2; // Reset y position
    this.game = game;
    this.textColor = '#FFFFFF';
    this.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    this.height = constants.margin;
    this.width = width * 0.2; 
  }



  draw() {
    // Save current state
    push();
    
    // Draw background
    fill(this.backgroundColor);
    noStroke();
    rect(this.x, this.y, this.width, this.height, 5);
    
    // Draw text
    fill(this.textColor);
    textSize(18);
    textAlign(CENTER, CENTER);
    
    // Draw level
    const centerX = this.x;
    const centerY = this.y;
    text(`Level: ${this.game.level}`, centerX, centerY);
    
    // Restore state
    pop();
  }

  reset() {
    this.x = width / 4; // Reset x position
    this.y = constants.margin/2; // Reset y position
    this.width = width * 0.2; 
  }

  
} 