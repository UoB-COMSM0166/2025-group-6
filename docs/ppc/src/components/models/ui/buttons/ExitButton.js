import Button from "./Button.js";
import game from "../../../../core/Game.js";
import { constants } from "../../../../core/config.js";

class ExitButton extends Button {
    constructor(x, y, w, h, label) {
        super(x, y, w, h, label);
    }

    handleClick () {
        if (this.isMouseOver()) {
            game.resetGame();
            game.winner=null;
            game.gameState = "welcome";
        }
    }

    resetGameScreen() {
        this.x = width * 0.9;  
        this.y = constants.margin / 2;    
        this.w = width * 0.05;    
        this.h = height * 0.04;
    }
     
    resetWinnerPage(){
        this.x = width - width/3 - 10;
        this.y = height / 2; 
        this.w = width*0.15;
        this.h = height * 0.07;
    }
}

export default ExitButton;