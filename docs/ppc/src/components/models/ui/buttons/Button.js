class Button {
    constructor(x, y, w, h, label) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.label = label;
      this.showDialogBox = false; // Controls whether the instruction box is displayed
      this.content = "";
      this.closeButton = undefined;
    }
    
    draw() {
      rectMode(CENTER);
      
      // Check if the mouse is over the button
      if (this.isMouseOver()) {
        fill(80, 80, 80, 180); // Slightly lighter and more visible on hover
        stroke(60); // Brighter border on hover
      } else {
        fill(50, 50, 50, 150); // Default background
        stroke(30); // Default dark border
      }
  
      stroke(255);
      strokeWeight(2);
      rect(this.x, this.y, this.w, this.h, 10);
      
      // Draw the button label in white
      noStroke();
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(25);
      text(this.label, this.x, this.y);
    }

    drawDialogBox() {
      let boxX = width / 2;
      let boxY = height / 2;
      let boxW = width * 0.4;
      let boxH = height * 0.5;

      fill(30, 30, 30, 220); // Dark semi-transparent background
      stroke(255);
      strokeWeight(2);
      rect(boxX, boxY, boxW, boxH, 20);

      fill(255);
      noStroke();
      textAlign(LEFT, TOP);
      textSize(18);
      let margin = 20;
      text(this.content, boxX, boxY, boxW - margin * 2, boxH - margin * 5);

      // Close button
      let closeX = boxX + boxW / 2 - 25;
      let closeY = boxY - boxH / 2 + 25;
      let closeSize = 30;

      fill(200, 50, 50);
      rect(closeX, closeY, closeSize, closeSize, 5);
      fill(255);
      textSize(20);
      textAlign(CENTER, CENTER);
      text("X", closeX, closeY);

      // Store close button position for click detection
      // this.closeButton = { x: closeX, y: closeY, size: closeSize };
    }
    
    handleCloseClick() {
      if (this.showDialogBox && this.closeButton) {
          let { x, y, size } = this.closeButton;
          if (
              mouseX > x - size / 2 &&
              mouseX < x + size / 2 &&
              mouseY > y - size / 2 &&
              mouseY < y + size / 2
          ) {
              this.showDialogBox = false; // Hide the instructions box
          }
      }
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