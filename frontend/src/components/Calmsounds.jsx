import { useRef, useState, useEffect } from "react";

const SOUNDS = [
  { key: "rain", emoji: "🌧️", label: "Rain", filter: "highpass", freq: 800, gain: 0.12 },
  { key: "ocean", emoji: "🌊", label: "Ocean", filter: "lowpass", freq: 400, gain: 0.15 },
  { key: "fireplace", emoji: "🔥", label: "Fireplace", filter: "lowpass", freq: 1000, gain: 0.1 },
  { key: "forest", emoji: "🌙", label: "Night Forest", filter: "bandpass", freq: 1200, gain: 0.1 },
];

export default function CalmSounds() {
  const [playingKey, setPlayingKey] = useState(null);
  const audioCtxRef = useRef(null);
  const nodesRef = useRef(null);

  const stopCurrent = () => {
    if (nodesRef.current) {
      nodesRef.current.noise.stop();
      nodesRef.current = null;
    }
  };

  useEffect(() => {
    // Clean up audio when navigating away from this component.
    return () => {
      stopCurrent();
      audioCtxRef.current?.close();
    };
  }, []);

  const playSound = (sound) => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;

    stopCurrent();

    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = sound.filter;
    filter.frequency.value = sound.freq;

    const gain = ctx.createGain();
    gain.gain.value = sound.gain;

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();

    nodesRef.current = { noise, filter, gain };
    setPlayingKey(sound.key);
  };

  const toggleSound = (sound) => {
    if (playingKey === sound.key) {
      stopCurrent();
      setPlayingKey(null);
    } else {
      playSound(sound);
    }
  };

  return (
    <div className="relax-panel">
      <p className="relax-sounds-note">
        Ambient tones generated in-browser — tap a card to play or stop.
      </p>
      <div className="relax-sounds-grid">
        {SOUNDS.map((sound) => (
          <button
            key={sound.key}
            className={`relax-sound-card ${playingKey === sound.key ? "playing" : ""}`}
            onClick={() => toggleSound(sound)}
          >
            <span className="relax-sound-emoji">{sound.emoji}</span>
            <span>{sound.label}</span>
            {playingKey === sound.key && <span className="relax-sound-bars" />}
          </button>
        ))}
      </div>
    </div>
  );
}