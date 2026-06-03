import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

function SkillCard({ category, items }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div className="skill-card">
      <h3 className="skill-card-title">{category}</h3>
      <motion.div
        ref={ref}
        className="skill-card-items"
        variants={stagger}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {items.map((name) => (
          <motion.span key={name} className="skill-tag" variants={fadeUp}>
            {name}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}

export default SkillCard
