class Button {
    constructor(x, y, w, h, label) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.label = label;
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
    
        strokeWeight(2);
        rect(this.x, this.y, this.w, this.h, 10);
        
        // Draw the button label in white
        noStroke();
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(20);
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
  