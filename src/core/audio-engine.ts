class AudioEngine { 
  actx: AudioContext | undefined;
  song: Record<string, unknown>[] | undefined;
  step: number | undefined;
  nextT: number | undefined;
  timer: number | undefined;

  unlock() {
    if (!this.actx) this.actx = new AudioContext();

    if (this.actx.state === 'suspended') { 
      const node = this.actx.createBufferSource();
      node.buffer = this.actx.createBuffer(1, 1, 48000);
      node.start(0);
    }
  }

  play(song: Record<string, unknown>[]) {
    this.song = song;
    this.step = 0;
    this.nextT = this.actx!.currentTime + 0.12;
    this.timer = setInterval(() => this.tick(10), 25);
  }
  
  stop() { 
    if (this.actx?.state === 'running') { 
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  scheduleStep(step: unknown, time: number) { 
    const osc = this.actx!.createOscillator();
    if (time % 2 === 0) osc.frequency.value = 440;
    else if (time % 3 === 0) osc.frequency.value = 660;
    else osc.frequency.value = 880;
    osc.connect(this.actx!.destination);
    osc.start(time);
    osc.stop(time + 0.05);
  }

  tick(BPM: number) { 
    while (this.nextT && this.nextT < this.actx!.currentTime + 0.12) {
      this.scheduleStep(this.song![this.step!], this.nextT);
      this.step = (this.step! + 1) % this.song!.length;
      this.nextT += 0.25 * (60 / BPM / 4);
    }
  }
}

export const audioEngine = new AudioEngine();