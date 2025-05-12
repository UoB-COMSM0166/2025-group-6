import { constants } from "../core/config.js";
/**
 * Class handling all collision logic
 * includes:
 * method to check collision between mallet and puck
 * method to check collision between puck and wall
 * method to check collision between powerup and puck
 * method to check collision between puck and obstacle
 *
 */

export default class CollisionHandler {
  constructor(game) {
    this.game = game;
  }

  update() {
    this.checkMalletPuckCollisions();
    this.checkWallCollisions(this.game.puck);
    this.checkPowerUpCollosions(this.game.firePowerUp);
    this.checkObstacleCollusion(this.game.gameEngine.obstacleHandler.obstacles);
  }

  checkMalletPuckCollisions() {
    if (this.game.player1.checkCollision(this.game.puck)) {
      this.handleCircleGameObjectCollision(this.game.player1, this.game.puck);
      this.game.gameEngine.soundHandler.playSound("paddle");    
    }

    if (this.game.player2.checkCollision(this.game.puck)){
      this.handleCircleGameObjectCollision(this.game.player2, this.game.puck);
      this.game.gameEngine.soundHandler.playSound("paddle");    
    }
  }

  handleCircleGameObjectCollision(mallet, puck) {
    let dx = puck.x - mallet.x;
    let dy = puck.y - mallet.y;
    let angle = atan2(dy, dx);
    let speed = sqrt(
      mallet.velocity.x * mallet.velocity.x +
        mallet.velocity.y * mallet.velocity.y
    );
    const maxSpeed = 20;
    const boost = 1.05; 
    puck.velocity.x = cos(angle) * min(speed + 10, maxSpeed) * boost;
    puck.velocity.y = sin(angle) * min(speed + 10, maxSpeed) * boost;
  }

  checkWallCollisions(puck) {
    const friction = 0.98; 
    const restitution = 0.8;
    const boost = 1.05; 
    if (puck.y - puck.shape.radius <= constants.margin) {
      puck.y = constants.margin + puck.shape.radius + 1;
      puck.velocity.y = -puck.velocity.y * restitution * boost;
      puck.velocity.x *= friction * boost;
      this.game.gameEngine.soundHandler.playSound("board"); 
    } else if (puck.y + puck.shape.radius >= height - constants.margin) {
      puck.y = height - constants.margin - puck.shape.radius - 1;
      puck.velocity.y = -puck.velocity.y * restitution * boost;
      puck.velocity.x *= friction * boost;
      this.game.gameEngine.soundHandler.playSound("board"); 
    }

    if (puck.x - puck.shape.radius <= constants.margin) {
      if (puck.y < this.game.board.goalPost.goalY - this.game.board.goalPost.goalHeightOne / 2 ||
          puck.y > this.game.board.goalPost.goalY + this.game.board.goalPost.goalHeightOne / 2) {
        puck.x = constants.margin + puck.shape.radius + 1;
        puck.velocity.x = -puck.velocity.x * restitution * boost;
        puck.velocity.y *= friction * boost;
      } else {
        this.game.scoreBoard.streakTracker.addScore(this.game.player2);
        this.game.player2.score++;
        puck.reset();
        this.game.player2.reset();
        this.game.player1.reset();
        this.game.gameEngine.soundHandler.playSound("goal"); 
      }
    } else if (puck.x + puck.shape.radius >= width - constants.margin) {
      if (puck.y < this.game.board.goalPost.goalY - this.game.board.goalPost.goalHeightTwo / 2 ||
          puck.y > this.game.board.goalPost.goalY + this.game.board.goalPost.goalHeightTwo / 2) {
        puck.x = width - constants.margin - puck.shape.radius - 1;
        puck.velocity.x = -puck.velocity.x * restitution * boost;
        puck.velocity.y *= friction * boost;
      } else {
        this.game.scoreBoard.streakTracker.addScore(this.game.player1);
        this.game.player1.score++;
        puck.reset();
        this.game.player1.reset();
        this.game.player2.reset();
        this.game.gameEngine.soundHandler.playSound("goal"); 
      }    
    }
  }

  checkPowerUpCollosions(powerUp) {
    if (this.game.firePowerUp.active == true) {
      const currentStreak = this.game.scoreBoard.streakTracker.getCurrentStreak();
      if (this.game.player1.checkCollision(powerUp) || this.game.player2.checkCollision(powerUp)) {
        this.game.gameEngine.powerUpHandler.enablePowerUpEffect();
        this.game.gameEngine.powerUpHandler.deactivatePowerup();
        this.game.gameEngine.soundHandler.playSound("powerup");
      }
    }
  }

  
  checkObstacleCollusion(obstacles) {
    for (let obstacle of obstacles) {
      if(this.game.puck.checkCollision(obstacle)){
        this.game.gameEngine.soundHandler.playSound("obstacleSound");
        this.handleCircleGameObjectCollision(obstacle,this.game.puck);
      }
    }
  }
}