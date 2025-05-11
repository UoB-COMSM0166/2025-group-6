// Class for handling all sounds that the game will create and how and when it will be triggered

export default class SoundHandler {
  constructor(game) {
    this.sounds = game.sounds;
    this.enabled = true;  // Initially, sounds are enabled
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
      this.setVolume(name, volume);  
    });
  }

  pauseAll() {
    Object.keys(this.sounds).forEach((name) => {
      const s = this.sounds[name];
      if (s && s.isPlaying()) {
        s.pause();  
      }
    });
  }

  resumeAll() {
    Object.keys(this.sounds).forEach((name) => {
      const s = this.sounds[name];
      if (s && s.isPaused()) {
        s.play();  
      }
    });
  }
}
