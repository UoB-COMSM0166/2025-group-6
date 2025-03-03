import PauseButton from "./ui/buttons/PauseButton.js";
import ExitButton from "./ui/buttons/ExitButton.js";
import { constants } from "../../core/config.js";

class GamePage {
    constructor(game) {
      this.game = game;
      this.pauseButton = new PauseButton (width * 0.7, constants.margin / 2, width * 0.05, height * 0.05, "Pause");
      this.exitButton = new ExitButton (width * 0.9, constants.margin / 2, width * 0.05, height * 0.04, "Quit");
    }

    draw() {
       this.pauseButton.draw();
       this.exitButton.draw();
    }

    checkButtonClicks(){
        this.pauseButton.handleClick();
        this.exitButton.handleClick();
    }

    reset () {
      this.pauseButton.reset();
      this.exitButton.resetGameScreen();
    }
}
  
  export default GamePage;