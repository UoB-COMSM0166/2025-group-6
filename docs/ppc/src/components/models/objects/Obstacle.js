import { GameObject } from "./GameObject.js";

/**
 * includes:
 * method to check if an obstacle has expired
 * 
 * Rest of implementation logic for obstacles can be found in obstacle handler class
 */

export class Obstacle extends GameObject {
  constructor(x, y, shape) {
    super(x, y, shape); 
    this.x = x;
    this.y = y;
    this.spawnTime = millis(); 
    this.lifespan = 10000; 
  }

  isExpired() {
    return millis() - this.spawnTime > this.lifespan;
  }
}