import DialogBoxButton from "../dialogBoxButtons/DialogBoxButton.js";
import game from "../../../../../core/Game.js";

class MouseControlButton extends DialogBoxButton {
    constructor(x, y, w, h, label) {
        super(x, y, w, h, label);
    }

    draw() {
        fill(game.mouseControl ? color(76, 175, 80) : color(211, 47, 47)); // Green if ON, Red if OFF
        rectMode(CENTER);
        rect(this.x, this.y, this.w, this.h, 10);

        fill(255);
        const dynamicTextSize = min(this.w / 8, this.h / 2);
        textSize(dynamicTextSize);
        const maxTextWidth = this.w * 0.8; 
        textAlign(CENTER, CENTER);
        const buttonText = `Mouse: ${game.mouseControl ? "ON" : "OFF"}`;
        text(buttonText, this.x, this.y, maxTextWidth);
    }

    handleClick() {
        if (this.isMouseOver()) {
        game.gameEngine.soundHandler.playSound("click");

            game.mouseControl = !game.mouseControl
        }
    }

    reset () {
        this.x = width / 2;
        this.y = height / 2 - 40;
    }
}

export default MouseControlButton;
