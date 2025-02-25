import { constants } from "../core/config.js";

export default class CollisionHandler {
  constructor(game) {
    this.game = game;
  }

  update() {
    this.checkMalletPuckCollisions();
    this.checkWallCollisions(this.game.puck);
    this.checkPowerUpCollosions(this.game.firePowerUp);
  }

  checkMalletPuckCollisions() {
    // Check collisions between mallets and puck
    if (this.game.player1.checkCollision(this.game.puck)) {
      this.handleMalletPuckCollision(this.game.player1, this.game.puck);
      this.game.gameEngine.soundHandler.playSound("paddle");    }
    if (this.game.player2.checkCollision(this.game.puck)){
      this.handleMalletPuckCollision(this.game.player2, this.game.puck);
      this.game.gameEngine.soundHandler.playSound("paddle");    }
  }

  handleMalletPuckCollision(mallet, puck) {
 
    // Calculate collision angle from closest point
    let dx = puck.x - mallet.x;
    let dy = puck.y - mallet.y;
    let angle = atan2(dy, dx);

    // Calculate mallet's effective speed at the collision point
    let speed = sqrt(
      mallet.velocity.x * mallet.velocity.x +
        mallet.velocity.y * mallet.velocity.y
    );
    const maxSpeed = 20;
    const boost = 1.05; // Boost factor for mallet collisions

    // Transfer momentum with a boost applied to the calculated speed
    puck.velocity.x = cos(angle) * min(speed + 10, maxSpeed) * boost;
    puck.velocity.y = sin(angle) * min(speed + 10, maxSpeed) * boost;
    // to be implemented
  }

  checkWallCollisions(puck) {
    const friction = 0.98; // Friction coefficient
    const restitution = 0.8; // Bounciness factor
    const boost = 1.05; // Boost factor to increase speed after collisions

    // Top and bottom boundaries
    if (puck.y - puck.shape.radius <= constants.margin) {
      // Prevent sticking by moving puck just outside boundary
      puck.y = constants.margin + puck.shape.radius + 1;
      puck.velocity.y = -puck.velocity.y * restitution * boost;
      puck.velocity.x *= friction * boost;
       this.game.gameEngine.soundHandler.playSound("board"); 

    } else if (puck.y + puck.shape.radius >= height - constants.margin) {
      // Prevent sticking by moving puck just outside boundary
      puck.y = height - constants.margin - puck.shape.radius - 1;
      puck.velocity.y = -puck.velocity.y * restitution * boost;
      puck.velocity.x *= friction * boost;
      this.game.gameEngine.soundHandler.playSound("board"); 

    }

    // Scoring logic is implemented , can be moved late to appropriate place
    // Left and right boundaries (excluding goals)
    if (puck.x - puck.shape.radius <= constants.margin) {
      // Check if puck is within goal height
      if (
        puck.y <
          this.game.board.goalPost.goalY -
            this.game.board.goalPost.goalHeightOne / 2 ||
        puck.y >
          this.game.board.goalPost.goalY +
            this.game.board.goalPost.goalHeightOne / 2
      ) {
        // Prevent sticking by moving puck just outside boundary
        puck.x = constants.margin + puck.shape.radius + 1;
        puck.velocity.x = -puck.velocity.x * restitution * boost;
        puck.velocity.y *= friction * boost;
      } else {
        // Goal scored for player 2
        this.game.scoreBoard.streakTracker.addScore(this.game.player2);
        this.game.player2.score++;
        puck.reset();
      this.game.gameEngine.soundHandler.playSound("goal"); 
      }
    } else if (puck.x + puck.shape.radius >= width - constants.margin) {
      // Check if puck is within goal height
      if (
        puck.y <
          this.game.board.goalPost.goalY -
            this.game.board.goalPost.goalHeightTwo / 2 ||
        puck.y >
          this.game.board.goalPost.goalY +
            this.game.board.goalPost.goalHeightTwo / 2
      ) {
        // Prevent sticking by moving puck just outside boundary
        puck.x = width - constants.margin - puck.shape.radius - 1;
        puck.velocity.x = -puck.velocity.x * restitution * boost;
        puck.velocity.y *= friction * boost;
      } else {
        // Goal scored for player 1
        this.game.scoreBoard.streakTracker.addScore(this.game.player1);
        this.game.player1.score++;
        puck.reset();
      this.game.gameEngine.soundHandler.playSound("goal"); 
      }
    }
  }

  checkPowerUpCollosions(powerUp) {
    if (this.game.firePowerUp.active == true) {
      const currentStreak =
        this.game.scoreBoard.streakTracker.getCurrentStreak();
        if (
          this.game.player1.checkCollision(powerUp) ||
          this.game.player2.checkCollision(powerUp)
        ) {
          this.game.gameEngine.powerUpHandler.enablePowerUpEffect();
          this.game.gameEngine.powerUpHandler.deactivatePowerup();
          this.game.soundHandler.playSound("powerup");
      }
    }
  }
}