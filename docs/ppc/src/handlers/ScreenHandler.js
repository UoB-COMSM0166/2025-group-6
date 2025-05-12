import landingScreen from "../components/screens/LandingScreen.js";
import gameScreen    from "../components/screens/GameScreen.js";
import winnerScreen  from "../components/screens/WinnerScreen.js";




export default class ScreenHandler {
  constructor(game) {
    this.game = game;
  }

  update() {
    if (this.game.gameState === "welcome") {
      landingScreen.draw();
    } else if (this.game.gameState === "gameboard") {
      gameScreen.draw();
    } else if(this.game.gameState === "winnerpage"){
      winnerScreen.draw();
    }
  }
}
