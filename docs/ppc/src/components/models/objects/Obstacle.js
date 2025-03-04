import { GameObject } from "./GameObject.js";

/**
 * Obstacle object class
 * @author @saqsy
 */
export class Obstacle extends GameObject {
  constructor(x, y, shape) {
    super(x, y, shape); // different shapes can be implemented
    this.x = x;
    this.y = y;
    this.spawnTime = millis(); // Record when the obstacle was created
    this.lifespan = 10000; // 10 seconds lifespan
  }

  /**
   * Function to check lifespan of the obstacle
   * @returns {boolean}
   */
  isExpired() {
    return millis() - this.spawnTime > this.lifespan;
  }
}