import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import InteractiveBackground from './components/InteractiveBackground';
import Navbar from './components/Navbar';
import LoginModal from './components/LoginModal';
import UserProfileModal from './components/UserProfileModal';
import ThemePaletteSelector from './components/ThemePaletteSelector';
import AmbienceStudio from './components/AmbienceStudio';
import DataFlowVisualizer from './components/DataFlowVisualizer';
import Dashboard from './components/Dashboard';
import TaskFlow from './components/TaskFlow';
import { Sparkles, Info, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dataflow');
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isPalettePickerOpen, setIsPalettePickerOpen] = useState(false);
  const { toasts } = useAuth();

  const toggleAudio = () => {
    setIsAudioActive(!isAudioActive);
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', paddingBottom: '60px' }}>
      {/* Dynamic Canvas Background */}
      <InteractiveBackground />

      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAudioActive={isAudioActive}
        toggleAudio={toggleAudio}
        openPalettePicker={() => setIsPalettePickerOpen(true)}
      />

      {/* Main Container */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        {/* Ambience Audio Generator Bar */}
        <AmbienceStudio isAudioActive={isAudioActive} toggleAudio={toggleAudio} />

        {/* Tab Views */}
        {activeTab === 'dataflow' && <DataFlowVisualizer />}
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'tasks' && <TaskFlow />}
      </main>

      {/* Modals & Overlays */}
      <LoginModal />
      <UserProfileModal />
      <ThemePaletteSelector isOpen={isPalettePickerOpen} onClose={() => setIsPalettePickerOpen(false)} />

      {/* Toast Notifications Overlay */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 2000,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          pointerEvents: 'none',
        }}
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="glass-panel animate-fade-in"
            style={{
              pointerEvents: 'auto',
              padding: '12px 18px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.85rem',
              fontWeight: '500',
              background: 'var(--bg-secondary)',
              borderLeft: `4px solid ${
                toast.type === 'success' ? '#34d399' : toast.type === 'warning' ? '#fbbf24' : 'var(--accent-primary)'
              }`,
              boxShadow: 'var(--card-shadow)',
            }}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 size={18} color="#34d399" />
            ) : toast.type === 'warning' ? (
              <AlertTriangle size={18} color="#fbbf24" />
            ) : (
              <Info size={18} color="var(--accent-primary)" />
            )}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
