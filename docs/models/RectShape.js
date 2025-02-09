import { Shape } from "./Shape.js";
import { CircleShape } from "./CircleShape.js";

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
        if (other instanceof CircleShape) {
            return this.circleRectCollision(x1, y1, this, x2, y2, other); // Use Circle's method
        }
        if (other instanceof RectShape) {
            return this.rectRectCollision(x1, y1, other);
        }
        return false;
    }

    getBounds() {
        return {
            width: this.width,
            height: this.height
        };
    }

    // Encapsulated collision detection for Rectangle-Rectangle
    rectRectCollision(x1, y1, other) {
        return !(
            x1 + this.width / 2 < other.x - other.width / 2 ||
            x1 - this.width / 2 > other.x + other.width / 2 ||
            y1 + this.height / 2 < other.y - other.height / 2 ||
            y1 - this.height / 2 > other.y + other.height / 2
        );
    }

    circleRectCollision(x1, y1, rect, x2, y2,other) {
        let closestX = constrain(x2, x1 - rect.width / 2, x1 + rect.width / 2);
        let closestY = constrain(y2, y1 - rect.height / 2, y1 + rect.height / 2);

        let distance = dist(x2, y2 , closestX, closestY);
        return distance < other.radius;
    }
}
