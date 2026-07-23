import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Sliders } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AmbienceStudio({ isAudioActive, toggleAudio }) {
  const audioCtxRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);
  const [volume, setVolume] = useState(0.25);
  const [preset, setPreset] = useState('synth-focus'); // 'synth-focus', 'deep-space', 'zen-flow'
  const { addToast } = useAuth();

  // Initialize Web Audio Engine when toggled on
  useEffect(() => {
    if (isAudioActive) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioCtx();

        const masterGain = audioCtxRef.current.createGain();
        masterGain.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
        masterGain.connect(audioCtxRef.current.destination);
        gainNodeRef.current = masterGain;

        // Create warm ambient synth chord
        const freqs = preset === 'synth-focus' ? [110, 164.81, 220] : preset === 'deep-space' ? [65.41, 98, 130.81] : [146.83, 220, 293.66];
        
        freqs.forEach((freq) => {
          const osc = audioCtxRef.current.createOscillator();
          const oscGain = audioCtxRef.current.createGain();
          
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);
          
          oscGain.gain.setValueAtTime(0.08, audioCtxRef.current.currentTime);
          osc.connect(oscGain);
          oscGain.connect(masterGain);
          
          osc.start();
        });

        addToast(`Ambience audio active [Preset: ${preset}]`, 'info');
      } catch (e) {
        console.error('Web Audio API error:', e);
      }
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
    }

    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, [isAudioActive, preset]);

  // Sync volume change
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  return (
    <div
      className="glass-panel"
      style={{
        padding: '16px 20px',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '24px',
        background: 'rgba(18, 21, 38, 0.45)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: isAudioActive ? 'var(--accent-gradient)' : 'var(--bg-tertiary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: isAudioActive ? 'var(--glow-shadow)' : 'none',
          }}
        >
          <Music size={20} color={isAudioActive ? '#fff' : 'var(--text-muted)'} />
        </div>
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: '700' }}>Ambient Sound Engine</h4>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {isAudioActive ? 'Web Audio generative synth playing' : 'Sound generator currently paused'}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Preset selector */}
        <select
          value={preset}
          onChange={(e) => setPreset(e.target.value)}
          disabled={!isAudioActive}
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-main)',
            padding: '6px 12px',
            borderRadius: '10px',
            fontSize: '0.8rem',
            outline: 'none',
            opacity: isAudioActive ? 1 : 0.5,
          }}
        >
          <option value="synth-focus">Focus Waves (A Minor)</option>
          <option value="deep-space">Deep Drone (C Bass)</option>
          <option value="zen-flow">Zen Harmonic (D Major)</option>
        </select>

        {/* Volume slider */}
        {isAudioActive && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Volume2 size={16} color="var(--text-muted)" />
            <input
              type="range"
              min="0"
              max="0.5"
              step="0.02"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              style={{ width: '80px', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
            />
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={toggleAudio}
          className={isAudioActive ? 'btn-primary' : 'btn-secondary'}
          style={{ padding: '8px 16px', fontSize: '0.82rem' }}
        >
          {isAudioActive ? <Pause size={15} /> : <Play size={15} />}
          <span>{isAudioActive ? 'Pause Sound' : 'Play Sound'}</span>
        </button>
      </div>
    </div>
  );
}
