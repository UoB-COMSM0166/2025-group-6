
export class GameObject {
    constructor(x, y, shape) {
        this.x = x;
        this.y = y;
        this.shape = shape;
        this.velocity = { x: 0, y: 0 };
        this.margin=40
    }
    
    draw() {
        this.shape.draw(this.x, this.y);
    }
    
    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        
        
        const bounds = this.shape.getBounds();
        this.x = constrain(this.x, this.margin + bounds.width/2, width - this.margin - bounds.width/2);
        this.y = constrain(this.y, this.margin + bounds.height/2, height - this.margin - bounds.height/2);
    }
    
    checkCollision(other) {
        return this.shape.checkCollision(this.x, this.y, other.shape,other.x,other.y);
    }
}