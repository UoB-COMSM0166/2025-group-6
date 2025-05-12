import Button from "./Button.js";
import game from "../../../../core/Game.js";
import { constants } from "../../../../core/config.js";

class ExitButton extends Button {
    constructor(x, y, w, h, label) {
        super(x, y, w, h, label);
    }

    handleClick () {
        if (this.isMouseOver()) {
    game.gameEngine.soundHandler.playSound("click");
          game.landingPage.reset();


            game.resetGame();
            game.gamePaused=true;
            game.winner=null;
            game.gameState = "welcome";
        }
    }

    resetGameScreen() {
        this.x = width - 50;
        this.y = constants.margin / 2;

    }

    resetWinnerPage(){
        this.x = width - width/3 - 10;
        this.y = height / 2;
        this.w = width*0.15;
        this.h = height * 0.07;
    }
}

export default ExitButton;