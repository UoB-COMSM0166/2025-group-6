
import landingScreen from "../components/screens/LandingScreen.js";
import gameScreen from "../components/screens/GameScreen.js";
import winnerScreen from "../components/screens/WinnerScreen.js";

export default class MouseHandler {
    constructor(game) {
        this.game = game;
        window.mousePressed = () => this.mousePressed();
    }

    update() {
        
    }

    mousePressed() {
        if (this.game.gameState === "welcome") {
            landingScreen.checkButtonClicks();
        } else if (this.game.gameState === "gameboard") {
            gameScreen.checkButtonClicks();
        } else if(this.game.gameState === "winnerpage"){
            winnerScreen.checkButtonClicks();
        }
    }
}