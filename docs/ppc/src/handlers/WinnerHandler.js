
/**
 * Class handling win condition detection and endgame state transition
 * includes:
 * method to check if player or CPU has reached the winning score
 * updates game state, sets the winner, plays appropriate sound, and resets game
 *
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
            this.game.winner = "Player";
            this.game.resetGame();
            this.game.gamePaused = true;
          this.game.gameEngine.soundHandler.playSound("victory");    

        }
        else if (this.game.player2.score >= this.winningScore) {
            this.game.gameState = "winnerpage";
            this.game.winner = "CPU";
            this.game.resetGame();
            this.game.gamePaused = true;
        this.game.gameEngine.soundHandler.playSound("loose");    

        }
    }
    
}
