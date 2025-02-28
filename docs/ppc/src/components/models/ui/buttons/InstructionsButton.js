import Button from "./Button.js";

class InstructionsButton extends Button {
  constructor(x, y, w, h, label) {
    super(x, y, w, h, label);
  }

  handleClick() {
    if (this.isMouseOver()) {
      this.loadInstructions();
      this.dialogBox.visible = true;
    }
    if (this.dialogBox.visible) {
      this.dialogBox.handleClick();
    }
  }

  loadInstructions() {
    this.dialogBox.content = loadStrings("./assets/textFiles/Instructions.txt"); // Synchronous file read
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
