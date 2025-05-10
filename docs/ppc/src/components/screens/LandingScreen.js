import game from "../../core/Game.js";

/**
 * This class is responsible for displaying the game's landing page and handles button interactions.
 */
class LandingScreen {
  draw() {
    game.landingPage.draw();
  }

  checkButtonClicks(){
    game.landingPage.checkButtonClicks();
  }
}

const landingScreen = new LandingScreen();
export default landingScreen;