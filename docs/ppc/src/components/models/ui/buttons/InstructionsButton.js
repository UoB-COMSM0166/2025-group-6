import Button from "./Button.js";
import game from "../../../../core/Game.js";

class InstructionsButton extends Button {
  constructor(x, y, w, h, label) {
    super(x, y, w, h, label);
  }

  handleClick() {
    if (this.isMouseOver()) {
    game.gameEngine.soundHandler.playSound("click");

      this.loadInstructions();
      this.dialogBox.visible = true;
    }
    if (this.dialogBox.visible) {
      this.dialogBox.handleClick();
    }
  }

  loadInstructions() {
    this.dialogBox.content =[
    "Use the arrow keys or the mouse to move your paddle.",
    "Press SPACE to pause the game.",
    "First to 10 goals wins!",
    "Score three in a row to spawn a Fire Power-Up.",
    "Watch out for spinning obstacles!"
  ].join("\n");; // Synchronous file read
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2 + height * 0.07 + 10; // Original positioning from LandingPage
    this.w = width * 0.15;
    this.h = height * 0.07;
    this.dialogBox.reset();
  }
}

export default InstructionsButton;
