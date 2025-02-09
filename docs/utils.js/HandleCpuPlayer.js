import gameState from "../models/GameState.js";

export function updateCPU() {
    // Reaction delay - AI will only update its target position periodically
    const reactionDelay = 0.05; // 5% chance to update per frame
    const predictionError = 0.2; // 20% error in prediction
    
    // Only update AI target if random check passes
    if (Math.random() < reactionDelay) {
        // Add randomness to target Y position
        let targetY = gameState.puck.y + gameState.aiOffset;
        let targetX = width * 0.75;
        
        // Predict puck position with some error
        if (gameState.puck.x > width/2) {
            // Calculate predicted X position with error
            let predictedX = gameState.puck.x + gameState.puck.velocity.x * (1 + (Math.random() - 0.5) * predictionError);
            targetX = constrain(predictedX + 30, width/2, width - gameState.margin - gameState.player2.shape.width/2);
            
            // Randomize defensive position when puck is coming towards AI
            if (gameState.puck.velocity.x > 0) {
                // More aggressive when puck is moving towards AI
                gameState.aiOffset = random(-50, 50);
            } else {
                // More defensive when puck is moving away
                gameState.aiOffset = random(-20, 20);
            }
        } else {
            // Return to default position with some randomness when puck is far
            targetX = width * 0.75 + random(-30, 30);
            targetY = height/2 + random(-50, 50);
        }

        // Add "personality" to AI movement
        const aggressiveness = 0.7; // 70% of max speed
        const maxSpeed = 15;
        
        // Calculate direction to target
        let dx = targetX - gameState.player2.x;
        let dy = targetY - gameState.player2.y;
        
        // Apply speed limit with randomness
        let speed = Math.min(Math.sqrt(dx * dx + dy * dy), maxSpeed * aggressiveness);
        speed *= (0.8 + Math.random() * 0.4); // Random speed variation
        
        // Move towards target at calculated speed
        if (dx !== 0 || dy !== 0) {
            let angle = Math.atan2(dy, dx);
            gameState.player2.move(
                gameState.player2.x + Math.cos(angle) * speed,
                gameState.player2.y + Math.sin(angle) * speed
            );
        }
    }
}