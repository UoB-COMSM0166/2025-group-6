import Button from './Button.js';
import { constants } from "../../../../core/config.js";
import game from '../../../../core/Game.js';

class PauseButton extends Button {
  constructor(x, y, w, h,label) {
    super(x, y, w, h, label); 
    this.isPaused = false; 
  }
  
  // Override draw method to customize appearance
  draw() {
    push();
    ellipseMode(CENTER);

    // Check if the mouse is over the button
    if (this.isMouseOver()) {
      fill(80, 80, 80, 180); // Slightly lighter on hover
      stroke(60); // Brighter border on hover
    } else {
      fill(50, 50, 50, 150); // Default background
      stroke(30); // Default dark border
    }

    stroke(255);
    strokeWeight(3);
    ellipse(this.x, this.y, this.w, this.h);

    // Draw the button label in white
    noStroke();
    fill(255);
    if (this.isPaused) {
      // Draw play triangle when paused
      const triangleSize = this.h * 0.3;
      triangle(
          this.x - triangleSize / 1.5, this.y - triangleSize,
          this.x - triangleSize / 1.5, this.y + triangleSize,
          this.x + triangleSize, this.y
      );
    } else {
      // Draw pause bars when playing
      const barWidth = this.h * 0.15;
      const barHeight = this.h * 0.6;
      const spacing = this.h * 0.15;

      rect(this.x - spacing, this.y, barWidth, barHeight);
      rect(this.x + spacing, this.y, barWidth, barHeight);
    }
    pop();
  }
  
  // Toggle the pause state when clicked
  handleClick() {
    if (this.isMouseOver()) {
      this.isPaused = !this.isPaused;
      this.label = this.isPaused ? "Play" : "Pause";
      game.gamePaused = this.isPaused;
      if (this.isPaused) {
        game.gameEngine.soundHandler.pauseAll();
      } 
      else {
        game.gameEngine.soundHandler.resumeAll();
      }
    }
  }

  reset() {
    this.x = width / 2;
    this.y = constants.margin / 2;
    // this.w = height * 0.05;
    // this.h = height * 0.05;
  }
}

export default PauseButton;