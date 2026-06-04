import { motion } from 'framer-motion'
import { useLanguage } from '../i18n'
import { useMouseGlow } from '../hooks/useMouseGlow'

const facts = [
  { emoji: '🎓', key: 'about.fact_education' },
  { emoji: '💼', key: 'about.fact_job' },
  { emoji: '📍', key: 'about.fact_location' },
  { emoji: '🏅', key: 'about.fact_cert' },
  { emoji: '🌎', key: 'about.fact_langs' },
]

const stagger = {
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

function AboutMe() {
  const { t } = useLanguage()
  const githubRef = useMouseGlow()
  const linkedinRef = useMouseGlow()
  const emailRef = useMouseGlow()

  return (
    <section className="about-section">
      <motion.h2
        className="heading-gradient about-heading"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35 }}
      >
        {t('about.title')}
      </motion.h2>

      <div className="about-grid">
        <motion.div
          className="about-facts"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {facts.map((fact) => (
            <motion.div key={fact.key} className="about-fact" variants={fadeUp}>
              <span className="about-fact-emoji">{fact.emoji}</span>
              <span className="about-fact-text">{t(fact.key)}</span>
            </motion.div>
          ))}

          <motion.div className="about-links" variants={fadeUp}>
            <a
              ref={githubRef}
              href="https://github.com/pedro-Trovo"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm btn-glow"
            >
              GitHub
            </a>
            <a
              ref={linkedinRef}
              href="https://www.linkedin.com/in/pedro-trovo-link/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm btn-glow"
            >
              LinkedIn
            </a>
            <a
              ref={emailRef}
              href="mailto:pedroramostrovo@gmail.com"
              className="btn btn-secondary btn-sm btn-glow"
            >
              Email
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="about-text"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.15 }}
        >
          <p>{t('about.text')}</p>
          <p className="about-text-secondary">{t('about.text_secondary')}</p>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutMe
