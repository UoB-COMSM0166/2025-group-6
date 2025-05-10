
/**
 * Handles game win conditions and winner determination.
 */

export default class WinnerHandler {
    constructor(game) {
        this.game = game;
        this.winningScore = 10;
        this.winner = null;
    }

    update() {
        if (this.game.player1.score >= this.winningScore) {
            this.game.gameState = "winnerpage";
            this.game.winner = 1;
            this.game.resetGame();
        }
        else if (this.game.player2.score >= this.winningScore) {

            this.game.gameState = "winnerpage";
            this.game.winner = 2;
            this.game.resetGame();

        }
    }
}
