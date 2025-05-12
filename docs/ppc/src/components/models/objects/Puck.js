import { GameObject } from './GameObject.js';
import { CircleShape } from '../shapes/CircleShape.js';


/**
 * includes:
 * method to resret puck positions and velocity based on different game modes
 * method to update puck state
 */

export class Puck extends GameObject {
    constructor() {
        super(width / 2, height / 2, new CircleShape(width * 0.012,"puck"));
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
    }
}
