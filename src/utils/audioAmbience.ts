class AtelierAudioAmbience {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private lfo: OscillatorNode | null = null;
  private isPlaying: boolean = false;

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getPlayingState(): boolean {
    return this.isPlaying;
  }

  public start(): void {
    if (this.isPlaying) return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.06, this.ctx.currentTime + 3); // Soft ambient volume
      this.masterGain.connect(this.ctx.destination);

      // Low frequency sub drone (55Hz / A1)
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'sine';
      this.osc1.frequency.setValueAtTime(55, this.ctx.currentTime);

      // Resonant harmonic layer (110Hz / A2)
      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = 'triangle';
      this.osc2.frequency.setValueAtTime(110.2, this.ctx.currentTime);

      // Low pass filter for warm subterranean acoustic luxury
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(180, this.ctx.currentTime);

      // Slow LFO for subtle breath-like volume modulation
      this.lfo = this.ctx.createOscillator();
      this.lfo.frequency.setValueAtTime(0.08, this.ctx.currentTime);
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(40, this.ctx.currentTime);
      this.lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      this.osc1.connect(filter);
      this.osc2.connect(filter);
      filter.connect(this.masterGain);

      this.osc1.start();
      this.osc2.start();
      this.lfo.start();

      this.isPlaying = true;
    } catch {
      // Audio context blocked or unsupported
      this.isPlaying = false;
    }
  }

  public stop(): void {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    try {
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);

      setTimeout(() => {
        try {
          this.osc1?.stop();
          this.osc2?.stop();
          this.lfo?.stop();
          this.ctx?.close();
        } catch {
          // Cleaned up
        }
        this.ctx = null;
        this.isPlaying = false;
      }, 1200);
    } catch {
      this.isPlaying = false;
    }
  }
}

export const atelierAudio = new AtelierAudioAmbience();
