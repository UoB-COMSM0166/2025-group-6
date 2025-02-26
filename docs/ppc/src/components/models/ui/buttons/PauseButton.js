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
    rectMode(CENTER);
    
    // Check if the mouse is over the button
    if (this.isMouseOver()) {
      fill(80, 80, 80, 180); // Slightly lighter on hover
      stroke(60); // Brighter border on hover
    } else {
      fill(50, 50, 50, 150); // Default background
      stroke(30); // Default dark border
    }
    
    strokeWeight(2);
    rect(this.x, this.y, this.w, this.h, 10);
    
    // Draw the button label in white
    noStroke();
    fill(255);
    // textAlign(CENTER, CENTER);
    // textSize(20);
    // text(this.label, this.x, this.y);
    
    // Draw the pause/play icon
    stroke(0);
    strokeWeight(2);
    if (this.isPaused) {
      // Draw play triangle when paused
      const triangleSize = this.h * 0.3;
      noStroke();
      fill(255);
      triangle(
        this.x - triangleSize/4, this.y - triangleSize,
        this.x - triangleSize/4, this.y + triangleSize,
        this.x + triangleSize, this.y
      );
    } else {
      // Draw pause bars when playing
      const barWidth = this.h * 0.1;
      const barHeight = this.h * 0.4;
      const spacing = this.h * 0.15;
      
      noStroke();
      fill(255);
      rect(this.x - spacing, this.y, barWidth, barHeight);
      rect(this.x + spacing, this.y, barWidth, barHeight);
    }
  }
  
  // Toggle the pause state when clicked
  handleClick() {
    if (this.isMouseOver()) {
      this.isPaused = !this.isPaused;
      this.label = this.isPaused ? "Play" : "Pause";
      game.gamePaused = this.isPaused;
    }
  }
  

  resize() {
    this.x = width * 0.7;    
    this.y = constants.margin / 2;    
    this.w = width * 0.05;    
    this.h = height * 0.04;
  }
}

export default PauseButton;