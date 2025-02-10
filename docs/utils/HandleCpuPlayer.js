import gameState from "../models/GameState.js";

export function updateCPU() {
    // Reaction delay: slightly increased update frequency for faster reaction
    const reactionDelay = 0.30; // 30% chance to update per frame
    const predictionError = 0.1; // 10% error in prediction for more accuracy
    
    // Only update AI target if random check passes
    if (Math.random() < reactionDelay) {
        // Calculate AI target positions with less randomness
        let targetX = width * 0.75;
        let targetY = gameState.puck.y; // default to puck's Y
        
        if (gameState.puck.x > width / 2) {
            // Predict puck position with less error
            let predictedX = gameState.puck.x + gameState.puck.velocity.x * (1 + (Math.random() - 0.5) * predictionError);
            targetX = constrain(predictedX + 30, width / 2, width - gameState.margin - gameState.player2.shape.width / 2);
            
            // Use smaller randomness for AI offset, so it stays more focused
            if (gameState.puck.velocity.x > 0) {
                gameState.aiOffset = random(-10, 10);
            } else {
                gameState.aiOffset = random(-5, 5);
            }
            targetY = gameState.puck.y + gameState.aiOffset;
        } else {
            // When puck is far, the AI returns to default central defensive position
            targetX = width * 0.75;
            targetY = height / 2;
        }

        // Increase aggressiveness and remove extra random speed variation for precision
        const aggressiveness = 0.8; // Now 80% of max speed for quicker adjustments
        const maxSpeed = 25;
        
        // Calculate direction to target
        let dx = targetX - gameState.player2.x;
        let dy = targetY - gameState.player2.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let speed = Math.min(distance, maxSpeed * aggressiveness);  // Use consistent calculated speed
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
