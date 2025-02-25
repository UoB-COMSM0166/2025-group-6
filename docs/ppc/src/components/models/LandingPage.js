import Button from "./ui/Button.js";

class LandingPage {
    constructor(game) {
      this.game = game;
      this.welcomeImg = "";
      this.button = new Button(width/2, height/2, width*0.1,height*0.08,"Start Game");
    }
  

    draw() {
        if (this.welcomeImg) {
            image(this.welcomeImg, 0, 0, width, height);
            this.button.draw();
          } else {
            background(50);
          }
    }

    checkButtonClicks(){
         if(this.button.isMouseOver){
            this.game.gameState= "gameboard";
         }
    }
}
  
  export default LandingPage;
  