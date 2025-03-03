import PauseButton from "./ui/buttons/PauseButton.js";
import ExitButton from "./ui/buttons/ExitButton.js";
import { constants } from "../../core/config.js";

class GamePage {
    constructor(game) {
      this.game = game;
      this.pauseButton = new PauseButton (width / 2, constants.margin / 2, height * 0.05, height * 0.05, "Pause");
      this.exitButton = new ExitButton (width - 50, constants.margin / 2, width * 0.05, height * 0.04, "Exit");
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
      this.exitButton.reset();
    }
}
  
  export default GamePage;