import game from "../../core/Game.js";

/**
 * This class is responsible for displaying the winner screen and handles button interactions.
 */
export class WinnerScreen {
    draw() {
        game.winnerPage.draw();
    }

    checkButtonClicks(){
        game.winnerPage.checkButtonClicks();
    }
}

const winnerScreen = new WinnerScreen();
export default winnerScreen;