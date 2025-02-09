// Shape interface to define required methods
export class Shape {
    draw(x, y) {
        throw new Error("Draw method must be implemented");
    }

    checkCollision(x1, y1, other) {
        throw new Error("Collision check must be implemented");
    }

    getBounds() {
        throw new Error("getBounds must be implemented");
    }
}

