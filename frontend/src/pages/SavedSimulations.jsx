import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import api from '../api/axios';

export default function SavedSimulations() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [simulations, setSimulations] = useState(null);

  function load() {
    api.get('/simulations').then((res) => setSimulations(res.data.simulations));
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id) {
    await api.delete(`/simulations/${id}`);
    load();
  }

  if (simulations === null) {
    return <div className="grid h-64 place-items-center text-slate-400 dark:text-slate-500">{t('common.loading')}</div>;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-extrabold text-slate-800 dark:text-slate-100">{t('saved.title')}</h1>

      {simulations.length === 0 ? (
        <div className="card flex flex-col items-center gap-3 p-10 text-center">
          <span className="text-4xl">🗂️</span>
          <p className="font-semibold text-slate-600 dark:text-slate-300">{t('saved.empty')}</p>
          <p className="text-sm text-slate-400 dark:text-slate-500">{t('saved.emptyHint')}</p>
          <Link to="/" className="btn-primary mt-2">
            {t('saved.startNew')}
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {simulations.map((sim) => (
            <div key={sim._id} className="card flex flex-wrap items-center justify-between gap-3 p-4">
              <div>
                <h3 className="font-bold text-slate-700 dark:text-slate-200">{sim.title}</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  {t('saved.createdAt')} {new Date(sim.createdAt).toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US')}
                </p>
                <span className="badge mt-1 bg-brand-50 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300">
                  {t(`categories.${sim.category}`)}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  className="btn-primary !px-3 !py-1.5 text-sm"
                  onClick={() =>
                    navigate('/simulate', {
                      state: {
                        category: sim.category,
                        algorithmKey: sim.algorithm,
                        inputData: sim.inputData,
                        settings: sim.settings,
                      },
                    })
                  }
                >
                  {t('saved.resume')}
                </button>
                <button className="btn-danger !px-3 !py-1.5 text-sm" onClick={() => handleDelete(sim._id)}>
                  {t('saved.delete')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
