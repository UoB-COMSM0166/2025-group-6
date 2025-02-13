import game from "../../core/Game.js";

export class GameScreen {
    constructor() {
        // Initialize any screen-specific properties
        this.backgroundColor = 255; // white background
    }

    draw() {
        // Clear and set background
        background(this.backgroundColor);
        
        // Draw game board
        game.board.draw();
        
        // Draw player 1 (red)
        fill(255, 0, 0);
        game.player1.draw();
        
        // Draw player 2 (blue)
        fill(0, 0, 255);
        game.player2.draw();
        
        // Draw puck
        fill(255);
        ellipseMode(RADIUS);
        game.puck.draw();
    }

}

const gameScreen =new GameScreen();
export default gameScreen;

