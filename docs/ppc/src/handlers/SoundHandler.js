export default class SoundHandler {
  constructor(game) {
    this.sounds  = game.sounds;   // map of p5.SoundFile objects
    this.enabled = true;          // master on/off switch
  }

  // Play any sound only if enabled === true
  playSound(name) {
    if (!this.enabled) return;
    const s = this.sounds[name];
    if (s && s.isLoaded()) {
      s.play();
    }
  }

  // Stop a specific sound
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
    Object.keys(this.sounds).forEach(name => {
      if (name === "click") return;
      const s = this.sounds[name];
      if (s && s.isPlaying()) {
        s.pause();
      }
    });
  }

  // Resume everything except the UI click channel
  resumeAll() {
    Object.keys(this.sounds).forEach(name => {
      if (name === "click") return;
      const s = this.sounds[name];
      if (s && s.isPaused()) {
        s.play();
      }
    });
  }
}
