import game from "../../core/Game.js";


/**
 * Class for landing screen containing all functional and non functional elements in the game screen
 * includes:
 * method to draw entire landing screen including landing page and any future functional elements
 * method to check for button clicks
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