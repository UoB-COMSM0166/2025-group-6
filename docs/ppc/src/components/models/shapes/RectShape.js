import { Shape } from "./Shape.js";

export class RectShape extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  draw(x, y) {
    rect(x, y, this.width, this.height);
  }
  checkCollision(x1, y1, other, x2, y2) {
    if (other.constructor.name === "CircleShape") {
      collisionUtils.circleToRect(x1, y1, this, x2, y2, other);
    }
    if (other.constructor.name === "RectShape") {
      // to be implemented here
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
