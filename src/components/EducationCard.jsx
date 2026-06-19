import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { useLanguage } from '../i18n'

function EducationCard({ item }) {
  const { t } = useLanguage()

  const e = (key) => t(`education.${item.id}.${key}`)

  return (
    <motion.div
      className="experience-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35 }}
    >
      <div className="experience-header">
        <div className="experience-header-left">
          <div className="experience-icon">
            <img src="/images/logos/fatec-ipiranga.png" alt="FATEC Ipiranga" className="experience-logo" />
          </div>
          <div>
            <h2 className="experience-company">{item.institution}</h2>
            <p className="experience-role">{item.course}</p>
          </div>
        </div>
        <div className="experience-period">
          <FontAwesomeIcon icon={faCalendar} className="experience-period-icon" />
          <span>{item.period}</span>
        </div>
      </div>

      <p className="experience-description">{e('description')}</p>

      <ul className="experience-highlights">
        {Array.from({ length: item.highlightsCount }, (_, index) => (
          <li key={index}>{e(`highlights.${index}`)}</li>
        ))}
      </ul>

      {item.links && (
        <div className="experience-links">
          {item.links.map((link) => (
            <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="experience-link-btn">
              {link.label}
            </a>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default EducationCard
