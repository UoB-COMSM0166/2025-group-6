import Button from "./Button.js";
import MusicButton from "./settingsButtons/MusicButton.js";
import ClickSoundButton from "./settingsButtons/ClickSoundButton.js";

class SettingsButton extends Button {
  constructor(x, y, w, h, label) {
    super(x, y, w, h, label);

    this.musicButton = new MusicButton(this.dialogBox.boxX, this.dialogBox.boxY - 40, 150, 50, "Music");
    this.clickSoundButton = new ClickSoundButton(this.dialogBox.boxX, this.dialogBox.boxY + 40, 150, 50, "Click");
  }

  drawButtons () {
    this.musicButton.draw(); // ✅ Draw Music Button inside dialog
    this.clickSoundButton.draw(); // ✅ Draw Click Button inside dialog
  }

  // temporary logic
  handleClick() {
    if (this.isMouseOver()) {
      this.dialogBox.visible = true;
    }

    if (this.dialogBox.visible && this.isMouseOver()) {
      this.musicButton.handleClick(); // ✅ Ensure clicks work
      this.clickSoundButton.handleClick();
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