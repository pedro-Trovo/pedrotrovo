import { motion } from 'framer-motion'
import { skills } from '../data/skills'
import SkillCard from './SkillCard'

function Skills() {
  return (
    <section className="skills-section">
      <motion.h2
        className="heading-gradient skills-heading"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35 }}
      >
        Skills
      </motion.h2>
      <div className="skills-grid">
        {skills.map((group) => (
          <SkillCard
            key={group.category}
            category={group.category}
            items={group.items}
          />
        ))}
      </div>
    </section>
  )
}

export default Skills
