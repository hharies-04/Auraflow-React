import React, { useState } from 'react';
import { useAuth, DEMO_USER } from '../context/AuthContext';
import { X, LogIn, UserPlus, Eye, EyeOff, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

export default function LoginModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, login, register, addToast } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  if (!isAuthModalOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (!formData.name || !formData.email || !formData.password) {
        addToast('Please fill out all required fields.', 'warning');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        addToast('Passwords do not match.', 'error');
        return;
      }
      register({
        name: formData.name,
        username: formData.username || formData.name.toLowerCase().replace(/\s+/g, ''),
        email: formData.email,
      });
    } else {
      if (!formData.email || !formData.password) {
        addToast('Please enter your email and password.', 'warning');
        return;
      }
      // Simulate successful login
      login({
        id: `usr_${Date.now()}`,
        name: formData.email.split('@')[0].toUpperCase(),
        username: formData.email.split('@')[0],
        email: formData.email,
        role: 'Verified User',
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${formData.email}`,
        joinDate: 'July 2026',
        level: 'Pro Explorer'
      });
    }
    setIsAuthModalOpen(false);
  };

  const handleDemoLogin = () => {
    login(DEMO_USER);
    setIsAuthModalOpen(false);
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
      onClick={() => setIsAuthModalOpen(false)}
    >
      <div
        className="glass-panel animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '460px',
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
          onClick={() => setIsAuthModalOpen(false)}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '50%',
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto',
              boxShadow: 'var(--glow-shadow)',
            }}
          >
            {isSignUp ? <UserPlus size={28} color="#fff" /> : <LogIn size={28} color="#fff" />}
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>
            {isSignUp ? 'Create your Account' : 'Welcome Back to AuraFlow'}
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            {isSignUp
              ? 'Join thousands of creators building interactive flow systems.'
              : 'Sign in to access your interactive workspaces & flow nodes.'}
          </p>
        </div>

        {/* Quick Demo Login Option */}
        {!isSignUp && (
          <div
            style={{
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px dashed var(--border-glow)',
              borderRadius: '12px',
              padding: '12px 16px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <p style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--accent-primary)' }}>
                ⚡ Quick Demo Access
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Login instantly with pre-configured architect profile</p>
            </div>
            <button
              onClick={handleDemoLogin}
              className="btn-primary"
              style={{ padding: '6px 12px', fontSize: '0.78rem' }}
            >
              Demo <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {isSignUp && (
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Sarah Connor"
                className="input-field"
                required
              />
            </div>
          )}

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="alex@auraflow.io"
              className="input-field"
              required
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••••••"
                className="input-field"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {isSignUp && (
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••••••"
                className="input-field"
                required
              />
            </div>
          )}

          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
            {isSignUp ? 'Create Free Account' : 'Sign In to Workspace'}
          </button>
        </form>

        {/* Toggle Mode */}
        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {isSignUp ? 'Already have an account?' : "Don't have an account yet?"}{' '}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent-primary)',
              fontWeight: '700',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            {isSignUp ? 'Sign In' : 'Register Now'}
          </button>
        </div>
      </div>
    </div>
  );
}
