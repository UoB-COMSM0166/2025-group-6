class Puck {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.vx = 0; // X velocity
        this.vy = 0; // Y velocity
    }

    update() {
        // Move the puck
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off top and bottom walls
        if (this.y - this.radius <= 0 || this.y + this.radius >= height) {
            this.vy *= -1;
        }
    }

    draw() {
        fill(this.color);
        noStroke();
        ellipse(this.x, this.y, this.radius * 2);
    }

    reset() {
        // Reset puck to the center
        this.x = width / 2;
        this.y = height / 2;
        this.vx = 0;
        this.vy = 0;
    }
}
