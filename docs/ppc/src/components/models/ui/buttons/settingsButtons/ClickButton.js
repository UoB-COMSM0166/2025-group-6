import DialogBoxButton from "../dialogBoxButtons/DialogBoxButton.js";
import game              from "../../../../../core/Game.js";

export default class ClickButton extends DialogBoxButton {
  constructor(x, y, w, h, label = "Sound") {
    super(x, y, w, h, label);
  }

  draw() {
    // Read the master on/off flag
    const isSoundOn = game.gameEngine.soundHandler.enabled;

    // Green if ON, Red if OFF
    fill(isSoundOn ? color(76, 175, 80) : color(211, 47, 47));
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h, 10);

    // Draw the label
    fill(255);
    textSize(16);
    textAlign(CENTER, CENTER);
    text(`Sound: ${isSoundOn ? "ON" : "OFF"}`, this.x, this.y);
  }

  handleClick() {
    if (!this.isMouseOver()) return;

    // Toggle the handler’s master switch
    const sh = game.gameEngine.soundHandler;
    sh.enabled = !sh.enabled;

    // Immediately pause or resume all other sounds
    if (sh.enabled) sh.resumeAll();
    else            sh.pauseAll();

    // Play the click feedback only if now unmuted
    if (sh.enabled) sh.playSound("click");
  }

  reset() {
    // Center inside the dialog box
    this.x = this.dialogBox.boxX;
    this.y = this.dialogBox.boxY;
  }
}
