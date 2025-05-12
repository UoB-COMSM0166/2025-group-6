import DialogBoxButton from "../dialogBoxButtons/DialogBoxButton.js";
import game from "../../../../../core/Game.js";

class ClickButton extends DialogBoxButton {
  constructor(x, y, w, h, label = "Sound") {
    super(x, y, w, h, label);
  }

  draw() {
    fill(game.soundEnabled ? color(76, 175, 80) : color(211, 47, 47));
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h, 10);

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

    game.soundEnabled = !game.soundEnabled;
    console.log(game.soundEnabled); 

    const sh = game.gameEngine.soundHandler;
    if (game.soundEnabled) {
      sh.setVolumeForAllSounds(1);  
    } else {
      
      sh.setVolumeForAllSounds(0);  
    }

    if (game.soundEnabled) {
      sh.playSound("click");
    }
  }

  reset() {
    this.x = this.dialogBox.boxX;
    this.y = this.dialogBox.boxY;
  }
}

export default ClickButton;