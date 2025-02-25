import { GameBoard } from "../components/models/GameBoard.js";
import { Mallet } from "../components/models/objects/Mallet.js";
import { Puck } from "../components/models/objects/Puck.js";
import { ScoreBoard } from "../components/models/ScoreBoard.js";
import { GameEngine } from "../handlers/GameEngine.js";
import { FirePowerUp } from "../components/models/objects/powerUps/FirePowerUp.js";
import { RectShape } from "../components/models/shapes/RectShape.js";
import { SoundManager } from "../components/models/objects/SoundManager.js";

// Singleton class which serves as the central hub of the game
class Game {
  constructor() {
    this.gameState = "welcome";
    this.player1 = undefined;
    this.player2 = undefined;
    this.puck = undefined;
    this.board = undefined;
    this.gameEngine = undefined;
    this.scoreBoard = undefined;
    this.firePowerUp = undefined;
    this.soundManager = new SoundManager();
  }

  initializeGame() {
    this.player1 = new Mallet(width * 0.25, height / 2,true);
    this.player1.isPlayerCpu = false;
    this.player2 = new Mallet(width * 0.75, height / 2,false);
    this.puck = new Puck();
    this.board = new GameBoard();
    this.gameEngine = new GameEngine(this);
    this.scoreBoard = new ScoreBoard(this);
    // eventhough firepowerup is not a recatangle,considering it as a rectangle for easier collition detection
    this.firePowerUp = new FirePowerUp(width* 0.20,height *0.20,width * 0.05,height*0.10, new RectShape(width * 0.05,height*0.10))
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