import Button from "./Button.js";
import { constants } from "../../../../core/config.js";

class SettingsButton extends Button {
  constructor(x, y, w, h, label) {
    super(x, y, w, h, label);
  }
  // temporary dialog box content
  loadContent() {
    this.dialogBox.content = constants.temporaryMsg;
  }

  // temporary logic
  handleClick() {
    if (this.isMouseOver()) {
      this.loadContent();
      this.dialogBox.visible = true;
    }
    if (this.dialogBox.visible) {
      this.dialogBox.handleClick();
    }
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2 + 2 * height * 0.07 + 20;
    this.w = width * 0.15;
    this.h = height * 0.07;
    this.dialogBox.reset();
  }
}

export default SettingsButton;
