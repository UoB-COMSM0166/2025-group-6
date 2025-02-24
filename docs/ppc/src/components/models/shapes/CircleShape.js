// Circle shape implementation

import { Shape } from "./Shape.js";
import { collisionUtils } from "../../../utils/collisionUtils.js";

export class CircleShape extends Shape {
  constructor(radius, type) {
    super();
    this.radius = radius;
    this.width = radius * 2;
    this.height = radius * 2;
    this.type = type;
    this.rotationSpeed = 0.02; // Default rotation speed
    this.rotationAngle = 0;
    this.glowAlpha = 200; // Glow intensity
    this.currentColor = color(0, 255, 255); // Default Neon Cyan
  }

 draw(x, y) {
  push();
  if (this.type == "puck") {
    translate(x, y);
    
    // Update glow intensity dynamically
    this.glowAlpha = map(sin(millis() / 800), -1, 1, 100, 255);
    this.rotationAngle += this.rotationSpeed; // Rotate puck dynamically
    rotate(this.rotationAngle); // Apply rotation
    
    // Calculate scaling factor to ensure all elements fit within radius
    // Since the outermost element was at 2.8 * this.radius, we need to scale down
    const scaleFactor = 1 / 2.8;
    
    // ** Base Circle (Dark Background) **
    noStroke();
    fill(50, 90, 120); // Deep teal color for contrast
    circle(0, 0, this.radius * 1.4 * scaleFactor * 2);
    
    // ** Apply Glow Effect **
    // Reduce glow blur to keep visual within radius boundaries
    drawingContext.shadowBlur = (15 + sin(millis() / 500) * 5) * scaleFactor;
    drawingContext.shadowColor = this.currentColor;
    
    // ** Outer Glow Layers (Segmented Rings) **
    noFill();
    strokeWeight(6 * scaleFactor);
    stroke(
      this.currentColor.levels[0],
      this.currentColor.levels[1],
      this.currentColor.levels[2],
      this.glowAlpha - 50
    );
    // This was the outermost element at 2.8 * radius, now scaled to fit within radius
    this.drawSegmentedRing(0, 0, this.radius * 2, 8, PI / 6);
    
    strokeWeight(5 * scaleFactor);
    stroke(
      this.currentColor.levels[0],
      this.currentColor.levels[1],
      this.currentColor.levels[2],
      this.glowAlpha
    );
    this.drawSegmentedRing(0, 0, this.radius * 1.8, 10, PI / 10);
    
    // ** Inner Glow Rings (Neon Flicker Effect) **
    strokeWeight(3 * scaleFactor);
    stroke(
      this.currentColor.levels[0],
      this.currentColor.levels[1],
      this.currentColor.levels[2],
      this.glowAlpha + random(-20, 20)
    );
    circle(0, 0, this.radius * 1.6);
    circle(0, 0, this.radius * 1.3);
    
    // ** Rotating Arc Segments **
    strokeWeight(2 * scaleFactor);
    let numArcs = 6;
    for (let i = 0; i < numArcs; i++) {
      let angle = (TWO_PI / numArcs) * i + millis() / 800;
      let arcRadius = this.radius * 0.9;
      stroke(
        this.currentColor.levels[0],
        this.currentColor.levels[1],
        this.currentColor.levels[2],
        this.glowAlpha + random(-30, 30)
      );
      arc(0, 0, arcRadius * 2, arcRadius * 2, angle, angle + PI / 10);
    }
    
    // ** Glowing Central Hexagon Core **
    this.drawGlowingHexagon(0, 0, this.radius * 0.4);
    
    // ** Radial Energy Lines **
    strokeWeight(1 * scaleFactor);
    stroke(
      this.currentColor.levels[0],
      this.currentColor.levels[1],
      this.currentColor.levels[2],
      this.glowAlpha + random(-20, 20)
    );
    let numLines = 16;
    for (let i = 0; i < numLines; i++) {
      let angle = (TWO_PI / numLines) * i;
      let x1 = cos(angle) * this.radius * 0.4;
      let y1 = sin(angle) * this.radius * 0.4;
      let x2 = cos(angle) * this.radius * 0.9;
      let y2 = sin(angle) * this.radius * 0.9;
      line(x1, y1, x2, y2);
    }
  } else {
    circle(x, y, this.radius * 2);
  }
  
  pop();
}
  // ** Function to Draw Segmented Rings **
  drawSegmentedRing(x, y, diameter, segments, gap) {
    for (let i = 0; i < segments; i++) {
      let startAngle = (TWO_PI / segments) * i + gap;
      let endAngle = startAngle + PI / 12;
      strokeWeight(6 + sin(millis() / 500) * 2);
      arc(x, y, diameter, diameter, startAngle, endAngle);
    }
  }

  // ** Function to Draw a Glowing Hexagon **
  drawGlowingHexagon(x, y, hexRadius) {
    push();
    translate(x, y);

    drawingContext.shadowBlur = 60 + sin(millis() / 600) * 10;
    drawingContext.shadowColor = this.currentColor;
    strokeWeight(8);
    stroke(
      this.currentColor.levels[0],
      this.currentColor.levels[1],
      this.currentColor.levels[2],
      80
    );
    noFill();
    beginShape();
    for (let i = 0; i < 6; i++) {
      let angle = (TWO_PI * i) / 6;
      let vx = cos(angle) * hexRadius * 1.2;
      let vy = sin(angle) * hexRadius * 1.2;
      vertex(vx, vy);
    }
    endShape(CLOSE);

    strokeWeight(3);
    stroke(this.currentColor);
    fill(
      this.currentColor.levels[0],
      this.currentColor.levels[1],
      this.currentColor.levels[2],
      200
    );
    rotate(-this.rotationAngle * 2);
    beginShape();
    for (let i = 0; i < 6; i++) {
      let angle = (TWO_PI * i) / 6;
      let vx = cos(angle) * hexRadius * 0.8;
      let vy = sin(angle) * hexRadius * 0.8;
      vertex(vx, vy);
    }
    endShape(CLOSE);

    pop();
  }
  checkCollision(x1, y1, vel1, other, x2, y2, vel2) {
    if (other.constructor.name === "CircleShape") {
      return collisionUtils.circleToCircle(
        x1,
        y1,
        vel1,
        this,
        x2,
        y2,
        other,
        vel2
      );
    }
    if (other.constructor.name === "RectShape") {
      return collisionUtils.circleToRect(
        x1,
        y1,
        vel1,
        this,
        x2,
        y2,
        other,
        vel2
      );
    }
    return false;
  }

  getBounds() {
    return {
      width: this.width,
      height: this.height,
    };
  }
}
