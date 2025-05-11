export default class SoundHandler {
  constructor(game) {
    this.sounds = game.sounds;
    this.enabled = true;  // Initially, sounds are enabled
  }

  playSound(name) {
    if (!this.enabled) return; // Don't play sound if not enabled
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

  // Set volume for all sounds
  setVolumeForAllSounds(volume) {
    Object.keys(this.sounds).forEach((name) => {
      this.setVolume(name, volume);  // Set the volume for each sound
    });
  }

  pauseAll() {
    Object.keys(this.sounds).forEach((name) => {
      const s = this.sounds[name];
      if (s && s.isPlaying()) {
        s.pause();  // Pause all currently playing sounds
      }
    });
  }

  resumeAll() {
    Object.keys(this.sounds).forEach((name) => {
      const s = this.sounds[name];
      if (s && s.isPaused()) {
        s.play();  // Resume all sounds that are paused
      }
    });
  }
}
