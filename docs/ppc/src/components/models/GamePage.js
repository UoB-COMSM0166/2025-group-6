import PauseButton from "./ui/buttons/PauseButton.js";
import { constants } from "../../core/config.js";

class GamePage {
    constructor(game) {
      this.game = game;
      this.welcomeImg = "";
      this.pauseButton = new PauseButton(
        width * 0.7,
        constants.margin / 2,
        width * 0.05,
        height * 0.05,
        "Pause"
      );
    }
  

    draw() {
       this.pauseButton.draw();
    }

    checkButtonClicks(){
        this.pauseButton.handleClick();
    }
}
  
  export default GamePage;