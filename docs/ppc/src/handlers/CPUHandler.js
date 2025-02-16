import { constants } from "../core/config.js";

export default class CPUHandler {
  constructor(game) {
    this.game = game;
    this.reactionDelay = 0.30;
    this.predictionError = 0.1;
    this.aggressiveness = 0.8;
    this.maxSpeed = 25;
    this.defaultX = width * 0.75;
    this.minDistance = 30; 
  }

  update() {
    if (random() < this.reactionDelay) {
      let targetX = this.defaultX;
      let targetY = this.game.puck.y;

      if (this.game.puck.x > width / 2) {
        // Enhanced prediction based on puck velocity and position
        const puckSpeed = Math.sqrt(
          this.game.puck.velocity.x ** 2 + 
          this.game.puck.velocity.y ** 2
        );
        
        const predictionScale = map(puckSpeed, 0, 10, 1, 2);
        
        let predictedX = this.game.puck.x + 
          this.game.puck.velocity.x * predictionScale * 
          (1 + (random() - 0.5) * this.predictionError);

        // Dynamic positioning based on puck threat level
        const threatLevel = map(
          abs(this.game.puck.velocity.x), 
          0, 
          10, 
          0.7, 
          0.85
        );
        
        targetX = constrain(
          predictedX + this.minDistance,
          width / 2,
          width - constants.margin - this.game.player2.shape.width / 2
        );

        if (this.game.puck.velocity.x > 0) {
          this.game.aiOffset = random(-offsetScale, offsetScale);
        } else {
          this.game.aiOffset = random(-offsetScale/2, offsetScale/2);
        }
        
        targetY = constrain(
          this.game.puck.y + this.game.aiOffset,
          constants.margin + this.game.player2.shape.height/2,
          height - constants.margin - this.game.player2.shape.height/2
        );
      } else {
        // Defensive positioning with slight randomness
        targetX = width * (0.7 + random(0.1));
        targetY = height / 2 + random(-50, 50);
      }

      this.moveTowardsTarget(targetX, targetY);
    }
  }

  moveTowardsTarget(targetX, targetY) {
    const dx = targetX - this.game.player2.x;
    const dy = targetY - this.game.player2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Dynamic speed based on distance and puck threat
    const puckThreat = map(
      abs(this.game.puck.velocity.x), 
      0, 
      10, 
      this.aggressiveness, 
      1
    );
    
    const speed = Math.min(
      distance, 
      this.maxSpeed * puckThreat
    );

    if (distance > 1) { // Add small threshold to prevent jittering
      const angle = Math.atan2(dy, dx);
      this.game.player2.move(
        this.game.player2.x + Math.cos(angle) * speed,
        this.game.player2.y + Math.sin(angle) * speed
      );
    }
  }
}