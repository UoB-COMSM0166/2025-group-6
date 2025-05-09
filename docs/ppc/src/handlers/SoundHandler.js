export default class SoundHandler {
  constructor(game) {
    this.sounds = game.sounds; 
  }

  loadSound(name, path) {
    this.sounds[name] = path;
  }

  playSound(name) {
    if (this.sounds[name] && this.sounds[name].isLoaded()) {
      this.sounds[name].play();
    } else {
      console.warn(`Sound "${name}" not loaded or not found.`);
    }
  }

  stopSound(name) {
    if (this.sounds[name]) {
      this.sounds[name].stop();
    }
  }

  setVolume(name, volume) {
    if (this.sounds[name] && this.sounds[name].isLoaded()) {
      this.sounds[name].setVolume(volume);
    } 
  }

  loopSound(name) {
    if (this.sounds[name] && this.sounds[name].isLoaded()) {
      this.sounds[name].loop();
    }
  }

  setVolumeAll() {
    this.setVolume("backgroundSound", 0.3); 
    this.setVolume("paddle", 0.2); 
    this.setVolume("board", 1);
    this.setVolume("goal", 0.5);
    this.setVolume("powerup", 0.5); 
    this.setVolume("obstacleSound", 0.5); 
    this.setVolume("clickSound",0.5);
  }

  pauseAll() {
    Object.keys(this.sounds).forEach(soundName => {
      const sound = this.sounds[soundName];
      if (sound && sound.isPlaying()) {
        sound.pause();
      }
    });
  }

  resumeAll() {
    Object.keys(this.sounds).forEach(soundName => {
      const sound = this.sounds[soundName];
      if (sound && sound.isPaused()) {
        sound.play();
      }
    });
  }
}