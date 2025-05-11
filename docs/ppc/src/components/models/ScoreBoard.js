import { constants } from "../../core/config.js";
import  StreakTracker  from "./StreakTracker.js";

/**
 * This class displays player and CPU scores and play/pause button at the top-center of the game screen.
 */
export class ScoreBoard {
  constructor(game) {
    this.x = width / 2;
    this.y = constants.margin / 2 ;
    this.fontSize = 32;
    this.textColor = '#FFFFFF';
    this.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    this.width = game.board.boardWidth * 0.35;
    this.height = constants.margin;
    this.game = game;
    this.streakTracker = new StreakTracker();
  }

  /**
   * Renders the scoreboard UI with current scores.
   */
  draw() {
    push();
    
    fill(this.backgroundColor);
    noStroke();
    rect(this.x, this.y, this.width, this.height, 5);
    
    fill(this.textColor);
    textSize(this.fontSize);
    textAlign(CENTER, CENTER);

    const centerX = this.x ;
    const centerY = this.y ;
    text(`${this.game.player1.score.toString().padStart(2, '0')}`, centerX - this.width / 6, centerY);
    text(`${this.game.player2.score.toString().padStart(2, '0')}`, centerX + this.width / 6, centerY);

    textSize(this.fontSize * 0.6);
    text("Player", centerX - this.width / 2.5, centerY);
    text("CPU", centerX + this.width / 2.5, centerY);

    pop();
  }

  /**
   * Re-centers the scoreboard, if the screen resized.
   */
  update() {
    this.x = width / 2;
    this.y = constants.margin / 2 ;

  }

  /**
   * Resetting the score board.
   */
  resetScores() {
    this.game.player1.score = 0;
    this.game.player2.score = 0;
  }
}