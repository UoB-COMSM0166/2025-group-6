import { constants } from "../../core/config.js";

export class ScoreBoard {
  constructor(game) {
    this.x = width / 2;
    this.y = constants.margin / 2 ;
    this.fontSize = 32;
    this.textColor = '#FFFFFF';
    this.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    // this.padding = 10;
    this.width = game.board.boardWidth * 0.25;
    this.height = constants.margin;
    this.game = game;
  }

  draw() {
    // Save current state
    push();
    
    // Draw background
    fill(this.backgroundColor);
    noStroke();
    rect(this.x, this.y, this.width, this.height, 5);
    
    // Draw text
    fill(this.textColor);
    textSize(this.fontSize);
    textAlign(CENTER, CENTER);
    
    // Draw scores
    const centerX = this.x ;
    const centerY = this.y ;
    text(`${this.game.player1.score} - ${this.game.player2.score}`, centerX, centerY);
    
    // Draw player labels
    textSize(this.fontSize * 0.5);
    text("Player 1", centerX - 70, centerY + 10);
    text("Player 2", centerX + 70, centerY + 10);
    
    // Restore state
    pop();
  }

  update() {
    // Update the scores
    this.x = width / 2;
    this.y = constants.margin / 2 ;
    this.width = this.game.board.boardWidth * 0.25;
    this.height = constants.margin;
  }
  
  // Method to increment scores
  // Method to reset scores
  resetScores() {
    this.game.player1.score = 0;
    this.game.player2.score = 0;
  }
}