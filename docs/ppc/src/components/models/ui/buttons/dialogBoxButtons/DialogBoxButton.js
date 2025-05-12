/**
 *  Base class for button 0bjects to be used inside dialog box
 */
class DialogBoxButton {
    constructor(x, y, w, h, label) {
        this.x = x;
        this.y = y;
        this.w = w; 
        this.h = h; 
        this.label = label;

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

export default DialogBoxButton;