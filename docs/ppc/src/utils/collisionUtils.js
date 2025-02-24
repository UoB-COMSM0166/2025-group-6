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

    circleToCircle(x1, y1, vel1, circle1, x2, y2, circle2, vel2) {
        let subSteps = 6;
        
        // Fast collision check - first check current position
        let distance = dist(x1, y1, x2, y2);
        let radiiSum = circle1.radius + circle2.radius;
        
        if (distance <= radiiSum) return true;
        
        // Fast sweep test - check if collision is even possible
        // If the circles are moving away from each other, they won't collide
        let dx = x2 - x1;
        let dy = y2 - y1;
        let dvx = vel2.x - vel1.x;
        let dvy = vel2.y - vel1.y;
        
        // Dot product - if negative, they're moving toward each other
        let dotProduct = dx * dvx + dy * dvy;
        
        // If they're moving away from each other, no collision possible
        if (dotProduct >= 0) return false;
        
        // Line segment intersection approach (continuous collision detection)
        // Calculate previous positions by subtracting velocity from current positions
        let prevX1 = x1 - vel1.x;
        let prevY1 = y1 - vel1.y;
        let prevX2 = x2 - vel2.x;
        let prevY2 = y2 - vel2.y;
        
        // Now calculate intersection of movement paths
        let denominator = (prevX1 - x1) * (prevY2 - y2) - (prevY1 - y1) * (prevX2 - x2);
        
        if (denominator !== 0) {
            let t = ((prevX1 - prevX2) * (prevY2 - y2) - (prevY1 - prevY2) * (prevX2 - x2)) / denominator;
            let u = -((prevX1 - x1) * (prevY1 - prevY2) - (prevY1 - y1) * (prevX1 - prevX2)) / denominator;
            
            // Check if intersection occurs within the movement lines
            if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
                let intersectX = prevX1 + t * (x1 - prevX1);
                let intersectY = prevY1 + t * (y1 - prevY1);
                
                // Check if circles overlap at intersection point
                let intersectDist = dist(
                    intersectX, 
                    intersectY, 
                    prevX2 + u * (x2 - prevX2), 
                    prevY2 + u * (y2 - prevY2)
                );
                
                if (intersectDist <= radiiSum) return true;
            }
        }
        
        // Calculate velocity magnitudes
        let vel1Speed = Math.sqrt(vel1.x * vel1.x + vel1.y * vel1.y);
        let vel2Speed = Math.sqrt(vel2.x * vel2.x + vel2.y * vel2.y);
        
        // If not colliding right now, check sub-steps as a fallback
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

