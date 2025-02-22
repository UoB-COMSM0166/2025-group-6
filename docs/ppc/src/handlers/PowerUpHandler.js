import { constants } from "../core/config.js";

/* This Class handles how powerup is getting activated and deactivated 
and also how its effect is enabled and disabled */
export default class PowerupHandler {
  constructor(game) {
    this.game = game;
    this.powerupActiveTimer = 0;
    this.powerupActiveDuration = 20000; // 20 seconds
    this.isTimerActive = false;
    this.powerupEffectTimer = 0;
    this.powerupEffectDuration = 10000; // 10 seconds
    this.TimerEffect = false;
  }

  update() {
    const currentStreak = this.game.scoreBoard.streakTracker.getCurrentStreak();
    // If streak is hot and timer isn't already active, activate powerup
    if (currentStreak.isHot && !this.isTimerActive) {
      if (currentStreak.player.leftSide == true) {
        // Position on the left side of the game board
        this.game.firePowerUp.x = this.game.board.boardWidth * 0.25;
      } else {
        // Position on the right side of the game board
        this.game.firePowerUp.x = this.game.board.boardWidth * 0.75; 
      }
      this.game.firePowerUp.y = this.game.board.boardHeight / 2;
      // randomizing x and y positions of firePowerUp
      this.game.firePowerUp.x *= Math.random() * 1.25 + 0.5;
      this.game.firePowerUp.y *= Math.random() * 1.25 + 0.5;

      this.activatePowerup();
    }

    if (this.isTimerActive) {
      const currentTime = Date.now();
      if (currentTime - this.powerupActiveTimer >= this.powerupActiveDuration) {
        this.deactivatePowerup();
      }
    }

    if (this.isTimerEffect) {
      const currentTime = Date.now();
      if (currentTime - this.powerupEffectTimer >= this.powerupEffectDuration) {
        this.disablePowerupEffect();
      }
    }
  }

  activatePowerup() {
    this.game.firePowerUp.active = true;
    this.powerupActiveTimer = Date.now();
    this.isTimerActive = true;
    const currentStreak = this.game.scoreBoard.streakTracker.getCurrentStreak();
    this.game.firePowerUp.leftSide = currentStreak.player.leftSide;
  }

  enablePowerUpEffect() {
    
    this.game.firePowerUp.effect = true;
    // this.game.firePowerUp.leftSide = currentStreak.player.leftSide;
    // checking player side and making sure that double powerup is not applied to same goalpost
    if (
      this.game.firePowerUp.leftSide &&
      this.game.board.goalPost.goalHeightTwo <= height * 0.25
    ) {
      this.game.board.goalPost.goalHeightTwo *= constants.goalSizeIncFactor;
      this.game.board.goalPost.colorTwo = "red";
    } else if (
      !this.game.firePowerUp.leftSide &&
      this.game.board.goalPost.goalHeightOne <= height * 0.25
    ) {
      this.game.board.goalPost.goalHeightOne *= constants.goalSizeIncFactor;
      this.game.board.goalPost.colorOne = "red";
    }

    this.powerupEffectTimer = Date.now();
    this.isTimerEffect = true;
  }

  deactivatePowerup() {
    this.game.firePowerUp.active = false;
    this.isTimerActive = false;
    this.game.scoreBoard.streakTracker.reset();
  }

  disablePowerupEffect() {
    this.game.firePowerUp.effect = false;
    this.isTimerEffect = false;
    if (this.game.firePowerUp.leftSide) {
      this.game.board.goalPost.goalHeightTwo = height * 0.25;
      this.game.board.goalPost.colorTwo = "white";
    } else {
      this.game.board.goalPost.goalHeightOne = height * 0.25;
      this.game.board.goalPost.colorOne = "white";
    }
  }
}
