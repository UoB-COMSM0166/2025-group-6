import game from "../../core/Game.js";


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