import { GameBoard } from "../components/models/GameBoard.js";
import { Mallet } from "../components/models/objects/Mallet.js";
import { Puck } from "../components/models/objects/Puck.js";
import { ScoreBoard } from "../components/models/ScoreBoard.js";
import { GameEngine } from "../handlers/GameEngine.js";
import { FirePowerUp } from "../components/models/objects/powerUps/FirePowerUp.js";
import { RectShape } from "../components/models/shapes/RectShape.js";
import LandingPage from "../components/models/LandingPage.js";
import GamePage from "../components/models/GamePage.js";
import WinnerPage from "../components/models/WinnerPage.js";

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
    this.landingPage = undefined;
    this.gamePage = undefined;
    this.gamePaused = false;
    this.winnerPage = undefined;
    this.gameBackImg = "";
    this.sounds = {};
  }

  initializeGame() {
    this.player1 = new Mallet(width * 0.25, height / 2, true, this);
    this.player1.isPlayerCpu = false;
    this.player2 = new Mallet(width * 0.75, height / 2, false, this);
    this.puck = new Puck();
    this.landingPage = new LandingPage(this);
    this.gamePage = new GamePage(this);
    this.winnerPage = new WinnerPage(this);
    this.board = new GameBoard();
    this.gameEngine = new GameEngine(this);
    this.scoreBoard = new ScoreBoard(this);
    this.firePowerUp = new FirePowerUp(
      width * 0.2,
      height * 0.2,
      width * 0.05,
      height * 0.1,
      new RectShape(width * 0.05, height * 0.1)
    );
    this.gameEngine.soundHandler.loopSound("backgroundSound");
    // this.initSound();
  }
  reinitializeGame(){
    this.board = new GameBoard();
    this.gameEngine = new GameEngine(this);
    this.player1 = new Mallet(width * 0.25, height / 2, true, this);
    this.player1.isPlayerCpu = false;
    this.player2 = new Mallet(width * 0.75, height / 2, false, this);
    this.scoreBoard.resetScores();
    
    this.scoreBoard.streakTracker.reset();
    this.firePowerUp = new FirePowerUp(
      width * 0.2,
      height * 0.2,
      width * 0.05,
      height * 0.1,
      new RectShape(width * 0.05, height * 0.1)
    );
    this.gameEngine.soundHandler.loopSound("backgroundSound");
    // this.initSound();
  }
  updateGame() {
      this.gameEngine.updateGame();
  }
  // initSound()
  // {
  //   this.gameEngine.soundHandler.loadSound("paddle", paddleSound);
  //   this.gameEngine.soundHandler.loadSound("board", boardSound);
  //   this.gameEngine.soundHandler.loadSound("goal", goalSound);
  //   this.gameEngine.soundHandler.loadSound("powerup", powerupSound);
  //   this.gameEngine.soundHandler.loadSound("backgroundSound", backgroundSound);
  //   this.gameEngine.soundHandler.loopSound("backgroundSound");
    
  //   this.gameEngine.soundHandler.sounds = this.sounds;
  //   this.gameEngine.soundHandler.setVolumeAll();
  // }
}

const game = new Game();
export default game;
