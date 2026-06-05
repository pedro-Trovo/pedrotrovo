import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import ExperienciaProfissional from './ExperienciaProfissional'
import ExperienciaAcademica from './ExperienciaAcademica'
import { useLanguage } from '../i18n'

function Experiences() {
  const { t, language } = useLanguage()
  const location = useLocation()
  const navigate = useNavigate()

  const activeTab = location.pathname === '/experiencias/academica' ? 'academica' : 'profissional'

  useEffect(() => {
    if (location.pathname === '/experiencias') {
      navigate('/experiencias/profissional', { replace: true })
    }
  }, [location.pathname, navigate])

  return (
    <section className="page experiences">
      <Helmet>
        <html lang={language} />
        <title>{t('experiences.title')} | Pedro Trovo</title>
        <meta name="description" content={`Portfolio — ${t('experiences.title')}`} />
      </Helmet>

      <motion.h1
        className="heading-gradient"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        {t('experiences.title')}
      </motion.h1>

      <div className="experiences-tabs">
        <button
          className={`experiences-tab${activeTab === 'profissional' ? ' experiences-tab--active' : ''}`}
          onClick={() => navigate('/experiencias/profissional')}
        >
          {t('experiences.tab_professional')}
        </button>
        <button
          className={`experiences-tab${activeTab === 'academica' ? ' experiences-tab--active' : ''}`}
          onClick={() => navigate('/experiencias/academica')}
        >
          {t('experiences.tab_academic')}
        </button>
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {activeTab === 'profissional' ? <ExperienciaProfissional /> : <ExperienciaAcademica />}
      </motion.div>
    </section>
  )
}

export default Experiences
