
import landingScreen from "../components/screens/LandingScreen.js";
import gameScreen from "../components/screens/GameScreen.js";

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
            // to be implemented
        }
    }
}