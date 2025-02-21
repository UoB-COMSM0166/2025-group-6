import { constants } from "../../../core/config.js";
import game from "../../../core/Game.js";
import { RectShape } from "../shapes/RectShape.js";
import { GameObject } from "./GameObject.js";

export class PowerUps extends GameObject {
  constructor(x, y, width, height, color) {
    super(x, y, new RectShape(width, height)); // different shapes can be implemented
    this.color = color;
    // this.speed = 3;
    // this.velocity = { x: 0, y: 3 };
    this.active = true;
    this.width = width;
    this.height = height;
  }

  draw() {
    // Save the current state
    push();
    
    // Set the fill color
    fill(this.color);
    noStroke();
    
    // Draw the rectangle
    const bounds = this.shape.getBounds();
    rect(this.x - bounds.width/2, this.y - bounds.height/2, 
         bounds.width, bounds.height);
    
    // Restore the previous state
    pop();
  }
// Later we'll need custom methods to update/draw the fire or any powerup

}