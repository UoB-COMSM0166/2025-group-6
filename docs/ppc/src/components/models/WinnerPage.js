import ExitButton from "./ui/buttons/ExitButton.js";
import StartGameButton from "./ui/buttons/StartGameButton.js";

class WinnerPage {
  constructor(game) {
    this.game = game;
    this.celebrationImg = "";
    this.startGameButton = new StartGameButton(width/3 + 10, height/2, width*0.15,height*0.07,"Restart Game");
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
    text(`${this.game.gameEngine.winnerHandler.winner} wins!`, width/2, height * 0.4);
    
    // Draw the buttons
    this.startGameButton.draw();
    this.exitButton.draw();
  }
  
  checkButtonClicks() {
      this.startGameButton.handleClick();
      this.exitButton.handleClick();
  }
  reset() {
    this.startGameButton.reset();
    this.exitButton.reset();
  }
}

export default WinnerPage;