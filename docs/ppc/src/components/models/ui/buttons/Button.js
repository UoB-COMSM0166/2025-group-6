import DialogBox from "../DialogBox.js";

/**
 * Base class for all buttons in the game
 * includes:
 * method to draw  basic button which will be overridden in buttons with distinct styliing
 * method to check whether mouse position is over a button which can be used by all button objects 
 * in the game
 */

class Button {
    constructor(x, y, w, h, label) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.label = label;
      this.dialogBox = new DialogBox();
    }
    draw() {
      rectMode(CENTER);
            if (this.isMouseOver()) {
        fill(80, 80, 80, 180); 
        stroke(60); 
      } else {
        fill(50, 50, 50, 150); 
        stroke(30); 
      }
  
      stroke(255);
      strokeWeight(2);
      rect(this.x, this.y, this.w, this.h, 10);
      
      noStroke();
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(width*0.015);
      text(this.label, this.x, this.y);
    }

    isMouseOver() {
      return (
        mouseX > this.x - this.w / 2 &&
        mouseX < this.x + this.w / 2 &&
        mouseY > this.y - this.h / 2 &&
        mouseY < this.y + this.h / 2
      );
    }
  }
  
  export default Button;