import { GameBoard } from '../components/models/GameBoard.js';
import { Mallet } from '../components/models/objects/Mallet.js';
import { Puck } from '../components/models/objects/Puck.js';


class Game {
    constructor() {
        this.gameState = 'welcome';
        this.player1 = undefined;
        this.player2 = undefined;
        this.puck = undefined;
        this.board = undefined;
    }

    initializeGame() {
        this.player1 = new Mallet(width* 0.25, height / 2);
        this.player1.leftSide = true;
        this.player2 = new Mallet(width * 0.75, height / 2);
        this.player2.leftSide = false;
        this.puck = new Puck();
        this.board = new GameBoard();
    }
 
}

const game = new Game();
export default game ;