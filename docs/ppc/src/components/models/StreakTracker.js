/**
 * This class is responsible for keeping the track of score streaks, updating it and resetting it.
 */
export default class StreakTracker {
    constructor() {
        this.scoreHistory = [];

        this.currentStreak = {
            player: null,
            count: 0
        };
    }

  
    addScore(scoringPlayer) {
        this.scoreHistory.push(scoringPlayer);

        if (this.currentStreak.player === scoringPlayer) {
            this.currentStreak.count++;
        } else {
            this.currentStreak.player = scoringPlayer;
            this.currentStreak.count = 1;
        }
    }

    
    getCurrentStreak() {
        return {
            player: this.currentStreak.player,
            count: this.currentStreak.count,
            isHot: this.currentStreak.count >= 3 
        };
    }

   
    reset() {
        this.scoreHistory = [];
        this.currentStreak = {
            player: null,
            count: 0
        };
    }
}