import game from "../../core/Game.js";

/**
 * Class for game screen containing all functional and non functional elements in the game screen
 * includes:
 * method to draw entire game screen including game page, scoreboard, level box etc
 * method to check for button clicks
 */

export class GameScreen {
  constructor() {
    this.backgroundColor = 255; 
  }

 
  draw() {
    background(this.backgroundColor);

    game.board.draw();

    fill(255, 0, 0);
    game.player1.draw();
    fill(0, 0, 255);
    game.player2.draw();

    fill(255);
    ellipseMode(RADIUS);
    game.puck.draw();

    game.scoreBoard.draw();

    game.levelBox.draw();

    game.gamePage.draw();

    if (game.firePowerUp.active) {
      game.firePowerUp.draw();
    }
    game.gameEngine.obstacleHandler.drawObstacles();
  }

  checkButtonClicks() {
    game.gamePage.checkButtonClicks();
  }
}

const gameScreen = new GameScreen();
export default gameScreen;
