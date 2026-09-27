import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .get('/auth/me')
      .then((res) => setUser(res.data.user))
      .catch(() => {
        localStorage.removeItem('token');
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
    return res.data.user;
  }, []);

  const register = useCallback(async (payload) => {
    const res = await api.post('/auth/register', payload);
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
    return res.data.user;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (payload) => {
    const res = await api.put('/auth/me', payload);
    setUser(res.data.user);
    return res.data.user;
  }, []);

  const markAlgorithmComplete = useCallback(async (algorithmKey) => {
    try {
      const res = await api.post('/auth/progress', { algorithmKey });
      setUser((prev) => (prev ? { ...prev, completedAlgorithms: res.data.completedAlgorithms } : prev));
    } catch {
      // Progress tracking is best-effort; a failed request should not interrupt the simulation.
    }
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, register, logout, updateProfile, markAlgorithmComplete, isAuthenticated: !!user }),
    [user, loading, login, register, logout, updateProfile, markAlgorithmComplete]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
