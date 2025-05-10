import game from "../../core/Game.js";
import PauseButton  from "../models/ui/buttons/PauseButton.js";
import { constants } from "../../core/config.js";

/**
 * This class integrates GameBoard and GamePageButton to create the main gameplay interface.
 */
export class GameScreen {
  constructor() {
    this.backgroundColor = 255; // white background
  }

  /**
   * Renders the full game interface.
   */
  draw() {
    // Clear and set background
    background(this.backgroundColor);

    // Drawing game board
    game.board.draw();

    // Drawing player 1 (red)
    fill(255, 0, 0);
    game.player1.draw();

    // Drawing player 2 (blue)
    fill(0, 0, 255);
    game.player2.draw();

    // Drawing puck
    fill(255);
    ellipseMode(RADIUS);
    game.puck.draw();

    // Drawing Scoreboard
    game.scoreBoard.draw();

    // Drawing level at game screen.
    game.levelBox.draw();

    // Drawing gamePage buttons.
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
