/**
 *
 * Class which handles the shifting between levels
 *
 */

export default class LevelHandler {
  constructor(game) {
    this.game = game;
  }

  update() {
    if (this.game.level === "normal") {
      this.game.gameEngine.cpuHandler.errorFactorX = 0.15;
      this.game.gameEngine.cpuHandler.errorFactorY = 0.3;
      this.game.gameEngine.cpuHandler.speedBoost = false;
      this.game.gameEngine.cpuHandler.reactionDelay = 0.75;
      this.game.gameEngine.cpuHandler.minDistance = 20;
      this.levelHandler = new LevelHandler(this.game);
    } else if (this.game.level === "hard") {
      this.game.gameEngine.cpuHandler.errorFactorX = 0.04;
      this.game.gameEngine.cpuHandler.errorFactorY = 0.06;
      this.game.gameEngine.cpuHandler.speedBoost = true;
      this.game.gameEngine.cpuHandler.reactionDelay = 0.95;
      this.game.gameEngine.cpuHandler.minDistance = 5;
    }
  }
}
