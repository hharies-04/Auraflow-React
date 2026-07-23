import React from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Check, Palette, Sparkles } from 'lucide-react';

export default function ThemePaletteSelector({ isOpen, onClose }) {
  const { theme, setTheme, themes, addToast } = useAuth();

  if (!isOpen) return null;

  const handleSelectTheme = (themeId, themeName) => {
    setTheme(themeId);
    addToast(`Switched theme to ${themeName}`, 'info');
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 8, 17, 0.7)',
        backdropFilter: 'blur(10px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '480px',
          padding: '28px',
          position: 'relative',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-glow)',
          boxShadow: 'var(--card-shadow), var(--glow-shadow)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'var(--accent-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Palette size={20} color="#fff" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>Color Palette Studio</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Choose an aesthetic theme for your flow UI</p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Theme List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {themes.map((t) => {
            const isSelected = theme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleSelectTheme(t.id, t.name)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  borderRadius: '14px',
                  border: isSelected ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                  background: isSelected ? 'rgba(99, 102, 241, 0.12)' : 'var(--bg-tertiary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  {/* Swatch gradient preview */}
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, ${t.primary} 0%, ${t.accent} 100%)`,
                      boxShadow: isSelected ? '0 0 12px ' + t.primary : 'none',
                    }}
                  />
                  <div>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: '700', color: 'var(--text-main)' }}>{t.name}</h4>
                    <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                      <span
                        style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          backgroundColor: t.primary,
                          display: 'inline-block',
                        }}
                      />
                      <span
                        style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          backgroundColor: t.accent,
                          display: 'inline-block',
                        }}
                      />
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: 'var(--accent-gradient)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Check size={16} color="#fff" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
