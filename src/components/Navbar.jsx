import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Zap, 
  Workflow, 
  BarChart3, 
  CheckSquare, 
  Palette, 
  Volume2, 
  VolumeX, 
  UserCheck, 
  LogIn, 
  Sparkles,
  Sliders
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, isAudioActive, toggleAudio, openPalettePicker }) {
  const { user, setIsAuthModalOpen, setIsProfileModalOpen } = useAuth();

  const navItems = [
    { id: 'dataflow', label: 'DataFlow Studio', icon: Workflow },
    { id: 'dashboard', label: 'Analytics Dashboard', icon: BarChart3 },
    { id: 'tasks', label: 'Task Matrix', icon: CheckSquare },
  ];

  return (
    <header className="glass-panel" style={{
      position: 'sticky',
      top: '16px',
      margin: '0 24px 24px 24px',
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 24px',
      borderRadius: '20px',
      backdropFilter: 'blur(20px)',
    }}>
      {/* Brand / Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setActiveTab('dataflow')}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'var(--accent-gradient)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--glow-shadow)',
        }}>
          <Zap size={22} color="#ffffff" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.02em' }}>
              Aura<span className="gradient-text">Flow</span>
            </span>
            <span className="badge badge-accent" style={{ fontSize: '0.65rem' }}>PRO v2.5</span>
          </div>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Interactive Flow Engine</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(10, 12, 22, 0.4)', padding: '6px', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '10px',
                border: 'none',
                background: isActive ? 'var(--accent-gradient)' : 'transparent',
                color: isActive ? '#ffffff' : 'var(--text-muted)',
                fontWeight: isActive ? '600' : '500',
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: isActive ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none',
              }}
            >
              <Icon size={16} color={isActive ? '#ffffff' : 'var(--text-muted)'} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Control Actions & User Auth */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Ambience Audio Toggle */}
        <button
          onClick={toggleAudio}
          className="btn-secondary"
          title={isAudioActive ? 'Mute Ambience Synth' : 'Enable Ambience Synth'}
          style={{ padding: '8px 12px' }}
        >
          {isAudioActive ? <Volume2 size={18} color="var(--accent-primary)" /> : <VolumeX size={18} color="var(--text-muted)" />}
        </button>

        {/* Theme Palette Switcher */}
        <button
          onClick={openPalettePicker}
          className="btn-secondary"
          title="Change Theme Palette"
          style={{ padding: '8px 12px' }}
        >
          <Palette size={18} color="var(--accent-secondary)" />
          <span style={{ fontSize: '0.82rem', fontWeight: 600 }} className="desktop-only">Themes</span>
        </button>

        {/* User Auth Profile Trigger */}
        {user ? (
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="btn-secondary"
            style={{
              padding: '6px 14px 6px 8px',
              borderRadius: '30px',
              border: '1px solid var(--border-glow)',
              background: 'rgba(99, 102, 241, 0.1)',
            }}
          >
            <img
              src={user.avatar}
              alt={user.name}
              style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{user.name.split(' ')[0]}</span>
            <UserCheck size={14} color="var(--accent-primary)" />
          </button>
        ) : (
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="btn-primary"
            style={{ padding: '8px 18px', fontSize: '0.88rem' }}
          >
            <LogIn size={16} />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
}
