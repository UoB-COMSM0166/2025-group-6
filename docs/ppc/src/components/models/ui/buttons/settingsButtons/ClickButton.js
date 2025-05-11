import DialogBoxButton from "../dialogBoxButtons/DialogBoxButton.js";
import game from "../../../../../core/Game.js";

class ClickButton extends DialogBoxButton {
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
    textAlign(CENTER, CENTER);
    const dynamicTextSize = min(this.w / 8, this.h / 2);
    textSize(dynamicTextSize);
    const maxTextWidth = this.w * 0.8;
    const buttonText = `Sound: ${game.soundEnabled ? "ON" : "OFF"}`;
    text(buttonText, this.x, this.y, maxTextWidth);
  }

  handleClick() {
    if (!this.isMouseOver()) return;

    // Toggle the sound state
    game.soundEnabled = !game.soundEnabled;
    console.log(game.soundEnabled); // Check the state in console

    // Update volume based on the sound state
    const sh = game.gameEngine.soundHandler;
    if (game.soundEnabled) {
      // Restore the volume of all sounds if sound is enabled
      sh.setVolumeForAllSounds(1);  // Set volume to 100% for all sounds
    } else {
      // Mute all sounds by setting volume to 0
      sh.setVolumeForAllSounds(0);  // Set volume to 0% for all sounds
    }

    // Play the click sound only if sound is enabled
    if (game.soundEnabled) {
      sh.playSound("click");
    }
  }

  reset() {
    // Center inside the dialog box
    this.x = this.dialogBox.boxX;
    this.y = this.dialogBox.boxY;
  }
}

export default ClickButton;