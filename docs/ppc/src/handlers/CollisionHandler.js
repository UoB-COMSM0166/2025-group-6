import { constants } from "../core/config.js";
import game from "../core/Game.js";

export default class CollisionHandler {
  constructor(game) {
    this.game=game;
  }

  update() {
    this.checkMalletPuckCollisions();
    this.checkWallCollisions(this.game.puck);
  }

  checkMalletPuckCollisions() {
    // Check collisions between mallets and puck
    if (this.game.player1.checkCollision(this.game.puck)) {
      this.handleMalletPuckCollision(this.game.player1, game.puck);
    }
    if (this.game.player2.checkCollision(this.game.puck)) {
      this.handleMalletPuckCollision(this.game.player2, this.game.puck);
    }
  }

  handleMalletPuckCollision(mallet, puck) {
    let closestX = constrain(
      puck.x,
      mallet.x - mallet.shape.width / 2,
      mallet.x + mallet.shape.width / 2
    );
    let closestY = constrain(
      puck.y,
      mallet.y - mallet.shape.height / 2,
      mallet.y + mallet.shape.height / 2
    );

    // Calculate collision angle from closest point
    let dx = puck.x - closestX;
    let dy = puck.y - closestY;
    let angle = atan2(dy, dx);

    // Calculate mallet's effective speed at the collision point
    let relativeX = closestX - mallet.x;
    let relativeY = closestY - mallet.y;
    let speed = sqrt(
      mallet.velocity.x * mallet.velocity.x +
        mallet.velocity.y * mallet.velocity.y
    );

    // Add rotational effect based on where the puck hits the paddle
    let spinEffect = (relativeY / (mallet.shape.height / 2)) * 0.5; // -0.5 to 0.5
    angle += spinEffect;

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
    } else if (puck.y + puck.shape.radius >= height - constants.margin) {
      // Prevent sticking by moving puck just outside boundary
      puck.y = height - constants.margin - puck.shape.radius - 1;
      puck.velocity.y = -puck.velocity.y * restitution * boost;
      puck.velocity.x *= friction * boost;
    }

    // Scoring logic is implemented , can be moved late to appropriate place
    // Left and right boundaries (excluding goals)
    if (puck.x - puck.shape.radius <= constants.margin) {
      // Check if puck is within goal height
      if (
        puck.y < game.board.goalPost.goalY - game.board.goalPost.goalHeight/2||
        puck.y > game.board.goalPost.goalY + game.board.goalPost.goalHeight/2
      ) {
        // Prevent sticking by moving puck just outside boundary
        puck.x = constants.margin + puck.shape.radius + 1;
        puck.velocity.x = -puck.velocity.x * restitution * boost;
        puck.velocity.y *= friction * boost;
      } else {
        // Goal scored for player 2
        game.player2.score++;
        puck.reset();
      }
    } else if (puck.x + puck.shape.radius >= width - constants.margin) {
      // Check if puck is within goal height
      if (
        puck.y < game.board.goalPost.goalY - game.board.goalPost.goalHeight/2||
        puck.y > game.board.goalPost.goalY + game.board.goalPost.goalHeight/2
      ) {
        // Prevent sticking by moving puck just outside boundary
        puck.x = width - constants.margin - puck.shape.radius - 1;
        puck.velocity.x = -puck.velocity.x * restitution * boost;
        puck.velocity.y *= friction * boost;
      } else {
        // Goal scored for player 1
        game.player1.score++;
        puck.reset();
      }
    }
  }
}
