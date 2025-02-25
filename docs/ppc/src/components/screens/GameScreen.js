import game from "../../core/Game.js";
import PauseButton  from "../models/ui/buttons/PauseButton.js";
import { constants } from "../../core/config.js";

// Game screen will be a singleton class
export class GameScreen {
  constructor() {
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

    // Draw Scoreboard
    game.scoreBoard.draw();

    game.gamePage.draw();

    if (game.firePowerUp.active) {
      game.firePowerUp.draw();
    }
  }

  checkButtonClicks() {
    game.gamePage.checkButtonClicks();
  }
}

const gameScreen = new GameScreen();
export default gameScreen;
