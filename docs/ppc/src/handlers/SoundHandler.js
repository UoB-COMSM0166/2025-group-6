export default class SoundHandler {
  constructor(game) {
    this.sounds = game.sounds; // Store all sounds in an object
  }

  // Method to load a sound
  loadSound(name, path) {
    this.sounds[name] = path;
  }

  // Method to play a sound
  playSound(name) {
    if (this.sounds[name] && this.sounds[name].isLoaded()) {
      this.sounds[name].play();
    } else {
      console.warn(`Sound "${name}" not loaded or not found.`);
    }
  }

  // Method to stop a sound
  stopSound(name) {
    if (this.sounds[name]) {
      this.sounds[name].stop();
    }
  }

  // Method to set volume for a sound
  setVolume(name, volume) {
    if (this.sounds[name] && this.sounds[name].isLoaded()) {
      this.sounds[name].setVolume(volume);
    } 
  }

  // Method to loop a sound
  loopSound(name) {
    if (this.sounds[name] && this.sounds[name].isLoaded()) {
      this.sounds[name].loop();
    }
  }

  // Set volume for all sounds
  setVolumeAll() {
    this.setVolume("backgroundSound", 0.3); // 50% volume
    this.setVolume("paddle", 0.2); // 50% volume
    this.setVolume("board", 1); // 100% volume
    this.setVolume("goal", 0.5); // 50% volume
    this.setVolume("powerup", 0.5); // 50% volume
  }

  // Pause all sounds
  pauseAll() {
    Object.keys(this.sounds).forEach(soundName => {
      const sound = this.sounds[soundName];
      if (sound && sound.isPlaying()) {
        sound.pause();
      }
    });
  }

  // Resume all sounds
  resumeAll() {
    Object.keys(this.sounds).forEach(soundName => {
      const sound = this.sounds[soundName];
      if (sound && sound.isPaused()) {
        sound.play();
      }
    });
  }
}