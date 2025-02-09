import { Mallet } from './Mallet.js';
import { Puck } from './Puck.js';

class GameState {
    constructor() {
        this.margin = 40;
        this.boardWidth = undefined;
        this.boardHeight = undefined;
        this.centerCircleRadius = undefined;
        this.goalWidth = 10;
        this.goalHeight = undefined;
        this.goalY = undefined;
        this.screen = 'welcome';
        this.gameMode = '';
        this.player1 = undefined;
        this.player2 = undefined;
        this.puck = undefined;
        this.aiOffset = 0;
        this.welcomeBg = undefined;
        this.mainpage = undefined;
        this.exitButtonSize=40;
    }

    initializeGame() {
        this.player1 = new Mallet(width * 0.25, height / 2);
        this.player1.leftSide = true;
        this.player2 = new Mallet(width * 0.75, height / 2);
        this.player2.leftSide = false;
        this.puck = new Puck();
    }
}

const gameState = new GameState();

export default gameState;