import gameState from '../models/GameState.js';

export function isMouseOverButton(x, y, w, h) {
    return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}

function mousePressed() {
    if (gameState.screen === 'welcome') {
        let buttonWidth = 200;
        let buttonHeight = 50;
        let buttonY = height / 2;
        let spacing = 30;
        
        // Check if single player or multiplayer button is clicked
        if (isMouseOverButton(width/2 - buttonWidth/2 - spacing, buttonY-buttonHeight/2, buttonWidth, buttonHeight)) {
            gameState.gameMode = 'single';
            gameState.screen = 'game';
            gameState.initializeGame();
        } else if (isMouseOverButton(width/2 + buttonWidth/2 + spacing, buttonY-buttonHeight/2, buttonWidth, buttonHeight)) {
            gameState.gameMode = 'multi';
            gameState.screen = 'game';
            gameState.initializeGame();
        }
    } else {
        // Check if exit button is clicked
        if (mouseX > width - gameState.exitButtonSize - 10 && mouseX < width - 10 &&
            mouseY > 10 && mouseY < 10 + gameState.exitButtonSize) {
            gameState.screen = 'welcome';
        }
    }
}

window.mousePressed = mousePressed;