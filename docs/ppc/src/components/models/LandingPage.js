import StartGameButton from "./ui/buttons/StartGameButton.js";
import InstructionsButton from "./ui/buttons/InstructionsButton.js";
import SettingsButton from "./ui/buttons/SettingsButton.js";

/**
 * This class is responsible for rendering the main landing screen of the game,
 * including animated title and UI buttons.
 */
export default class LandingPage {
  constructor(game) {
    this.game = game;
    this.startGameButton    = new StartGameButton(width/2, height/2, width*0.15, height*0.07, "Start Game");
    this.instructionsButton = new InstructionsButton(width/2, height/2 + height*0.07 + 15, width*0.15, height*0.07, "Instructions");
    this.settingsButton     = new SettingsButton(width/2, height/2 + 2*height*0.07 + 30, width*0.15, height*0.07, "Settings");
  }

  /**
   * This draw function handles the layout, button rendering, and dynamic visual effects
   * (e.g., glowing animated title text with chromatic aberration and depth)
   */
  draw() {
    if (this.game.welcomeImg) {
      image(this.game.welcomeImg, 0, 0, width, height);
      textAlign(CENTER);
      textStyle(BOLD);
    
      let titleSize = min(width * 0.06, height * 0.08);
      textSize(titleSize);
    
      let scaleEffect = map(sin(frameCount * 0.08), -1, 1, 0.95, 1.15);
      let zoomOffset = sin(frameCount * 0.06) * (height * 0.03); // relative offset
      let shakeX = random(-2, 2);
      let shakeY = random(-2, 2);
    
      let glowIntensity = map(sin(frameCount * 0.08), -1, 1, 30, 50);
      let glowAlpha = map(sin(frameCount * 0.08), -1, 1, 0.7, 1.0);
    
      let blueOffset = map(sin(frameCount * 0.08), -1, 1, 2, 4);
      let mainColor = map(sin(frameCount * 0.06), -1, 1, 150, 255);
    
      push();
      translate(width / 2 + shakeX, height / 3 + shakeY);
      scale(scaleEffect);
    
      for (let i = 5; i >= 0; i--) {
        let layerOffset = i * 2;
        let alpha = map(i, 0, 5, 1, 0.2);
    
        drawingContext.shadowBlur = glowIntensity - i * 5;
        drawingContext.shadowColor = `rgba(0, 200, 255, ${glowAlpha * alpha})`;
    
        fill(mainColor - i * 20, 200 - i * 20, 255 - i * 20);
        text("PUCK POWER CLASH", layerOffset, layerOffset + zoomOffset);
      }
    
      drawingContext.shadowBlur = 0;
      fill(0, 150, 255, 180);
      text("PUCK POWER CLASH", blueOffset, zoomOffset + blueOffset);
    
      fill(255, 50, 50, 120);
      text("PUCK POWER CLASH", -blueOffset / 2, zoomOffset - blueOffset / 2);
    
      drawingContext.shadowBlur = glowIntensity;
      drawingContext.shadowColor = `rgba(0, 255, 255, ${glowAlpha})`;
      fill(255);
      text("PUCK POWER CLASH", 0, zoomOffset);
      pop();
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

    if (!sb && !ib && !sbx) {
      this.startGameButton.handleClick();
      this.instructionsButton.handleClick();
      this.settingsButton.handleClick();
    }

    else if (sbx) {
      this.settingsButton.dialogBox.handleClick();
      this.settingsButton.clickSoundButton.handleClick();
      this.settingsButton.mouseControlButton.handleClick();
    }

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
