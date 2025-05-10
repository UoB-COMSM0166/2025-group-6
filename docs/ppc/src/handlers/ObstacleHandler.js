import { Obstacle } from "../components/models/objects/Obstacle.js";
import { CircleShape } from "../components/models/shapes/CircleShape.js";

/**
 * Class to handle obstacle logic
 * Obstacle spawn, expiry, draw handled in this class
 */

export default class ObstacleHandler {
  constructor(game) {
    this.game = game;
    this.obstacles = [];
    this.nextSpawnTime = this.getRandomSpawnTime(); // Get initial random spawn time
    this.hasSpawn = false; // 10 seconds lifespan
  }
  getRandomSpawnTime() {
    return millis() + random(3000, 7000);
  }

  spawnObstacle() {
    let x = random(100, this.game.board.boardWidth - 100); // Avoid near the edges
    let y = random(100, this.game.board.boardHeight - 100);
    let radius = random(20, 25);
    this.obstacles.push(
      new Obstacle(x, y, new CircleShape(radius, "obstacle"))
    );
    this.nextSpawnTime = this.getRandomSpawnTime(); // Set next random spawn time
  }
  updateObstacles(gameActive) {
    if (
      gameActive &&
      millis() > this.nextSpawnTime &&
      (this.game.player1.score >= 3 || this.game.player2.score >= 3) &&
      !this.hasSpawn
    ) {
      if (this.game.player2.score >= 6 || this.game.player1.score >= 6) {
        this.hasSpawn = true;
      }
      this.spawnObstacle();
    }

    // Remove obstacles that have expired (after 10 seconds)
    this.obstacles = this.obstacles.filter((obstacle) => !obstacle.isExpired());
  }

  // Function to draw obstacles
  drawObstacles() {
    for (let obstacle of this.obstacles) {
      obstacle.draw();
    }
  }
}
