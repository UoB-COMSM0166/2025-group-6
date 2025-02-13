class Paddle {
    constructor(x, y, width, height, color, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = speed;
    }

    update(moveUp, moveDown) {
        // Move paddle up or down
        if (moveUp && this.y > 0) {
            this.y -= this.speed;
        }
        if (moveDown && this.y + this.height < height) {
            this.y += this.speed;
        }
    }

    draw() {
        fill(this.color);
        noStroke();
        rect(this.x, this.y, this.width, this.height);
    }
}
