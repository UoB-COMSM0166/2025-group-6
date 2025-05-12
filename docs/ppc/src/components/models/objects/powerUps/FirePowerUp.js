
import { PowerUps } from "./PowerUps.js";

export class FirePowerUp extends PowerUps {
  constructor(x, y, width, height, shape) {
    super(x, y, width, height, shape);
  }

  draw() {
    push();
    
    const scaleFactor = 0.8;
    const adjustedWidth = this.width * scaleFactor;
    const adjustedHeight = this.height * scaleFactor;
    
    const centerOffsetX = (this.width - adjustedWidth) / 2;
    const centerOffsetY = (this.height - adjustedHeight) / 2;
    
    fill(255, 69, 0, 50); 
    noStroke();
    for(let i = 0; i < 3; i++) {
      triangle(
        this.x + centerOffsetX + adjustedWidth/2, this.y + centerOffsetY + (i * 2),
        this.x + centerOffsetX + adjustedWidth + (i * 2), this.y + centerOffsetY + adjustedHeight,
        this.x + centerOffsetX - (i * 2), this.y + centerOffsetY + adjustedHeight
      );
    }
    
    fill(255, 100, 0);
    triangle(
      this.x + centerOffsetX + adjustedWidth/2, this.y + centerOffsetY,
      this.x + centerOffsetX + adjustedWidth, this.y + centerOffsetY + adjustedHeight,
      this.x + centerOffsetX, this.y + centerOffsetY + adjustedHeight
    );
    
    fill(255, 160, 0);
    triangle(
      this.x + centerOffsetX + adjustedWidth/3, this.y + centerOffsetY + adjustedHeight * 0.3,
      this.x + centerOffsetX + adjustedWidth/2, this.y + centerOffsetY + adjustedHeight * 0.9,
      this.x + centerOffsetX + adjustedWidth * 0.2, this.y + centerOffsetY + adjustedHeight * 0.9
    );
    
    triangle(
      this.x + centerOffsetX + adjustedWidth * 2/3, this.y + centerOffsetY + adjustedHeight * 0.3,
      this.x + centerOffsetX + adjustedWidth * 0.8, this.y + centerOffsetY + adjustedHeight * 0.9,
      this.x + centerOffsetX + adjustedWidth/2, this.y + centerOffsetY + adjustedHeight * 0.9
    );
    
    fill(255, 200, 0);
    triangle(
      this.x + centerOffsetX + adjustedWidth/2, this.y + centerOffsetY + adjustedHeight * 0.2,
      this.x + centerOffsetX + adjustedWidth * 0.65, this.y + centerOffsetY + adjustedHeight * 0.7,
      this.x + centerOffsetX + adjustedWidth * 0.35, this.y + centerOffsetY + adjustedHeight * 0.7
    );
    
    pop();
  }
}