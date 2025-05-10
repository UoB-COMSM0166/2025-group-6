import StartGameButton from "./ui/buttons/StartGameButton.js";
import InstructionsButton from "./ui/buttons/InstructionsButton.js";
import SettingsButton from "./ui/buttons/SettingsButton.js";

export default class LandingPage {
  constructor(game) {
    this.game = game;
    this.startGameButton    = new StartGameButton(width/2, height/2, width*0.15, height*0.07, "Start Game");
    this.instructionsButton = new InstructionsButton(width/2, height/2 + height*0.07 + 15, width*0.15, height*0.07, "Instructions");
    this.settingsButton     = new SettingsButton(width/2, height/2 + 2*height*0.07 + 30, width*0.15, height*0.07, "Settings");
  }

  draw() {
    if (this.game.welcomeImg) {
      image(this.game.welcomeImg, 0, 0, width, height);
      this.startGameButton.draw();
      this.instructionsButton.draw();
      this.settingsButton.draw();
      this.startGameButton.dialogBox.draw();
      this.instructionsButton.dialogBox.draw();
      this.settingsButton.dialogBox.draw();
      if (this.settingsButton.dialogBox.visible) {
        this.settingsButton.drawButtons();
      }
    } else {
      background(200);
    }
  }

  checkButtonClicks() {
    const sb = this.startGameButton.dialogBox.visible;
    const ib = this.instructionsButton.dialogBox.visible;
    const sbx= this.settingsButton.dialogBox.visible;

    // No dialogs open → root buttons
    if (!sb && !ib && !sbx) {
      this.startGameButton.handleClick();
      this.instructionsButton.handleClick();
      this.settingsButton.handleClick();
    }
    // Settings dialog open → only settings toggles & close
    else if (sbx) {
      this.settingsButton.dialogBox.handleClick();
      this.settingsButton.clickSoundButton.handleClick();
      this.settingsButton.mouseControlButton.handleClick();
    }
    // Start‐Game or Instructions dialog open → only that dialog
    else {
      if (sb) {
        this.startGameButton.dialogBox.handleClick();
      }
      if (ib) {
        this.instructionsButton.dialogBox.handleClick();
      }
    }
  }

  reset() {
    this.startGameButton.reset();
    this.instructionsButton.reset();
    this.settingsButton.reset();
  }
}
