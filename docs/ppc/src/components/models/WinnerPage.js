import ExitButton from "./ui/buttons/ExitButton.js";
import RestartGameButton from "./ui/buttons/RestartGameButton.js";

/**
 * This class handles the display shown after a player wins.
 * It shows a celebration background, winner message, and buttons to restart or quit
 * includes:
 * method to draw winning page
 * method to check for button clicks in winning page
 * method to reset buttons in winning page
 */

class WinnerPage {
  constructor(game) {
    this.game = game;
    this.celebrationImg = "";
    this.losingImg = "";
    this.restartgameButton = new RestartGameButton(width/3 + 10, height/2, width*0.15,height*0.07,"Restart Game");
    this.exitButton = new ExitButton(width - width/3 - 10, height/2, width*0.15,height*0.07,"Quit");
  }


  draw() {
    if(this.game.winner != "CPU"){
      if (this.celebrationImg) {
        image(this.celebrationImg, 0, 0, width, height);
      } else {
        background(50, 150, 50); 
      }
    }else
    {
      if (this.losingImg) {
        image(this.losingImg, 0, 0, width, height);
      } else {
        background(50, 150, 50); 
      }
    }

    textAlign(CENTER, CENTER);
    textSize(width * 0.05);
    fill(255);
    if(this.game.winner != "CPU")
    {
      text("CONGRATULATIONS!", width/2, height * 0.3);
      textSize(width * 0.04);
      text(`YOU won!`, width/2, height * 0.4);
    }else
    {
      text("YOU LOSE!!", width/2, height * 0.3);
      textSize(width * 0.04);
      text(`${this.game.winner} wins!`, width/2, height * 0.4);
    }
    
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