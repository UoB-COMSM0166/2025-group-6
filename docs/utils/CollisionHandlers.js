import gameState from '../models/GameState.js';

export function handleBoundaryCollisions(puck) {
    const friction = 0.98; // Friction coefficient
    const restitution = 0.8; // Bounciness factor
    const boost = 1.05;    // Boost factor to increase speed after collisions
    
    // Top and bottom boundaries
    if (puck.y - puck.shape.radius <= gameState.margin) {
        // Prevent sticking by moving puck just outside boundary
        puck.y = gameState.margin + puck.shape.radius + 1;
        puck.velocity.y = -puck.velocity.y * restitution * boost;
        puck.velocity.x *= friction * boost;
    } else if (puck.y + puck.shape.radius >= height - gameState.margin) {
        // Prevent sticking by moving puck just outside boundary
        puck.y = height - gameState.margin - puck.shape.radius - 1;
        puck.velocity.y = -puck.velocity.y * restitution * boost;
        puck.velocity.x *= friction * boost;
    }

    // Left and right boundaries (excluding goals)
    if (puck.x - puck.shape.radius <= gameState.margin) {
        // Check if puck is within goal height
        if (puck.y < gameState.goalY || puck.y > gameState.goalY + gameState.goalHeight) {
            // Prevent sticking by moving puck just outside boundary
            puck.x = gameState.margin + puck.shape.radius + 1;
            puck.velocity.x = -puck.velocity.x * restitution * boost;
            puck.velocity.y *= friction * boost;
        } else {
            // Goal scored for player 2
            gameState.player2.score++;
            puck.reset();
        }
    } else if (puck.x + puck.shape.radius >= width - gameState.margin) {
        // Check if puck is within goal height
        if (puck.y < gameState.goalY || puck.y > gameState.goalY + gameState.goalHeight) {
            // Prevent sticking by moving puck just outside boundary
            puck.x = width - gameState.margin - puck.shape.radius - 1;
            puck.velocity.x = -puck.velocity.x * restitution * boost;
            puck.velocity.y *= friction * boost;
        } else {
            // Goal scored for player 1
            gameState.player1.score++;
            puck.reset();
        }
    }
}

export function handleMalletPuckCollision(mallet, puck) {
    // Find the closest point on the rectangle to the circle's center
    let closestX = constrain(puck.x, mallet.x - mallet.shape.width/2, mallet.x + mallet.shape.width/2);
    let closestY = constrain(puck.y, mallet.y - mallet.shape.height/2, mallet.y + mallet.shape.height/2);
    
    // Calculate collision angle from closest point
    let dx = puck.x - closestX;
    let dy = puck.y - closestY;
    let angle = atan2(dy, dx);
    
    // Calculate mallet's effective speed at the collision point
    let relativeX = closestX - mallet.x;
    let relativeY = closestY - mallet.y;
    let speed = sqrt(mallet.velocity.x * mallet.velocity.x + mallet.velocity.y * mallet.velocity.y);
    
    // Add rotational effect based on where the puck hits the paddle
    let spinEffect = (relativeY / (mallet.shape.height/2)) * 0.5; // -0.5 to 0.5
    angle += spinEffect;
    
    const maxSpeed = 20;
    const boost = 1.05; // Boost factor for mallet collisions
    
    // Transfer momentum with a boost applied to the calculated speed
    puck.velocity.x = cos(angle) * min(speed + 15, maxSpeed) * boost;
    puck.velocity.y = sin(angle) * min(speed + 15, maxSpeed) * boost;
}

export function handleCollisions() {
    if (gameState.player1.checkCollision(gameState.puck)) {
        handleMalletPuckCollision(gameState.player1, gameState.puck);
    }
    if (gameState.player2.checkCollision(gameState.puck)) {
        handleMalletPuckCollision(gameState.player2, gameState.puck);
    }

    handleBoundaryCollisions(gameState.puck);
}

