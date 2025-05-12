/**
 * Class handling all sound-related functionality in the game
 * includes:
 * methods to play, stop, and adjust volume for individual or all sounds
 * methods to pause and resume all currently playing sounds
 * respects sound enabled/disabled state before playing audio
 *
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

  setVolume(name, volume) {
    const s = this.sounds[name];
    if (s && s.isLoaded()) {
      s.setVolume(volume);
    }
  }

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
