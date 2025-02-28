import StartGameButton from "./ui/buttons/StartGameButton.js";

class WinnerPage {
  constructor(game) {
    this.game = game;
    this.celebrationImg = "";
    console.log(this.celebrationImg);
    this.startGameButton = new StartGameButton(width/2 + 10, height/2, width*0.1,height*0.08,"Start Game");
    this.startGameButton2 = new StartGameButton(width/2 - 10, height/2, width*0.1,height*0.08,"Start Game");
    // console.log(" WINNER PAGE INIT");
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
    this.StartGameButton.draw();
    this.StartGameButton2.draw();
  }
  
  checkButtonClicks() {
    this.StartGameButton.handleClick();
    this.StartGameButton2.handleClick();
  }
}

export default WinnerPage;