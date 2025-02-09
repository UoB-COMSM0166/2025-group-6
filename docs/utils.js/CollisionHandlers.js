   import {
     margin,
     boardWidth,
     boardHeight,
     puck,
   } from './sketch.js';



export function handleBoundaryCollisions(puck) {
    const friction = 0.98; // Friction coefficient
    const restitution = 0.8; // Bounciness factor
    
    // Top and bottom boundaries
    if (puck.y - puck.shape.radius <= margin) {
        // Prevent sticking by moving puck just outside boundary
        puck.y = margin + puck.shape.radius + 1;
        puck.velocity.y = -puck.velocity.y * restitution;
        puck.velocity.x *= friction;
    } else if (puck.y + puck.shape.radius >= height - margin) {
        // Prevent sticking by moving puck just outside boundary
        puck.y = height - margin - puck.shape.radius - 1;
        puck.velocity.y = -puck.velocity.y * restitution;
        puck.velocity.x *= friction;
    }

    // Left and right boundaries (excluding goals)
    if (puck.x - puck.shape.radius <= margin) {
        // Check if puck is within goal height
        if (puck.y < goalY || puck.y > goalY + goalHeight) {
            // Prevent sticking by moving puck just outside boundary
            puck.x = margin + puck.shape.radius + 1;
            puck.velocity.x = -puck.velocity.x * restitution;
            puck.velocity.y *= friction; // Apply friction consistently
        } else {
            // Goal scored for player 2
            player2.score++;
            puck.reset();
        }
    } else if (puck.x + puck.shape.radius >= width - margin) {
        // Check if puck is within goal height
        if (puck.y < goalY || puck.y > goalY + goalHeight) {
            // Prevent sticking by moving puck just outside boundary
            puck.x = width - margin - puck.shape.radius - 1;
            puck.velocity.x = -puck.velocity.x * restitution;
            puck.velocity.y *= friction; // Apply friction consistently
        } else {
            // Goal scored for player 1
            player1.score++;
            puck.reset();
        }
    }
}

