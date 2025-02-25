import game from "../../core/Game.js";

// Game screen will be a singleton class
class LandingScreen {
  constructor() {
    this.backgroundColor = 255; // white background
  }

  draw() {
    game.landingPage.draw();
  }

  checkButtonClicks(){
    game.landingPage.checkButtonClicks();
  }
  
}

const landingScreen = new LandingScreen();
export default landingScreen;
