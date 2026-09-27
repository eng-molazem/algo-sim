import { lazy, Suspense } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

const NetworkBackground = lazy(() => import('../three/NetworkBackground'));

export default function AuthLayout({ children }) {
  const { t } = useLanguage();

  return (
    <div className="grid min-h-[calc(100vh-64px)] grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden items-center justify-center overflow-hidden bg-slate-950 lg:flex">
        <div className="absolute inset-0 bg-mesh-dark" />
        <Suspense fallback={null}>
          <NetworkBackground className="absolute inset-0" />
        </Suspense>
        <div className="relative z-10 max-w-md px-10 text-center text-white">
          <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-brand-gradient text-3xl shadow-glow">
            ⚙
          </div>
          <h2 className="mb-3 text-2xl font-extrabold">{t('appName')}</h2>
          <p className="text-sm leading-7 text-slate-300">
            {t('dashboard.subtitle')}
          </p>
        </div>
      </div>

      <div className="relative flex items-center justify-center bg-slate-50 px-4 py-12 dark:bg-slate-900">
        <div className="pointer-events-none absolute inset-0 bg-brand-gradient-soft opacity-40 dark:opacity-0" />
        <div className="relative z-10 w-full max-w-md animate-fade-up">{children}</div>
      </div>
    </div>
  );
}
