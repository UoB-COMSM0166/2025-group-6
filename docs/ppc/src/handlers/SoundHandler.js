/**
 * Manages game audio functionality with controls for playing,
 * stopping, looping sounds and global audio toggling.
 */

export default class SoundHandler {
  constructor(game) {
    this.sounds = game.sounds;
    this.enabled = true;
  }

  playSound(name) {
    if (!this.enabled) return;
    const s = this.sounds[name];
    if (s && s.isLoaded()) {
      s.play();
    }
  }

  stopSound(name) {
    const s = this.sounds[name];
    if (s) s.stop();
  }

  // Loop a sound (e.g. background music)
  loopSound(name) {
    const s = this.sounds[name];
    if (s && s.isLoaded()) {
      s.loop();
    }
  }

  // Set volume if loaded
  setVolume(name, volume) {
    const s = this.sounds[name];
    if (s && s.isLoaded()) {
      s.setVolume(volume);
    }
  }

  // Pause everything except the UI click channel
  pauseAll() {
    Object.keys(this.sounds).forEach((name) => {
      if (name === "click") return;
      const s = this.sounds[name];
      if (s && s.isPlaying()) {
        s.pause();
      }
    });
  }

  // Resume everything except the UI click channel
  resumeAll() {
    Object.keys(this.sounds).forEach((name) => {
      if (name === "click") return;
      const s = this.sounds[name];
      if (s && s.isPaused()) {
        s.play();
      }
    });
  }
}
