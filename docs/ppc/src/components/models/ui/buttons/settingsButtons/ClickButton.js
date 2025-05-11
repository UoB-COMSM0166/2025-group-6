import DialogBoxButton from "../dialogBoxButtons/DialogBoxButton.js";
import game              from "../../../../../core/Game.js";

export default class ClickButton extends DialogBoxButton {
  constructor(x, y, w, h, label = "Sound") {
    super(x, y, w, h, label);
  }

  draw() {

    // Green if ON, Red if OFF
    fill(game.soundEnabled ? color(76, 175, 80) : color(211, 47, 47));
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h, 10);

    // Draw the label
    fill(255);
  ;
    textAlign(CENTER, CENTER);
    const dynamicTextSize = min(this.w / 8, this.h / 2);
    textSize(dynamicTextSize);
    const maxTextWidth = this.w * 0.8; 
    const buttonText = `Sound: ${game.soundEnabled  ? "ON" : "OFF"}`;
    text(buttonText, this.x, this.y, maxTextWidth);
  }

  handleClick() {
    if (!this.isMouseOver()) return;

    // Toggle the handler’s master switch
    const sh = game.gameEngine.soundHandler;
    game.soundEnabled =!game.soundEnabled;
    console.log(game.soundEnabled);
    // Immediately pause or resume all other sounds
    if (game.soundEnabled) {
      sh.resumeAll();
    }
    else {
      sh.pauseAll();
    }           

    // Play the click feedback only if now unmuted
    if (game.soundEnabled) sh.playSound("click");
  }

  reset() {
    // Center inside the dialog box
    this.x = this.dialogBox.boxX;
    this.y = this.dialogBox.boxY;
  }
}
