import { Shape } from "./Shape.js";
import { collisionUtils } from "../../../utils/collisionUtils.js";

export class RectShape extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  draw(x, y) {
      rectMode(CENTER);
      rect(x, y, this.width, this.height);

  }
  checkCollision(x1, y1, other, x2, y2) {
    if (other.constructor.name === "CircleShape") {
       return collisionUtils.circleToRect(x1, y1, this, x2, y2, other);
    }
    if (other.constructor.name === "RectShape") {
      return collisionUtils.rectToRect(x1, y1, this, x2, y2, other);
    }
    return false;
  }

  getBounds() {
    return {
      width: this.width,
      height: this.height,
    };
  }
}
