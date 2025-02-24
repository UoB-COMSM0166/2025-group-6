export const collisionUtils = {
    circleToRect(x1, y1,vel1, circle, x2, y2, rect,vel2) {
        let closestX = constrain(x1, x2 - rect.width / 2, x2 + rect.width / 2);
        let closestY = constrain(y1, y2 - rect.height / 2, y2 + rect.height / 2);

        let distance = dist(x1, y1, closestX, closestY);
        return distance < circle.radius;
    },

    rectToRect(x1, y1,vel1, rect1, x2, y2, rect2,vel2) {
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
    },

    circleToCircle(x1, y1, vel1, circle1, x2, y2, circle2, vel2, ) {
        let subSteps = 6;
        // First check current position
        let distance = dist(x1, y1, x2, y2);
        let radiiSum = circle1.radius + circle2.radius;
        
        if (distance <= radiiSum) return true;
        
        // Calculate velocity magnitudes manually
        let vel1Speed = Math.sqrt(vel1.x * vel1.x + vel1.y * vel1.y);
        let vel2Speed = Math.sqrt(vel2.x * vel2.x + vel2.y * vel2.y);
        
        // If not colliding right now, check sub-steps
        // Only do sub-step checks if either object is moving
        if (vel1Speed > 0 || vel2Speed > 0) {
            // Calculate movement per sub-step
            let dx1 = vel1.x / subSteps;
            let dy1 = vel1.y / subSteps;
            let dx2 = vel2.x / subSteps;
            let dy2 = vel2.y / subSteps;
            
            // Check each sub-step position
            let tempX1 = x1;
            let tempY1 = y1;
            let tempX2 = x2;
            let tempY2 = y2;
            
            for (let i = 0; i < subSteps; i++) {
                // Move both circles by their sub-step amount
                tempX1 += dx1;
                tempY1 += dy1;
                tempX2 += dx2;
                tempY2 += dy2;
                
                // Check collision at this sub-step
                let subDistance = dist(tempX1, tempY1, tempX2, tempY2);
                if (subDistance <= radiiSum) {
                    return true;
                }
            }
        }
        
        return false;
    }
}; 

