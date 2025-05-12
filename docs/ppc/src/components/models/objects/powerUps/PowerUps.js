
import { GameObject } from "../GameObject.js";

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