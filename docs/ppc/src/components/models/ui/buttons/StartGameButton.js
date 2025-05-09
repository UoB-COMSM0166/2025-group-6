import Button from "./Button.js";
import game from "../../../../core/Game.js";
import DialogBoxStartGame from "../DialogBoxStartGame.js";
class StartGameButton extends Button {
  constructor(x, y, w, h, label) {
    super(x, y, w, h, label);
    this.dialogBox = new DialogBoxStartGame();
  }
  
  handleClick() {
    if (this.isMouseOver()) {
      game.gameEngine.soundHandler.playSound("click");
      this.dialogBox.visible=true;
    }
    if (this.dialogBox.visible) {
      this.dialogBox.handleClick();
    }
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2; // Original positioning from LandingPage
    this.w = width * 0.15;
    this.h = height * 0.07;
    this.dialogBox.reset();
  }
}

export default StartGameButton;
