import { GameBoard } from "../components/models/GameBoard.js";
import { Mallet } from "../components/models/objects/Mallet.js";
import { Puck } from "../components/models/objects/Puck.js";
import { ScoreBoard } from "../components/models/ScoreBoard.js";
import { GameEngine } from "../handlers/GameEngine.js";

// Singleton class which serves as the central hub of the game
class Game {
  constructor() {
    this.gameState = "welcome";
    this.player1 = undefined;
    this.player2 = undefined;
    this.puck = undefined;
    this.board = undefined;
    this.aiOffset = 0;
    this.gameEngine = undefined;
    this.scoreBoard = undefined;
  }

  initializeGame() {
    this.player1 = new Mallet(width * 0.25, height / 2);
    this.player1.leftSide = true;
    this.player1.isPlayerCpu = false;
    this.player2 = new Mallet(width * 0.75, height / 2);
    this.player2.leftSide = false;
    this.puck = new Puck();
    this.board = new GameBoard();
    this.gameEngine = new GameEngine(this);
    this.scoreBoard = new ScoreBoard(this);
  }
   
  updateGame(){
    this.gameEngine.updateGame();
    this.player1.update();
    this.player2.update();
    this.puck.update();
    
  }
}

const game = new Game();
export default game;
