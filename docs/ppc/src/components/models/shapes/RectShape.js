import { Shape } from "./Shape.js";
import { collisionUtils } from "../../../utils/collisionUtils.js";


/**
 * All objects having rectangle shape wil be using this class to draw rectangle shape
 * These are injected into object claases and has a composition relation with object classes
 * includes:
 * method to draw the shape
 * method to check collisions between rectangle shaped objects
 * method to get bounds of rectangle shaped objects
 */


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
  checkCollision(x1, y1,vel1, other, x2, y2,vel2) {
    if (other.constructor.name === "CircleShape") {
       return collisionUtils.circleToRect(x1, y1,vel1, this, x2, y2, other,vel2);
    }
    if (other.constructor.name === "RectShape") {
      return collisionUtils.rectToRect(x1, y1,vel1,this, x2, y2, other, vel2);
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
