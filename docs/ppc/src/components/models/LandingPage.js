import StartGameButton from "./ui/buttons/StartGameButton.js";

class LandingPage {
    constructor(game) {
      this.game = game;
      this.welcomeImg = "";
      this.startGameButton = new StartGameButton(width/2, height/2, width*0.1,height*0.08,"Start Game");
    }
  

    draw() {
        if (this.welcomeImg) {
            image(this.welcomeImg, 0, 0, width, height);
            this.startGameButton.draw();
          } else {
            background(50);
          }
    }

    checkButtonClicks(){
         this.startGameButton.handleClick();
    }
}
  
  export default LandingPage;
  