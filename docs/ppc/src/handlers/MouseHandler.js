import landingScreen from "../components/screens/LandingScreen.js";
import gameScreen from "../components/screens/GameScreen.js";
import winnerScreen from "../components/screens/WinnerScreen.js";
/**
 * Class to handler the mouse actions
 *
 */
export default class MouseHandler {
  constructor(game) {
    this.game = game;
    window.mousePressed = () => this.mousePressed();
  }

  update() {}
  // P5.js function that gets called mouse click occurs
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
