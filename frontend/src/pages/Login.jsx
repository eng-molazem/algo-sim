import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../i18n/LanguageContext';
import AuthLayout from '../components/common/AuthLayout';

export default function Login() {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || t('common.error'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <div className="card border-slate-200/60 p-8 shadow-elevated backdrop-blur">
        <div className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-brand-gradient text-xl text-white shadow-glow lg:hidden">
          ⚙
        </div>
        <h1 className="mb-1 text-center text-2xl font-extrabold text-slate-800 dark:text-slate-100">
          {t('auth.loginTitle')}
        </h1>
        <p className="mb-6 text-center text-sm text-slate-400 dark:text-slate-500">{t('appName')}</p>

        {error && (
          <div className="mb-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-600 dark:bg-rose-900/30 dark:text-rose-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">{t('auth.email')}</label>
            <input
              type="email"
              required
              className="input"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="label">{t('auth.password')}</label>
            <input
              type="password"
              required
              className="input"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {t('auth.loginBtn')}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          {t('auth.noAccount')}{' '}
          <Link to="/register" className="font-semibold text-brand-600 dark:text-brand-400">
            {t('auth.createOne')}
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
