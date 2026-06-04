import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { skillsCategories } from '../data/skills'
import { useLanguage } from '../i18n'

const SKILL_ICONS_URL = 'https://skillicons.dev/icons?i='

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

      <div className="skills-page-grid">
        {skillsCategories.map((cat, i) => (
          <motion.div
            key={cat.title}
            className="skills-page-card"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={i}
          >
            <h2 className="skills-page-card-title">
              {cat.emoji} {cat.title}
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
                  {item.icon ? (
                    <img
                      src={`${SKILL_ICONS_URL}${item.icon}`}
                      alt={item.name}
                      width="48"
                      height="48"
                      loading="lazy"
                    />
                  ) : (
                    <span className="skills-page-tech-name">{item.name}</span>
                  )}
                </a>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default SkillsPage
