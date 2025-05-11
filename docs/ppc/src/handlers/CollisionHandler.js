import { constants } from "../core/config.js";


// Class for handling the collision between mallet and puck, puck and wall, puck and power-up
// puck and obstacles
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

  // Check collisions between mallets and puck
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

  // For collision between mallet and puck (circular objects)
  handleCircleGameObjectCollision(mallet, puck) {
    let dx = puck.x - mallet.x;
    let dy = puck.y - mallet.y;
    let angle = atan2(dy, dx);
    let speed = sqrt(
      mallet.velocity.x * mallet.velocity.x +
        mallet.velocity.y * mallet.velocity.y
    );
    const maxSpeed = 20;
    // Boost factor for mallet collisions
    const boost = 1.05; 
    // Transfer momentum with a boost applied to the calculated speed
    puck.velocity.x = cos(angle) * min(speed + 10, maxSpeed) * boost;
    puck.velocity.y = sin(angle) * min(speed + 10, maxSpeed) * boost;
  }

  checkWallCollisions(puck) {
    // Friction coefficient
    const friction = 0.98; 
    // Bounciness factor
    const restitution = 0.8;
    // Boost factor to increase speed after collisions
    const boost = 1.05; 
    // Top and bottom boundaries
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

    // Scoring logic is implemented
    // Left and right boundaries (excluding goals)
    if (puck.x - puck.shape.radius <= constants.margin) {
      // Check if puck is within goal height
      if (puck.y < this.game.board.goalPost.goalY - this.game.board.goalPost.goalHeightOne / 2 ||
          puck.y > this.game.board.goalPost.goalY + this.game.board.goalPost.goalHeightOne / 2) {
        puck.x = constants.margin + puck.shape.radius + 1;
        puck.velocity.x = -puck.velocity.x * restitution * boost;
        puck.velocity.y *= friction * boost;
      } else {
        // Goal scored for player 2
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
        // Goal scored for player 1
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

  /**
   * Method to check collusion between obstacle and puck
   * @param obstacles
   */
  checkObstacleCollusion(obstacles) {
    for (let obstacle of obstacles) {
      if(this.game.puck.checkCollision(obstacle)){
        this.game.gameEngine.soundHandler.playSound("obstacleSound");
        this.handleCircleGameObjectCollision(obstacle,this.game.puck);
      }
    }
  }
}