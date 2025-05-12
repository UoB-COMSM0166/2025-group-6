
import { GameObject } from "../GameObject.js";

/**
 * Base class for all powerups
 * All powerup objects should extend this to have common behaviour
 */


export class PowerUps extends GameObject {
  constructor(x, y, width, height, shape) {
    super(x, y, shape);
    this.active = false;
    this.width = width;
    this.height = height;
    this.effect =false;
    this.leftSide =undefined;
  }

  draw() {
  }

}