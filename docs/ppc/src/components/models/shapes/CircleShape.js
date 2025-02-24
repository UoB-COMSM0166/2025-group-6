// Circle shape implementation

import { Shape } from "./Shape.js";
import { collisionUtils } from "../../../utils/collisionUtils.js";

export class CircleShape extends Shape {
  constructor(radius,type) {
    super();
    this.radius = radius;
    this.width = radius * 2;
    this.height = radius * 2;
    this.type = type;
  }

  draw(x, y) {
    if(this.type == "puck"){
      fill(0);
    }
    circle(x, y, this.radius*2);
  }

  checkCollision(x1, y1, vel1, other, x2, y2, vel2) {
    if (other.constructor.name === "CircleShape") {
      return collisionUtils.circleToCircle(
        x1,
        y1,
        vel1,
        this,
        x2,
        y2,
        other,
        vel2
      );
    }
    if (other.constructor.name === "RectShape") {
      return collisionUtils.circleToRect(
        x1,
        y1,
        vel1,
        this,
        x2,
        y2,
        other,
        vel2
      );
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
