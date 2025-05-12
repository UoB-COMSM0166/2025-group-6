import landingScreen from "../components/screens/LandingScreen.js";
import gameScreen    from "../components/screens/GameScreen.js";
import winnerScreen  from "../components/screens/WinnerScreen.js";

/**
 * Class handling mouse click events based on game state
 * includes:
 * method to detect mouse presses and delegate button click checks
 * routes input to landing, game, or winner screen handlers accordingly
 *
 */

export default class MouseHandler {
  constructor(game) {
    this.game = game;
    window.mousePressed = () => this.mousePressed();
  }

  mousePressed() {
    if (this.game.gameState === "welcome") {
      landingScreen.checkButtonClicks();
    } else if (this.game.gameState === "gameboard") {
      gameScreen.checkButtonClicks();
    } else if (this.game.gameState === "winnerpage") {
      winnerScreen.checkButtonClicks();
    }
  }
}
