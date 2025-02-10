import { GameObject } from './GameObject.js';
import { CircleShape } from './CircleShape.js';

export class Puck extends GameObject {
    constructor() {
        super(width / 2, height / 2, new CircleShape(10)); // Puck radius of 15
        this.reset();
    }

    reset() {
        this.x = width / 2;
        this.y = height / 2;
        this.velocity.x = 0;
        this.velocity.y = 0;
    }

    update() {
        super.update();

        // Add friction
        // this.velocity.x *= 0.99;
        // this.velocity.y *= 0.99;

        // Check for scoring
        if (this.x+this.shape.radius <= super.margin) {  // Use super.margin
            if (this.y > goalY && this.y < goalY + goalHeight) {
                player2.score++;
                this.reset();
            }
        } else if (this.x >= width - super.margin) {  // Use super.margin
            if (this.y > goalY && this.y < goalY + goalHeight) {
                player1.score++;
                this.reset();
            }
        }
    }
}
