import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, LogOut, Award, Zap, Activity, Clock, ShieldCheck, Edit3, Check } from 'lucide-react';

export default function UserProfileModal() {
  const { user, isProfileModalOpen, setIsProfileModalOpen, logout, addToast } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(user?.bio || '');

  if (!isProfileModalOpen || !user) return null;

  const handleSaveBio = () => {
    setIsEditing(false);
    user.bio = bio;
    localStorage.setItem('auraflow_user', JSON.stringify(user));
    addToast('Profile bio updated!', 'success');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 8, 17, 0.75)',
        backdropFilter: 'blur(12px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={() => setIsProfileModalOpen(false)}
    >
      <div
        className="glass-panel animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '520px',
          padding: '32px',
          position: 'relative',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-glow)',
          boxShadow: 'var(--card-shadow), var(--glow-shadow)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsProfileModalOpen(false)}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '6px',
          }}
        >
          <X size={20} />
        </button>

        {/* Profile Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
          <div style={{ position: 'relative' }}>
            <img
              src={user.avatar}
              alt={user.name}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '24px',
                objectFit: 'cover',
                border: '2px solid var(--accent-primary)',
                boxShadow: 'var(--glow-shadow)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-4px',
                right: '-4px',
                background: 'var(--accent-gradient)',
                borderRadius: '50%',
                padding: '4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
              }}
            >
              <ShieldCheck size={14} color="#fff" />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>{user.name}</h2>
              <span className="badge badge-active">{user.level || 'Architect'}</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: '600' }}>{user.role}</p>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>{user.email}</p>
          </div>
        </div>

        {/* User Bio */}
        <div
          style={{
            background: 'rgba(10, 12, 22, 0.5)',
            border: '1px solid var(--border-color)',
            borderRadius: '14px',
            padding: '16px',
            marginBottom: '24px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Bio & Focus
            </span>
            {isEditing ? (
              <button
                onClick={handleSaveBio}
                style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: '600' }}
              >
                <Check size={14} /> Save
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}
              >
                <Edit3 size={14} /> Edit
              </button>
            )}
          </div>
          {isEditing ? (
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="input-field"
              rows={3}
              style={{ fontSize: '0.85rem' }}
            />
          ) : (
            <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
              {user.bio || 'No bio provided yet. Click edit to add your creative focus.'}
            </p>
          )}
        </div>

        {/* User Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
          <div className="glass-panel" style={{ padding: '12px', textAlign: 'center', background: 'rgba(99, 102, 241, 0.08)' }}>
            <Zap size={20} color="var(--accent-primary)" style={{ margin: '0 auto 4px auto' }} />
            <h4 style={{ fontSize: '1.2rem', fontWeight: '800' }}>148</h4>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Flow Nodes</p>
          </div>
          <div className="glass-panel" style={{ padding: '12px', textAlign: 'center', background: 'rgba(236, 72, 153, 0.08)' }}>
            <Activity size={20} color="var(--accent-secondary)" style={{ margin: '0 auto 4px auto' }} />
            <h4 style={{ fontSize: '1.2rem', fontWeight: '800' }}>99.4%</h4>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Efficiency</p>
          </div>
          <div className="glass-panel" style={{ padding: '12px', textAlign: 'center', background: 'rgba(16, 185, 129, 0.08)' }}>
            <Clock size={20} color="#34d399" style={{ margin: '0 auto 4px auto' }} />
            <h4 style={{ fontSize: '1.2rem', fontWeight: '800' }}>14 Days</h4>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Streak</p>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => {
              logout();
              setIsProfileModalOpen(false);
            }}
            className="btn-secondary"
            style={{ width: '100%', justifyContent: 'center', color: '#f43f5e', borderColor: 'rgba(244, 63, 94, 0.3)' }}
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
