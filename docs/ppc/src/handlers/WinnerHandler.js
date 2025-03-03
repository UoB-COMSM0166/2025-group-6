
export default class WinnerHandler {
    constructor(game) {
        this.game = game;
        this.winningScore = 10; // Default score needed to win
        this.winner = null; // Will be 1 or 2 when someone wins
    }

    update() {
        // Return immediately if the game is already over
        // Check if player 1 has won
        if (this.game.player1.score >= this.winningScore) {
            // this.gameOver = true;
            
            this.game.gameState = "winnerpage";
            this.game.winner = 1;
            this.game.resetGame();
        }
        // Check if player 2 has won
        else if (this.game.player2.score >= this.winningScore) {

            this.game.gameState = "winnerpage";
            this.game.winner = 2;
            this.game.resetGame();

        }
    }
}
