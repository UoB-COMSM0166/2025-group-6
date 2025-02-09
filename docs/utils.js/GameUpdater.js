import gameState from '../models/GameState.js';
import { handleCollisions } from './CollisionHandlers.js';
import { updateCPU } from './HandleCpuPlayer.js';

export function updateGame() {
    if (gameState.screen !== 'game') return;

    // Player 1 movement
    if (mouseX < width/2) { // Only allow movement on left side
        gameState.player1.move(
            constrain(mouseX, gameState.margin + gameState.player1.shape.width/2, width/2 - gameState.player1.shape.width/2),
            constrain(mouseY, gameState.margin + gameState.player1.shape.height/2, height - gameState.margin - gameState.player1.shape.height/2)
        );
    }

    // Player 2 movement
    if (gameState.gameMode === 'multi') {
        if (mouseX > width/2) { // Only allow movement on right side
            gameState.player2.move(
                constrain(mouseX, width/2 + gameState.player2.shape.width/2, width - gameState.margin - gameState.player2.shape.width/2),
                constrain(mouseY, gameState.margin + gameState.player2.shape.height/2, height - gameState.margin - gameState.player2.shape.height/2)
            );
        }
    } else {
        updateCPU();
    }

    // Update positions
    gameState.player1.update();
    gameState.player2.update();
    gameState.puck.update();

    // Check collisions
    handleCollisions();
}