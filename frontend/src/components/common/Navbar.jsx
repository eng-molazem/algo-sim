import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { t, lang, toggleLang } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  function handleLogout() {
    logout();
    navigate('/login');
  }

  const navLinks = [
    { to: '/', label: t('nav.dashboard') },
    { to: '/saved', label: t('nav.saved') },
    { to: '/compare', label: t('nav.compare') },
    { to: '/classroom', label: t('nav.classroom') },
    ...(user?.role === 'instructor' ? [{ to: '/stats', label: t('nav.stats') }] : []),
    { to: '/profile', label: t('nav.profile') },
  ];

  const linkClass =
    'rounded-lg px-3 py-2 font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800';

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur transition-colors dark:border-slate-700 dark:bg-slate-900/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3">
        <div className="flex min-w-0 items-center gap-1">
          {user && (
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="menu"
              className="btn-outline !p-2 md:hidden"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          )}
          <Link to="/" className="flex min-w-0 items-center gap-2 font-extrabold text-slate-800 dark:text-slate-100">
            <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow">
              ⚙
            </span>
            <span className="hidden truncate gradient-text sm:inline">{t('appName')}</span>
          </Link>
        </div>

        {user && (
          <nav className="hidden items-center gap-1 text-sm md:flex">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} className={linkClass}>
                {l.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="flex flex-shrink-0 items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="toggle theme"
            className="btn-outline !px-2.5 !py-1.5 text-sm sm:!px-3"
            title={isDark ? 'الوضع النهاري' : 'الوضع الليلي'}
          >
            {isDark ? '☀️' : '🌙'}
          </button>
          <button onClick={toggleLang} className="btn-outline !px-2.5 !py-1.5 text-sm sm:!px-3">
            {lang === 'ar' ? 'EN' : 'عربي'}
          </button>
          {user && (
            <button onClick={handleLogout} className="btn-secondary !px-2.5 !py-1.5 text-sm sm:!px-3">
              <span className="sm:hidden">🚪</span>
              <span className="hidden sm:inline">{t('nav.logout')}</span>
            </button>
          )}
        </div>
      </div>

      {user && menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-slate-200 bg-white px-4 py-3 md:hidden dark:border-slate-700 dark:bg-slate-900">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
