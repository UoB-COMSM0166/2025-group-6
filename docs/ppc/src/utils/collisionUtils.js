export const collisionUtils = {
    circleToRect(x1, y1, rect, x2, y2, circle) {
        let closestX = constrain(x2, x1 - rect.width / 2, x1 + rect.width / 2);
        let closestY = constrain(y2, y1 - rect.height / 2, y1 + rect.height / 2);

        let distance = dist(x2, y2, closestX, closestY);
        return distance < circle.radius;
    }
}; 