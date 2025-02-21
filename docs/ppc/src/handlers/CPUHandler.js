import { constants } from "../core/config.js";

export default class CPUHandler {
  constructor(game) {
    this.game = game;
    this.reactionDelay = 0.70;
    this.aggressiveness = 0.75;
    this.maxSpeed = 30;
    this.defaultX = width * 0.75;
    this.minDistance = 5; 
    this.offsetScale = 5;
    this.aioffset = 5;
  }

  update() {
    if (random() < this.reactionDelay) {
      let targetX = this.defaultX;
      let targetY = this.game.puck.y;

      if (this.game.puck.x > width / 2 && this.game.puck.x < this.game.player2.x) {
        // Enhanced prediction based on puck velocity and position
        const puckSpeed = Math.sqrt(
          this.game.puck.velocity.x ** 2 + 
          this.game.puck.velocity.y ** 2
        );
        
        const predictionScale = map(puckSpeed, 0, 10, 1, 2);
        
        let predictedX = this.game.puck.x + (this.game.puck.velocity.x * predictionScale);

        targetX = constrain(
          predictedX + this.minDistance,
          width / 2,
          width - constants.margin - this.game.player2.shape.width / 2
        );

        if (this.game.puck.velocity.x > 0) {
          this.aiOffset = random(-this.offsetScale, this.offsetScale);
        } else {
          this.aiOffset = random(-this.offsetScale/2, this.offsetScale/2);
        }
        
        targetY = constrain(
          this.game.puck.y + this.aiOffset,
          constants.margin + this.game.player2.shape.height/2,
          height - constants.margin - this.game.player2.shape.height/2
        );
      } else {
        targetX = width * 0.75;
        targetY = height / 2 ;
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

    if (distance > 1) { 
      const angle = Math.atan2(dy, dx);
      this.game.player2.move(
        this.game.player2.x + Math.cos(angle) * speed,
        this.game.player2.y + Math.sin(angle) * speed
      );
    }
  }
}