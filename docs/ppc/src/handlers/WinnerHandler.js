
export default class WinnerHandler {
    constructor(game) {
        this.game = game;
        this.winningScore = 1; // Default score needed to win
        // this.gameOver = false;
        this.winner = null; // Will be 1 or 2 when someone wins
        // this.winnerName = "";
        // this.winnerColor = null;
    }

    update() {
        // Return immediately if the game is already over
        // Check if player 1 has won
        if (this.game.player1.score >= this.winningScore) {
            // this.gameOver = true;
            this.game.gameState = "winnerpage";
            this.winner = 1;
            // this.winnerName = "Player 1";
            // this.winnerColor = color(255, 0, 0); // Red for player 1
            // this.handleGameOver();
        }
        // Check if player 2 has won
        else if (this.game.player2.score >= this.winningScore) {
            // this.gameOver = true;
            this.game.gameState = "winnerpage";
            this.winner = 2;
            // this.winnerName = "Player 2";
            // this.winnerColor = color(0, 0, 255); // Blue for player 2
            // this.handleGameOver();
        }
    }
}
    // Metho to set a custom winning score
//     setWinningScore(score) {
//     //     if (score > 0) {
//     //         this.winningScore = score;
//     //     }
//     // }
//
//     // Method to get winner information for the winner page
//
// }
