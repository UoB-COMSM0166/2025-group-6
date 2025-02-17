// Circle shape implementation

import { Shape } from './Shape.js';
import { collisionUtils } from '../../../utils/collisionUtils.js';

export class CircleShape extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }

    draw(x, y) {
        fill(0);
        circle(x, y, this.radius * 2);
    }

    checkCollision(x1, y1, other, x2, y2) { 
        
        if (other.constructor.name === 'CircleShape') {
            // to be implemented later if needed
        }
        if (other.constructor.name === 'RectShape') {
            collisionUtils.circleToRect(x1, y1, this, x2, y2, other); 
        }
        return false;
    }

    getBounds() {
        return {
            width: this.radius * 2,
            height: this.radius * 2
        };
    }


}
