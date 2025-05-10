import Button from "./Button.js";
import ClickButton       from "./settingsButtons/ClickButton.js";
import MouseControlButton from "./settingsButtons/MouseControlButton.js";
import game              from "../../../../core/Game.js";

class SettingsButton extends Button {
  constructor(x, y, w, h, label) {
    super(x, y, w, h, label);
    this.clickSoundButton    = new ClickButton(this.dialogBox.boxX, this.dialogBox.boxY - 40, 150, 50);
    this.mouseControlButton  = new MouseControlButton(this.dialogBox.boxX, this.dialogBox.boxY + 40, 150, 50, "Mouse");
 
  this.clickSoundButton.dialogBox   = this.dialogBox;
   this.mouseControlButton.dialogBox = this.dialogBox;
  }

  drawButtons() {
    this.clickSoundButton.draw();
    this.mouseControlButton.draw();
  }

  handleClick() {
    // Open the settings dialog & play click
    if (this.isMouseOver()) {
      game.gameEngine.soundHandler.playSound("click");
      this.dialogBox.visible = true;
    }

    // Delegate to the toggles & close-X
    if (this.dialogBox.visible) {
      this.dialogBox.handleClick();
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
