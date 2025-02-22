export const collisionUtils = {
    circleToRect(x1, y1, rect, x2, y2, circle) {
        let closestX = constrain(x2, x1 - rect.width / 2, x1 + rect.width / 2);
        let closestY = constrain(y2, y1 - rect.height / 2, y1 + rect.height / 2);

        let distance = dist(x2, y2, closestX, closestY);
        return distance < circle.radius;
    },

    rectToRect(x1, y1, rect1, x2, y2, rect2) {
        // Calculate edges of first rectangle
        let rect1Left = x1 - rect1.width / 2;
        let rect1Right = x1 + rect1.width / 2;
        let rect1Top = y1 - rect1.height / 2;
        let rect1Bottom = y1 + rect1.height / 2;

        // Calculate edges of second rectangle
        let rect2Left = x2 - rect2.width / 2;
        let rect2Right = x2 + rect2.width / 2;
        let rect2Top = y2 - rect2.height / 2;
        let rect2Bottom = y2 + rect2.height / 2;

        // Check for collision (if no gap exists between rectangles)
        return !(rect1Left > rect2Right || 
                rect1Right < rect2Left || 
                rect1Top > rect2Bottom || 
                rect1Bottom < rect2Top);
    }
}; 