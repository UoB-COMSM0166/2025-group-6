import { GameBoard } from "../components/models/GameBoard.js";
import { Mallet } from "../components/models/objects/Mallet.js";
import { Puck } from "../components/models/objects/Puck.js";
import { ScoreBoard } from "../components/models/ScoreBoard.js";
import { GameEngine } from "../handlers/GameEngine.js";
import { FirePowerUp } from "../components/models/objects/powerUps/FirePowerUp.js";
import { RectShape } from "../components/models/shapes/RectShape.js";
import { SoundHandler } from "../handlers/SoundHandler.js"; // Ensure you import SoundHandler

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
    this.soundHandler = undefined;  
    this.soundHandler = new SoundHandler();  // Initialize SoundHandler

  }

  initializeGame() {
    this.player1 = new Mallet(width * 0.25, height / 2, true);
    this.player1.isPlayerCpu = false;
    this.player2 = new Mallet(width * 0.75, height / 2, false);
    this.puck = new Puck();
    this.board = new GameBoard();
    this.gameEngine = new GameEngine(this);
    this.scoreBoard = new ScoreBoard(this);
    this.firePowerUp = new FirePowerUp(width * 0.20, height * 0.20, width * 0.05, height * 0.10, new RectShape(width * 0.05, height * 0.10));
    // Load sounds during game initialization
    this.gameEngine.soundHandler.loadSound("paddle", "./assets/sounds/puck_paddle (mp3cut.net).mp3");
    this.gameEngine.soundHandler.loadSound("powerUp", "./assets/sounds/powerup3 (mp3cut.net).mp3");
    this.gameEngine.soundHandler.loadSound("goal", "./assets/sounds/goal_1 (mp3cut.net).wav");
    this.gameEngine.soundHandler.loadSound("board", "./assets/sounds/puck_board (mp3cut.net).mp3");
  }

  updateGame() {
    this.gameEngine.updateGame();
    this.player1.update();
    this.player2.update();
    this.puck.update();
  }
}

const game = new Game();
export default game;
