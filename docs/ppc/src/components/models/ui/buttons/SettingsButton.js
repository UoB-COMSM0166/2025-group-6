import Button from "./Button.js";import ClickSoundButton from "./settingsButtons/ClickSoundButton.js";
import MouseControlButton from "./settingsButtons/MouseControlButton.js";
import game   from "../../../../core/Game.js";

class SettingsButton extends Button {
  constructor(x, y, w, h, label) {
    super(x, y, w, h, label);

    this.clickSoundButton = new ClickSoundButton(this.dialogBox.boxX, this.dialogBox.boxY -40, 150, 50, "Click");
    this.mouseControlButton = new MouseControlButton(this.dialogBox.boxX, this.dialogBox.boxY+ 40, 150, 50, "Mouse");
  }

  drawButtons () {
    this.clickSoundButton.draw();
    this.mouseControlButton.draw();
  }

  // temporary logic
  handleClick() {
    if (this.isMouseOver()) {
      game.gameEngine.soundHandler.playSound("click");

      this.dialogBox.visible = true;
    }

    if (this.dialogBox.visible && this.isMouseOver()) {
      this.clickSoundButton.handleClick();
      this.mouseControlButton.handleClick();
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