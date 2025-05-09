import DialogBoxButton from "./DialogBoxButton.js"
import game from "../../../../../core/Game.js";

class LevelModeButton extends DialogBoxButton {
  constructor(x, y, w, h, label) {
    super(x, y, w, h, label);
  }
  draw() {
    rectMode(CENTER);
    
    // Create a glowing effect and dynamic colors
    let pulseAmount = sin(frameCount * 0.05) * 20; // Creates a pulsing effect
    
    // Define color schemes based on mode
    let colors = {
        normal: {
            fill: [30, 144, 255, 180],      // Dodger blue
            hover: [0, 191, 255],           // Deep sky blue
            default: [41, 128, 185, 150],   // Darker blue
            border: [52, 152, 219]          // Lighter blue
        },
        hard: {
            fill: [255, 50, 50, 180],       // Bright red
            hover: [255, 0, 0],             // Pure red
            default: [185, 41, 41, 150],    // Darker red
            border: [219, 52, 52]           // Lighter red
        }
    };
    
    let isHardMode = this.label.toLowerCase().includes('hard');
    let scheme = isHardMode ? colors.hard : colors.normal;
    
    // Check if the mouse is over the button
    if (this.isMouseOver()) {
        fill(...scheme.fill, pulseAmount);
        stroke(...scheme.hover);
        // Add outer glow
        drawingContext.shadowBlur = 15;
        drawingContext.shadowColor = isHardMode ? 
            'rgba(255, 0, 0, 0.5)' : 
            'rgba(0, 191, 255, 0.5)';
            
        if (isHardMode) {
            // Add flickering fire-like effect
            let flicker = random(-10, 10);
            drawingContext.shadowBlur = 15 + flicker;
            // Add additional pulsing shadow
            if (frameCount % 30 < 15) {
                drawingContext.shadowBlur = 25;
            }
        }
    } else {
        fill(...scheme.default);
        stroke(...scheme.border);
        drawingContext.shadowBlur = 0;
    }

    strokeWeight(3);
    // Draw main button with rounded corners
    rect(this.x, this.y, this.w, this.h, 15);
    
    // Add subtle gradient overlay
    noStroke();
    fill(255, 255, 255, 30);
    rect(this.x, this.y - this.h/4, this.w * 0.9, this.h/3, 10);
    
    // Draw the button label with enhanced style
    noStroke();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(min(this.w * 0.15, 24));  // Responsive text size
    textStyle(BOLD);
    text(this.label, this.x, this.y);
    
    // Reset shadow effect
    drawingContext.shadowBlur = 0;
}
  // temporary logic
  handleClick() {
    if (this.isMouseOver()) {
        game.gamePaused = false;
        game.gameState = "gameboard";
    if (this.label.toLowerCase().includes('normal')){
       game.level = "normal";
       
    }else{
       game.level = "hard";
    }
  }
  }

}

export default LevelModeButton;
