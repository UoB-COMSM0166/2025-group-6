import StartGameButton from "./ui/buttons/StartGameButton.js";
import InstructionsButton from "./ui/buttons/InstructionsButton.js";
import SettingsButton from "./ui/buttons/SettingsButton.js";

class LandingPage {
    constructor(game) {
      this.game = game;
      this.welcomeImg = "";
      this.startGameButton = new StartGameButton(width/2, height/2, width*0.15, height*0.07, "Start Game");
      this.instructionsButton = new InstructionsButton(width/2, (height/2 + height*0.07 + 10), width*0.15, height*0.07, "Instructions");
      this.settingsButton = new SettingsButton(width/2, (height/2 + 2*height*0.07 + 20), width*0.15, height*0.07, "Settings");
    }
  
    draw() {
        if (this.welcomeImg) {
            image(this.welcomeImg, 0, 0, width, height);
            textSize(45);
            text('WELCOME TO', width/2, height/4);
            text('Puck Power Clash', width/2, height/3);
            this.startGameButton.draw();
            this.instructionsButton.draw();
            this.settingsButton.draw();
            if(this.instructionsButton.showDialogBox){
              this.instructionsButton.drawDialogBox();
            }
            else if (this.settingsButton.showDialogBox) {
              this.settingsButton.drawDialogBox();
            }
        } else {
            background(50);
        }
    }

    checkButtonClicks(){
         this.startGameButton.handleClick();
         this.instructionsButton.handleClick();
         this.settingsButton.handleClick();
  
    }
}
  
export default LandingPage;