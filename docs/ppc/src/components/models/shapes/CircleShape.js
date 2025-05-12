import {Shape} from "./Shape.js";
import {collisionUtils} from "../../../utils/collisionUtils.js";

/**
 * All objects having circle shape wil be using this class to draw circle shape
 * These are injected into object claases and has a composition relation with object classes
 * includes:
 * method to draw the shape
 * method to check collisions between circle shaped objects
 * method to get bounds of circle shaped objects
 */

export class CircleShape extends Shape {
    constructor(radius, type, leftSide) {
        super();
        this.radius = radius;
        this.width = radius * 2;
        this.height = radius * 2;
        this.type = type;
        this.leftSide = leftSide;
        this.rotationSpeed = 0.02; 
        this.rotationAngle = 0;
        this.glowAlpha = 200; 
        this.currentColor = color(0, 255, 255);
    }

    draw(x, y) {
        push();
        if (this.type == "puck") {
            translate(x, y);

            this.glowAlpha = map(sin(millis() / 800), -1, 1, 100, 255);
            this.rotationAngle += this.rotationSpeed; 
            rotate(this.rotationAngle); 

            const scaleFactor = 1 / 2.8;

            noStroke();
            fill(50, 90, 120); 
            circle(0, 0, this.radius * 1.4 * scaleFactor * 2);

           
            drawingContext.shadowBlur = (15 + sin(millis() / 500) * 5) * scaleFactor;
            drawingContext.shadowColor = this.currentColor;

            noFill();
            strokeWeight(6 * scaleFactor);
            stroke(
                this.currentColor.levels[0],
                this.currentColor.levels[1],
                this.currentColor.levels[2],
                this.glowAlpha - 50
            );
            this.drawSegmentedRing(0, 0, this.radius * 2, 8, PI / 6);

            strokeWeight(5 * scaleFactor);
            stroke(
                this.currentColor.levels[0],
                this.currentColor.levels[1],
                this.currentColor.levels[2],
                this.glowAlpha
            );
            this.drawSegmentedRing(0, 0, this.radius * 1.8, 10, PI / 10);

            strokeWeight(3 * scaleFactor);
            stroke(
                this.currentColor.levels[0],
                this.currentColor.levels[1],
                this.currentColor.levels[2],
                this.glowAlpha + random(-20, 20)
            );
            circle(0, 0, this.radius * 1.6);
            circle(0, 0, this.radius * 1.3);

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

            this.drawGlowingHexagon(0, 0, this.radius * 0.4);

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
        } else if (this.type == "obstacle") {
            let pulseFactor = 0;
            pulseFactor = sin(frameCount * 0.05) * 10; 
            translate(x, y);

            drawingContext.shadowBlur = 50 + pulseFactor; 
            drawingContext.shadowColor = color(180, 0, 255, 200 + pulseFactor * 2);
            fill(0, 200, 255, 180); 
            stroke(255, 0, 200);
            strokeWeight(4);
            circle(0, 0, (this.radius * 2) + pulseFactor); 

            drawingContext.shadowBlur = 20;
            fill(20, 20, 60, 220); 
            noStroke();
            circle(0, 0, this.radius * 1.2);

            pop();
        } else {
            push();
            translate(x, y);

            let malletColor = this.leftSide ? color(255, 0, 150) : color(150, 0, 255); 
            let glowColor = this.leftSide ? color(255, 100, 200) : color(180, 100, 255); 

            drawingContext.shadowBlur = 40; 
            drawingContext.shadowColor = glowColor;

            strokeWeight(4);
            stroke(malletColor);
            fill(malletColor.levels[0], malletColor.levels[1], malletColor.levels[2], 180); 
            circle(0, 0, this.radius * 1.6);

            drawingContext.shadowBlur = 20; 
            fill(30, 30, 30, 200);
            noStroke();
            circle(0, 0, this.radius * 1);

            strokeWeight(2);
            stroke(malletColor.levels[0], malletColor.levels[1], malletColor.levels[2], 150);

            let numLines = 8; 
            for (let i = 0; i < numLines; i++) {
                let angle = (TWO_PI / numLines) * i;
                let x1 = cos(angle) * this.radius * 0.4;
                let y1 = sin(angle) * this.radius * 0.4;
                let x2 = cos(angle) * this.radius * 0.9;
                let y2 = sin(angle) * this.radius * 0.9;
                line(x1, y1, x2, y2);
            }

            fill(100, 100, 100, 220);
            circle(0, 0, this.radius * 0.8);

            drawingContext.shadowBlur = 0;


            pop();
        }


        pop();
    }

    drawSegmentedRing(x, y, diameter, segments, gap) {
        for (let i = 0; i < segments; i++) {
            let startAngle = (TWO_PI / segments) * i + gap;
            let endAngle = startAngle + PI / 12;
            strokeWeight(6 + sin(millis() / 500) * 2);
            arc(x, y, diameter, diameter, startAngle, endAngle);
        }
    }

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
