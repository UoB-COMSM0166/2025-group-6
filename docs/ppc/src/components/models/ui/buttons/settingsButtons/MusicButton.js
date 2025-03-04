import DialogBoxButton from "../dialogBoxButtons/DialogBoxButton.js";

let isMusicOn = true;

class MusicButton extends DialogBoxButton {
    constructor(x, y, w, h, game) {
        super(x, y, w, h, "Music");
        this.game = game; // Reference to the game object
    }

    draw() {
        fill(isMusicOn ? color(76, 175, 80) : color(211, 47, 47)); // Green if ON, Red if OFF
        rectMode(CENTER);
        rect(this.x, this.y, this.w, this.h, 10);

        fill(255);
        textSize(16);
        textAlign(CENTER, CENTER);
        text(`Music: ${isMusicOn ? "ON" : "OFF"}`, this.x, this.y);
    }

    handleClick() {
        if (this.isMouseOver()) {
            isMusicOn = !isMusicOn;
            // need to implement music logic....
            // if (isMusicOn) {
            //     this.game.landingPageMusic.loop();
            // } else {
            //     this.game.landingPageMusic.stop();
            // }
        }
    }

    reset () {
        this.x = width / 2;
        this.y = height / 2 - 40;
    }
}

export default MusicButton;
