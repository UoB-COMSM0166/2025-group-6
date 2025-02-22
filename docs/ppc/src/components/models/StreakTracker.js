export default class StreakTracker {
    constructor() {
      this.scoreHistory = [];
      
      // Keep track of current streak
      this.currentStreak = {
        player: null, 
        count: 0
      };

    }
  
    // Call this whenever a goal is scored
    addScore(scoringPlayer) {
      // Add to history
      this.scoreHistory.push(scoringPlayer);
  
      // Update current streak
      if (this.currentStreak.player === scoringPlayer) {
        this.currentStreak.count++;
      } else {
        // Different player scored - reset streak
        this.currentStreak.player = scoringPlayer;
        this.currentStreak.count = 1;
      }
  
    }
  
    // Get current streak info
    getCurrentStreak() {
      return {
        player: this.currentStreak.player,
        count: this.currentStreak.count,
        isHot: this.currentStreak.count >= 3 // Consider 3+ goals a "hot" streak
      };
    }

  
    // Reset all streak data
    reset() {
      this.scoreHistory = [];
      this.currentStreak = {
        player: null,
        count: 0
      };
    }
  }