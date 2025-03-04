import ExitButton from "./ui/buttons/ExitButton.js";
import RestartGameButton from "./ui/buttons/RestartGameButton.js";
import StartGameButton from "./ui/buttons/StartGameButton.js";

class WinnerPage {
  constructor(game) {
    this.game = game;
    this.celebrationImg = "";
    this.restartgameButton = new RestartGameButton(width/3 + 10, height/2, width*0.15,height*0.07,"Restart Game");
    this.exitButton = new ExitButton(width - width/3 - 10, height/2, width*0.15,height*0.07,"Quit");
  }
  
  draw() {
    if (this.celebrationImg) {
      image(this.celebrationImg, 0, 0, width, height);
    } else {
      background(50, 150, 50); // Green winner background as a fallback
    }
    
    // Draw congratulation text
    textAlign(CENTER, CENTER);
    textSize(width * 0.05);
    fill(255);
    text("CONGRATULATIONS!", width/2, height * 0.3);
    
    textSize(width * 0.04);
    text(` PLAYER ${this.game.winner} wins!`, width/2, height * 0.4);
    
    // Draw the buttons
    this.restartgameButton.draw();
    this.exitButton.draw();
  }
  
  checkButtonClicks() {
      this.restartgameButton.handleClick();
      this.exitButton.handleClick();
  }
  reset() {
    this.restartgameButton.reset();
    this.exitButton.resetWinnerPage();
  }
}

export default WinnerPage;