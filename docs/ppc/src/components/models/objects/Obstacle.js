import { GameObject } from "./GameObject.js";

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