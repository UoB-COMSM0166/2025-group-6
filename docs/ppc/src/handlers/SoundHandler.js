export class SoundHandler {
    constructor() {
      this.sounds = {}; // Store all sounds in an object
    }
  
    // Method to load a sound
    loadSound(name, path) {
      this.sounds[name] = loadSound(path);
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
      if (this.sounds[name]) {
        this.sounds[name].setVolume(volume);
      }
    }
  
    // Method to loop a sound
    loopSound(name) {
      if (this.sounds[name] && this.sounds[name].isLoaded()) {
        this.sounds[name].loop();
      }
    }
  }