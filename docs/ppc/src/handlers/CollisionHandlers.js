export class CollisionHandler {
    constructor(game) {
        this.game = game;
    }

    // Main update method that gets called each frame
    update() {
        this.checkMalletPuckCollisions();
        this.checkWallCollisions();
    }

    checkMalletPuckCollisions() {
        // Check collisions between mallets and puck
        if (this.game.player1.checkCollision(this.game.puck)) {
            this.handleMalletPuckCollision(this.game.player1, this.game.puck);
        }
        if (this.game.player2.checkCollision(this.game.puck)) {
            this.handleMalletPuckCollision(this.game.player2, this.game.puck);
        }
    }

    handleMalletPuckCollision(mallet, puck) {
        // Handle collision physics and response
        // Calculate new velocities, positions, etc.
    }

    checkWallCollisions() {
        // Check and handle collisions with walls/boundaries
    }

    
    circleRectCollision(x1, y1, rect, x2, y2,other) {
        let closestX = constrain(x2, x1 - rect.width / 2, x1 + rect.width / 2);
        let closestY = constrain(y2, y1 - rect.height / 2, y1 + rect.height / 2);

        let distance = dist(x2, y2 , closestX, closestY);
        return distance < other.radius;
    }
}