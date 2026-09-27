import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../i18n/LanguageContext';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { t, setLang } = useLanguage();
  const [name, setName] = useState(user?.name || '');
  const [preferredLanguage, setPreferredLanguage] = useState(user?.preferredLanguage || 'ar');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function handleProfileSubmit(e) {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      await updateProfile({ name, preferredLanguage });
      setLang(preferredLanguage);
      setMessage(t('profile.updated'));
    } catch (err) {
      setError(err.response?.data?.message || t('common.error'));
    }
  }

  async function handlePasswordSubmit(e) {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      await updateProfile({ currentPassword, newPassword });
      setCurrentPassword('');
      setNewPassword('');
      setMessage(t('profile.updated'));
    } catch (err) {
      setError(err.response?.data?.message || t('common.error'));
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-8 space-y-6">
      <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">{t('profile.title')}</h1>

      {message && (
        <div className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300">
          {message}
        </div>
      )}
      {error && (
        <div className="rounded-lg bg-rose-50 p-3 text-sm text-rose-600 dark:bg-rose-900/30 dark:text-rose-300">{error}</div>
      )}

      <form onSubmit={handleProfileSubmit} className="card space-y-4 p-6">
        <div>
          <label className="label">{t('auth.name')}</label>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className="label">{t('profile.language')}</label>
          <select className="input" value={preferredLanguage} onChange={(e) => setPreferredLanguage(e.target.value)}>
            <option value="ar">العربية</option>
            <option value="en">English</option>
          </select>
        </div>
        <button type="submit" className="btn-primary w-full">
          {t('profile.saveChanges')}
        </button>
      </form>

      <form onSubmit={handlePasswordSubmit} className="card space-y-4 p-6">
        <h2 className="font-bold text-slate-700 dark:text-slate-200">{t('profile.changePassword')}</h2>
        <div>
          <label className="label">{t('profile.currentPassword')}</label>
          <input
            type="password"
            className="input"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div>
          <label className="label">{t('profile.newPassword')}</label>
          <input type="password" className="input" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn-secondary w-full" disabled={!currentPassword || !newPassword}>
          {t('profile.changePassword')}
        </button>
      </form>
    </div>
  );
}
