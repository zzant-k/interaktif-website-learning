// Lightweight Web Audio 8-bit synthesizer for tactile retro feedback without external files
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioContextClass =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!audioCtx) {
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    void audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function playTone(
  freq: number,
  durationSec: number,
  type: OscillatorType = 'square',
  delaySec = 0,
  volume = 0.04
) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const start = ctx.currentTime + delaySec;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);

  gain.gain.setValueAtTime(volume, start);
  gain.gain.exponentialRampToValueAtTime(0.001, start + durationSec);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(start);
  osc.stop(start + durationSec);
}

export function playSfx(
  kind: 'click' | 'run' | 'error' | 'victory',
  enabled: boolean
) {
  if (!enabled) return;
  try {
    if (kind === 'click') {
      playTone(520, 0.05, 'square', 0, 0.03);
    } else if (kind === 'run') {
      playTone(440, 0.06, 'square', 0, 0.03);
      playTone(660, 0.08, 'square', 0.06, 0.03);
    } else if (kind === 'error') {
      playTone(220, 0.1, 'sawtooth', 0, 0.03);
      playTone(170, 0.14, 'sawtooth', 0.09, 0.03);
    } else if (kind === 'victory') {
      playTone(523.25, 0.09, 'square', 0, 0.035);
      playTone(659.25, 0.09, 'square', 0.09, 0.035);
      playTone(783.99, 0.09, 'square', 0.18, 0.035);
      playTone(1046.5, 0.22, 'square', 0.27, 0.04);
    }
  } catch {
    // Ignore audio context restrictions cleanly
  }
}

