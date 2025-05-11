import { constants } from "../core/config.js";

// How the CPU plays the game and how does it moves towards the puck and perform the collision
export default class CPUHandler {
  constructor(game) {
    this.game = game;
    this.reactionDelay = 0.70;
    this.aggressiveness = 0.75;
    this.maxSpeed = 20;
    this.defaultX = width * 0.75;
    this.minDistance = 15; 
    this.offsetScale = 5;
    this.aioffset = 5;
    this.errorFactorX = 0.15;
    this.errorFactorY = 0.20;
    this.fixedCommonOffset =30
    this.speedBoost = false;
  }

  update() {
    if (random() < this.reactionDelay) {
      let targetX = this.defaultX;
      let targetY = this.game.puck.y;
     
      if(this.game.firePowerUp.active && this.game.firePowerUp.x > width / 2){
       targetX = this.game.firePowerUp.x
       targetY = this.game.firePowerUp.y;
      }

      else if (this.game.puck.x > width / 2 && this.game.puck.x < this.game.player2.x) {
        const puckSpeed = Math.sqrt(this.game.puck.velocity.x ** 2 + this.game.puck.velocity.y ** 2);
        const predictionScale = map(puckSpeed, 0, 10, 1, 2);
        let predictedX = this.game.puck.x + (this.game.puck.velocity.x * predictionScale) * (1 + random(-this.errorFactorX, this.errorFactorX));
        targetX = constrain(predictedX + this.minDistance, width / 2, width - constants.margin - this.game.player2.shape.width / 2);

        if (this.game.puck.velocity.x > 0) {
          this.aiOffset = random(-this.offsetScale, this.offsetScale);
        } else {
          this.aiOffset = random(-this.offsetScale/2, this.offsetScale/2);
        }
        
        targetY = constrain(
          this.game.puck.y * (1 + random(-this.errorFactorY, this.errorFactorY)) + this.aiOffset,
          constants.margin + this.game.player2.shape.height/2,
          height - constants.margin - this.game.player2.shape.height/2
        );
      } else {
        targetX = width * 0.75;
        targetY = height / 2;
      }

      // For the ensuring the paddle stays within bounds
      targetX = constrain(targetX, width / 2, width - constants.margin - this.game.player2.shape.width / 2);
      targetY = constrain(targetY, constants.margin + this.game.player2.shape.height/2, height - constants.margin - this.game.player2.shape.height/2);

      this.moveTowardsTarget(targetX, targetY);
    }
  }

  moveTowardsTarget(targetX, targetY) {
    const dx = targetX - this.game.player2.x;
    const dy = targetY - this.game.player2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    const puckThreat = map(abs(this.game.puck.velocity.x), 0, 10, this.aggressiveness, 1);
    const speedNormal = Math.min(distance, this.maxSpeed * puckThreat)+10;

    const speedHard = Math.max(distance, this.maxSpeed * puckThreat * 1.5);
    const speed = this.speedBoost ? speedHard : speedNormal;

    if (distance > 1) { 
      const angle = Math.atan2(dy, dx);
      this.game.player2.move(this.game.player2.x + Math.cos(angle) * speed, this.game.player2.y + Math.sin(angle) * speed);
    }
  }
}