import game from "../../core/Game.js";


export class WinnerScreen {
    constructor() {
        this.backgroundColor = 255; // white background
    }

    draw() {
        game.winnerPage.draw();
    }

    checkButtonClicks(){
        game.winnerPage.checkButtonClicks();
    }

}
const winnerScreen = new WinnerScreen();
export default winnerScreen;