import { Obstacle }    from "../components/models/objects/Obstacle.js";
import { CircleShape } from "../components/models/shapes/CircleShape.js";


/**
 * Class handling spawning, updating, and rendering of in-game obstacles
 * includes:
 * method to spawn obstacles at random intervals and locations
 * method to update obstacle list based on game state and score
 * method to draw active obstacles on the game board
 *
 */


export default class ObstacleHandler {
  constructor(game) {
    this.game = game;
    this.obstacles = [];
    this.nextSpawnTime = this.getRandomSpawnTime(); 
    this.hasSpawn = false;
  }

  getRandomSpawnTime() {
    return millis() + random(3000, 7000);
  }

  spawnObstacle() {
    let x = random(100, this.game.board.boardWidth - 100); 
    let y = random(100, this.game.board.boardHeight - 100);
    let radius = random(width * 0.013, width * 0.015);
    this.obstacles.push(new Obstacle(x, y, new CircleShape(radius, "obstacle")));
    this.nextSpawnTime = this.getRandomSpawnTime();
  }

  updateObstacles(gameActive) {
    if (gameActive && millis() > this.nextSpawnTime && (this.game.player1.score >= 3 || this.game.player2.score >= 3) && !this.hasSpawn) {
      if (this.game.player2.score >= 6 || this.game.player1.score >= 6) {
        this.hasSpawn = true;
      }
      this.spawnObstacle();
    }
    this.obstacles = this.obstacles.filter((obstacle) => !obstacle.isExpired());
  }

  drawObstacles() {
    for (let obstacle of this.obstacles) {
      obstacle.draw();
    }
  }
}
