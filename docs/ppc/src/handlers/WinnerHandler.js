
// Handles game win conditions and winner determination.

export default class WinnerHandler {
    constructor(game) {
        this.game = game;
        this.winningScore = 1;
        this.winner = null;
    }

    update() {
        if (this.game.player1.score >= this.winningScore) {
            this.game.gameState = "winnerpage";
            this.game.winner = "Player";
            this.game.resetGame();
        }
        else if (this.game.player2.score >= this.winningScore) {

            this.game.gameState = "winnerpage";
            this.game.winner = "CPU";
            this.game.resetGame();
        }
    }
}
