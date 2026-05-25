class AudioSynth {
  private ctx: AudioContext | null = null;
  private ragaInterval: any = null;
  private droneInterval: any = null;
  private isRagaPlaying = false;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Play a metallic temple bell with rich resonance and multiple partial harmonics
   */
  public playTempleBell(pitch = 220) {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const partials = [1.0, 2.0, 2.4, 3.0, 3.7, 4.2];
    const gains = [1.0, 0.6, 0.5, 0.4, 0.3, 0.2];
    const decays = [4.5, 3.5, 3.0, 2.5, 1.8, 1.2];

    partials.forEach((mult, index) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch * mult, now);

      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(gains[index] * 0.12, now + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, now + decays[index]);

      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + decays[index] + 0.2);
    });
  }

  /**
   * Play a wind chime / ring chime sequence that ripples in golden light
   */
  public playChimes() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    const frequencies = [880, 987, 1046, 1174, 1318, 1568];
    frequencies.forEach((freq, idx) => {
      if (!this.ctx) return;
      const strikeTime = now + idx * 0.08;
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, strikeTime);
      
      osc.frequency.exponentialRampToValueAtTime(freq - 15, strikeTime + 1.2);

      gainNode.gain.setValueAtTime(0, strikeTime);
      gainNode.gain.linearRampToValueAtTime(0.05, strikeTime + 0.005);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, strikeTime + 1.2);

      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc.start(strikeTime);
      osc.stop(strikeTime + 1.3);
    });
  }

  /**
   * Play a low, warm sitar/tanpura-like background drone
   */
  public playDrone(duration = 3.0) {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const baseNotes = [110, 165, 220]; // A2, E3, A3
    baseNotes.forEach((freq) => {
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(freq * 1.8, now);
      filter.Q.setValueAtTime(1.5, now);

      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.015, now + 0.5); // Very soft background
      gainNode.gain.exponentialRampToValueAtTime(0.00001, now + duration);

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.2);
    });
  }

  /**
   * Simulates a breathy bansuri flute note with smooth attack and vibrato
   */
  public playFluteNote(frequency: number, duration = 3.0) {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Triangle wave contains odd harmonics, giving a woody, hollow flute-like sound
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(frequency, now);

    // Subtle pitch modulation (vibrato) for organic breath wobbling
    const vibrato = this.ctx.createOscillator();
    const vibratoGain = this.ctx.createGain();
    vibrato.frequency.value = 5.2; // 5.2Hz oscillation
    vibratoGain.gain.value = frequency * 0.008; // subtle frequency swing

    vibrato.connect(vibratoGain);
    vibratoGain.connect(osc.frequency);

    // Warm filtering to smooth out high frequencies
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(frequency * 1.6, now);
    filter.Q.setValueAtTime(1.2, now);

    // Flute breath envelope (slower attack and decay)
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.025, now + 0.8); // gentle breathing sound
    gainNode.gain.setValueAtTime(0.025, now + duration - 0.6);
    gainNode.gain.exponentialRampToValueAtTime(0.00001, now + duration);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    vibrato.start(now);
    osc.start(now);

    osc.stop(now + duration + 0.2);
    vibrato.stop(now + duration + 0.2);
  }

  /**
   * Starts a procedural South Indian classical raga (Raag Mohanam) loop.
   * This provides endless, high-performance ambient wedding background music.
   */
  public startAmbientRaga() {
    this.init();
    if (this.isRagaPlaying) return;
    this.isRagaPlaying = true;

    // Tanpura Drone Loop (continuous background hum)
    const playTanpura = () => {
      this.playDrone(5.8);
    };
    playTanpura();
    this.droneInterval = setInterval(playTanpura, 5000);

    // Raag Mohanam pentatonic scale notes (Sa, Ri, Ga, Pa, Dha) in A Major:
    // A3 (220), B3 (247.5), C#4 (275), E4 (330), F#4 (371.25), A4 (440), B4 (495), C#5 (550), E5 (660)
    const mohanamScale = [220, 247.5, 275, 330, 371.25, 440, 495, 550, 660];

    const playRandomFluteMelody = () => {
      if (!this.isRagaPlaying) return;
      const noteIdx = Math.floor(Math.random() * mohanamScale.length);
      const freq = mohanamScale[noteIdx];
      const duration = Math.random() * 2.0 + 2.0; // 2s to 4s
      this.playFluteNote(freq, duration);
    };

    // Play first note immediately
    playRandomFluteMelody();

    // Schedule subsequent notes randomly to mimic human pauses
    this.ragaInterval = setInterval(() => {
      if (Math.random() < 0.8) {
        playRandomFluteMelody();
      }
    }, 3800);
  }

  /**
   * Stops the ambient raga loop
   */
  public stopAmbientRaga() {
    this.isRagaPlaying = false;
    if (this.ragaInterval) {
      clearInterval(this.ragaInterval);
      this.ragaInterval = null;
    }
    if (this.droneInterval) {
      clearInterval(this.droneInterval);
      this.droneInterval = null;
    }
  }

  public getIsPlaying() {
    return this.isRagaPlaying;
  }
}

export const audioSynth = new AudioSynth();
export default audioSynth;
