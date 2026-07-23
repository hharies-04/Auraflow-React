import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const DEFAULT_THEMES = [
  { id: 'cyber', name: 'Cyber Neon', primary: '#6366f1', accent: '#ec4899' },
  { id: 'sunset', name: 'Aura Sunset', primary: '#f43f5e', accent: '#fb923c' },
  { id: 'emerald', name: 'Bioluminescence', primary: '#10b981', accent: '#84cc16' },
  { id: 'deepspace', name: 'Deep Space', primary: '#38bdf8', accent: '#c084fc' },
  { id: 'nordic', name: 'Nordic Slate', primary: '#38bdf8', accent: '#34d399' },
];

export const DEMO_USER = {
  id: 'usr_demo_101',
  name: 'Alex Rivers',
  username: 'arivers',
  email: 'alex.rivers@auraflow.io',
  role: 'Senior Product Architect',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  bio: 'Designing next-gen visual computing flows and reactive data architectures.',
  joinDate: 'July 2026',
  level: 'Pro Architect'
};

export function AuthProvider({ children }) {
  // Restore state from localStorage if available
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('auraflow_user');
    return saved ? jsonParse(saved, DEMO_USER) : DEMO_USER;
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('auraflow_theme') || 'cyber';
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Sync theme attribute to HTML document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('auraflow_theme', theme);
  }, [theme]);

  // Toast Helper
  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('auraflow_user', JSON.stringify(userData));
    addToast(`Welcome back, ${userData.name}!`, 'success');
  };

  const register = (userData) => {
    const newUser = {
      ...userData,
      id: `usr_${Date.now()}`,
      role: 'Creative Explorer',
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${userData.username}`,
      joinDate: 'Just Now',
      level: 'Creator'
    };
    setUser(newUser);
    localStorage.setItem('auraflow_user', JSON.stringify(newUser));
    addToast(`Account created successfully! Welcome, ${newUser.name}.`, 'success');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auraflow_user');
    addToast('You have been logged out.', 'info');
  };

  function jsonParse(str, fallback) {
    try {
      return JSON.parse(str);
    } catch {
      return fallback;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        theme,
        setTheme,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isProfileModalOpen,
        setIsProfileModalOpen,
        login,
        register,
        logout,
        addToast,
        toasts,
        themes: DEFAULT_THEMES,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
