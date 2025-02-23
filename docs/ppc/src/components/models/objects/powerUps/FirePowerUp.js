import { constants } from "../../../../core/config.js";
import game from "../../../../core/Game.js";
import { RectShape } from "../../shapes/RectShape.js";
import { PowerUps } from "./PowerUps.js";

export class FirePowerUp extends PowerUps {
  constructor(x, y, width, height, shape) {
    super(x, y, width, height, shape);
  }

  draw() {
    push();
    
    // Scale down the size a bit
    const scaleFactor = 0.8;
    const adjustedWidth = this.width * scaleFactor;
    const adjustedHeight = this.height * scaleFactor;
    
    // Center the scaled flame
    const centerOffsetX = (this.width - adjustedWidth) / 2;
    const centerOffsetY = (this.height - adjustedHeight) / 2;
    
    // Draw outer glow
    fill(255, 69, 0, 50); // Semi-transparent orange
    noStroke();
    for(let i = 0; i < 3; i++) {
      triangle(
        this.x + centerOffsetX + adjustedWidth/2, this.y + centerOffsetY + (i * 2),
        this.x + centerOffsetX + adjustedWidth + (i * 2), this.y + centerOffsetY + adjustedHeight,
        this.x + centerOffsetX - (i * 2), this.y + centerOffsetY + adjustedHeight
      );
    }
    
    // Main flame - brighter orange
    fill(255, 100, 0);
    triangle(
      this.x + centerOffsetX + adjustedWidth/2, this.y + centerOffsetY,
      this.x + centerOffsetX + adjustedWidth, this.y + centerOffsetY + adjustedHeight,
      this.x + centerOffsetX, this.y + centerOffsetY + adjustedHeight
    );
    
    // Inner flames - bright yellow-orange
    fill(255, 160, 0);
    // Left inner flame
    triangle(
      this.x + centerOffsetX + adjustedWidth/3, this.y + centerOffsetY + adjustedHeight * 0.3,
      this.x + centerOffsetX + adjustedWidth/2, this.y + centerOffsetY + adjustedHeight * 0.9,
      this.x + centerOffsetX + adjustedWidth * 0.2, this.y + centerOffsetY + adjustedHeight * 0.9
    );
    
    // Right inner flame
    triangle(
      this.x + centerOffsetX + adjustedWidth * 2/3, this.y + centerOffsetY + adjustedHeight * 0.3,
      this.x + centerOffsetX + adjustedWidth * 0.8, this.y + centerOffsetY + adjustedHeight * 0.9,
      this.x + centerOffsetX + adjustedWidth/2, this.y + centerOffsetY + adjustedHeight * 0.9
    );
    
    // Core flame - brightest yellow
    fill(255, 200, 0);
    triangle(
      this.x + centerOffsetX + adjustedWidth/2, this.y + centerOffsetY + adjustedHeight * 0.2,
      this.x + centerOffsetX + adjustedWidth * 0.65, this.y + centerOffsetY + adjustedHeight * 0.7,
      this.x + centerOffsetX + adjustedWidth * 0.35, this.y + centerOffsetY + adjustedHeight * 0.7
    );
    
    pop();
  }
}