import Button from "./Button.js";
import game from "../../../../core/Game.js";

class RestartGameButton extends Button {
  constructor(x, y, w, h, label) {
    super(x, y, w, h, label);
  }
  
  handleClick() {
    if (this.isMouseOver()) {
      game.gameEngine.soundHandler.playSound("click");
      game.winner = null;
      game.gameState = "gameboard";
    }
    if (this.dialogBox.visible) {
      this.dialogBox.handleClick();
    }
  }

  reset() {
    this.x = width/3 + 10;
    this.y = height / 2; // Original positioning from LandingPage
    this.w = width * 0.15;
    this.h = height * 0.07;
    this.dialogBox.reset();
  }
}

export default RestartGameButton;
