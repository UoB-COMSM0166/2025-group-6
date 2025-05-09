import DialogBoxButton from "../dialogBoxButtons/DialogBoxButton.js";
import game from "../../../../../core/Game.js";

class LevelModeButton extends DialogBoxButton {
  constructor(x, y, w, h, label) {
    super(x, y, w, h, label);
  }

  draw() {
    rectMode(CENTER);
    
    // Create a pulsing glow effect
    let pulseAmount = sin(frameCount * 0.05) * 20;
    
    // Color schemes
    const colors = {
      normal: {
        fill:   [30, 144, 255, 180],
        hover:  [0, 191, 255],
        default:[41, 128, 185, 150],
        border: [52, 152, 219]
      },
      hard: {
        fill:   [255, 50, 50, 180],
        hover:  [255, 0, 0],
        default:[185, 41, 41, 150],
        border: [219, 52, 52]
      }
    };
    
    const isHardMode = this.label.toLowerCase().includes("hard");
    const scheme     = isHardMode ? colors.hard : colors.normal;
    
    // Choose fill & stroke based on hover
    if (this.isMouseOver()) {
      fill(...scheme.fill, pulseAmount);
      stroke(...scheme.hover);
      drawingContext.shadowBlur  = 15;
      drawingContext.shadowColor = isHardMode
        ? "rgba(255, 0, 0, 0.5)"
        : "rgba(0, 191, 255, 0.5)";
    } else {
      fill(...scheme.default);
      stroke(...scheme.border);
      drawingContext.shadowBlur = 0;
    }

    strokeWeight(3);
    rect(this.x, this.y, this.w, this.h, 15);

    // Subtle gradient overlay
    noStroke();
    fill(255, 255, 255, 30);
    rect(this.x, this.y - this.h / 4, this.w * 0.9, this.h / 3, 10);

    // Label
    noStroke();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(min(this.w * 0.15, 24));
    textStyle(BOLD);
    text(this.label, this.x, this.y);

    // Reset shadow
    drawingContext.shadowBlur = 0;
  }

  handleClick() {
    if (!this.isMouseOver()) return;

    // play once on click
    game.gameEngine.soundHandler.playSound("click");

    // switch mode and start game
    if (this.label.toLowerCase().includes("normal")) {
      game.level = "normal";
    } else {
      game.level = "hard";
    }
    game.gameState = "gameboard";
  }
}

export default LevelModeButton;
