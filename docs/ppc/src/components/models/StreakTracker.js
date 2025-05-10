/**
 * This class is responsible for keeping the track of score streaks, updating it and resetting it.
 */
export default class StreakTracker {
    constructor() {
        this.scoreHistory = [];

        // Keeping the track of current streak
        this.currentStreak = {
            player: null,
            count: 0
        };
    }

    /**
     * This function will be called whenever the goal is scored.
     * @param scoringPlayer - It can be either player or CPU.
     */
    addScore(scoringPlayer) {
        this.scoreHistory.push(scoringPlayer);

        if (this.currentStreak.player === scoringPlayer) {
            this.currentStreak.count++;
        } else {
            this.currentStreak.player = scoringPlayer;
            this.currentStreak.count = 1;
        }
    }

    /**
     * This function returns the current streak details including player, count, and hot streak status.
     * @returns {{player: null, count: number, isHot: boolean}}
     */
    getCurrentStreak() {
        return {
            player: this.currentStreak.player,
            count: this.currentStreak.count,
            isHot: this.currentStreak.count >= 3 // Consider 3+ goals a "hot" streak
        };
    }

    /**
     * This function clears all tracking data and resets the streak state.
     */
    reset() {
        this.scoreHistory = [];
        this.currentStreak = {
            player: null,
            count: 0
        };
    }
}