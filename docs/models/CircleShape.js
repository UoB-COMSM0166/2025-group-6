// Circle shape implementation

import { Shape } from "./Shape.js";
import { RectShape } from "./RectShape.js";

export class CircleShape extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }

    draw(x, y) {
        circle(x, y, this.radius * 2);
    }

    checkCollision(x1, y1, other) {
        if (other instanceof CircleShape) {
            return dist(x1, y1, other.x, other.y) < this.radius + other.radius;
        }
        if (other instanceof RectShape) {
            return other.circleRectCollision(x1, y1, other);
        }
        return false;
    }

    getBounds() {
        return {
            width: this.radius * 2,
            height: this.radius * 2
        };
    }

    // Encapsulated collision detection for Circle-Rectangle
    // circleRectCollision(circleX, circleY, rect) {
    //     let closestX = constrain(circleX, rect.x - rect.width / 2, rect.x + rect.width / 2);
    //     let closestY = constrain(circleY, rect.y - rect.height / 2, rect.y + rect.height / 2);

    //     let distance = dist(circleX, circleY, closestX, closestY);
    //     return distance < this.radius;
    // }
}
