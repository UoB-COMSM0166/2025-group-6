import DialogBoxButton from "../dialogBoxButtons/DialogBoxButton.js";
import game from "../../../../../core/Game.js";
let isSFXOn = true;

class ClickButton extends DialogBoxButton {
    constructor(x, y, w, h, game) {
        super(x, y, w, h, " Sound");
        this.game = game; // Reference to the game object
    }

    draw() {
        fill(isSFXOn ? color(76, 175, 80) : color(211, 47, 47)); // Green if ON, Red if OFF
        rectMode(CENTER);
        rect(this.x, this.y, this.w, this.h, 10);

        fill(255);
        textSize(16);
        textAlign(CENTER, CENTER);
        text(` Sound: ${isSFXOn ? "ON" : "OFF"}`, this.x, this.y);
    }

    handleClick() {
        if (this.isMouseOver()) {
        game.gameEngine.soundHandler.playSound("click");

            isSFXOn = !isSFXOn;
        }

        // Play a click sound if SFX is enabled
        if (isSFXOn) {
            // need to implement click sound logic...
            // this.game.buttonClickSound.play();
        }
    }

    reset () {
        this.x = width / 2;
        this.y = height / 2 + 40;
    }
}

export default ClickButton;