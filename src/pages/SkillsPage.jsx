import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { skillsCategories } from '../data/skills'
import { useLanguage } from '../i18n'
import CertCard from '../components/CertCard'

const outlineIcons = {
  folder: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1em', height: '1em' }}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
  lock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1em', height: '1em' }}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
}

const SEGMENTS = ['tech', 'langs', 'certs']

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.08 },
  }),
}

function SkillsPage() {
  const { t, language } = useLanguage()
  const [activeSegment, setActiveSegment] = useState('tech')

  const filtered = skillsCategories.filter(c => c.segment === activeSegment)

  return (
    <section className="page skills-page">
      <Helmet>
        <html lang={language} />
        <title>{t('skills.title')} | Pedro Trovo</title>
        <meta name="description" content="Skills" />
      </Helmet>

      <motion.h1
        className="heading-gradient"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        {t('skills.title')}
      </motion.h1>

      <div className="skills-tabs">
        {SEGMENTS.map((seg) => (
          <button
            key={seg}
            className={`skills-tab${activeSegment === seg ? ' skills-tab--active' : ''}`}
            onClick={() => setActiveSegment(seg)}
          >
            {t(`skills.segment_${seg}`)}
          </button>
        ))}
      </div>

      <motion.div
        className="skills-page-grid"
        key={activeSegment}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {filtered.map((cat, i) => {
          if (cat.segment === 'certs') {
            return cat.items.map((item, j) => (
              <motion.div
                key={item.name}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={j}
              >
                <CertCard cert={item} />
              </motion.div>
            ))
          }
          return (
            <motion.div
              key={cat.title}
              className="skills-page-card"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={i}
            >
              <h2 className="skills-page-card-title">
                {cat.title}
              </h2>
              <div className="skills-page-items">
                {cat.items.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="skills-page-tech"
                    title={item.name}
                  >
                    {item.darkPlain ? (
                      <span className="skill-icon-box">
                        <img src={item.svg} alt={item.name} className="skill-icon-svg light-only" />
                        <i className={`devicon ${item.darkDevicon} dark-only`} />
                        <span className="skill-icon-label">{item.name}</span>
                      </span>
                    ) : item.svg ? (
                      <span className="skill-icon-box">
                        <img src={item.svg} alt={item.name} className="skill-icon-svg" />
                        <span className="skill-icon-label">{item.name}</span>
                      </span>
                    ) : item.devicon ? (
                      <span className="skill-icon-box">
                        <i className={`devicon ${item.devicon} colored`} />
                        <span className="skill-icon-label">{item.name}</span>
                      </span>
                    ) : item.faIcon ? (
                      <span className="skill-icon-box">
                        <span className="skill-fa-icon skill-fa-icon--box">{outlineIcons[item.faIcon]}</span>
                        <span className="skill-icon-label">{item.name}</span>
                      </span>
                    ) : (
                      <span className="skills-page-tech-name">{item.name}</span>
                    )}
                  </a>
                ))}
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}

export default SkillsPage
