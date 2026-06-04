import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faDownload } from '@fortawesome/free-solid-svg-icons'
import { useLanguage } from '../i18n'
import { useMouseGlow } from '../hooks/useMouseGlow'
import CVModal from '../components/CVModal'
import Typewriter from '../components/Typewriter'
import Skills from '../components/Skills'

const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/`~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

const stagger = {
  animate: {
    transition: { staggerChildren: 0.08 },
  },
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

function Home() {
  const { t, language } = useLanguage()
  const [showCV, setShowCV] = useState(false)
  const cvRef = useMouseGlow()
  const downloadRef = useMouseGlow()
  const contactRef = useMouseGlow()
  const projectsRef = useMouseGlow()
  const experiencesRef = useMouseGlow()

  const targetName = t('home.name')
  const [displayName, setDisplayName] = useState(targetName)
  const decryptTimer = useRef(null)

  const runDecrypt = useCallback(() => {
    if (decryptTimer.current) clearInterval(decryptTimer.current)
    let iteration = 0
    const maxIterations = targetName.length + 6

    decryptTimer.current = setInterval(() => {
      setDisplayName(
        targetName
          .split('')
          .map((char, i) =>
            i < iteration ? targetName[i] : chars[Math.floor(Math.random() * chars.length)]
          )
          .join('')
      )
      iteration++
      if (iteration >= maxIterations) {
        clearInterval(decryptTimer.current)
        decryptTimer.current = null
        setDisplayName(targetName)
      }
    }, 45)
  }, [targetName])

  const resetName = useCallback(() => {
    if (decryptTimer.current) {
      clearInterval(decryptTimer.current)
      decryptTimer.current = null
    }
    setDisplayName(targetName)
  }, [targetName])

  useEffect(() => {
    runDecrypt()
  }, [runDecrypt])

  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>Pedro Trovo | Backend Developer</title>
        <meta name="description" content={t('home.bio')} />
        <meta property="og:title" content="Pedro Trovo | Backend Developer" />
        <meta property="og:description" content={t('home.bio')} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Pedro Trovo',
            jobTitle: 'Backend Developer',
            url: 'https://pedro-trovo.vercel.app',
            sameAs: [
              'https://github.com/pedro-Trovo',
              'https://www.linkedin.com/in/pedro-trovo-link/',
            ],
          })}
        </script>
      </Helmet>

      <section className="page home">
        <div className="home-hero">
          <motion.div
            className="home-photo-col"
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            <motion.div className="home-photo" variants={fadeUp}>
              <img src="/profile/161767490.png" alt="Pedro Trovo" className="home-photo-img" />
            </motion.div>
            <motion.div className="home-cv-buttons" variants={fadeUp}>
              <button ref={cvRef} onClick={() => setShowCV(true)} className="btn btn-primary btn-glow btn-glow-white">
                <FontAwesomeIcon icon={faEye} /> {t('home.cv_download')}
              </button>
              <a ref={downloadRef} href="/cv.pdf" download className="btn btn-secondary btn-glow" title="Download PDF">
                <FontAwesomeIcon icon={faDownload} />
              </a>
            </motion.div>
            <CVModal open={showCV} onClose={() => setShowCV(false)} />
          </motion.div>

          <motion.div
            className="home-info"
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            <motion.h1
              className="home-name"
              variants={fadeUp}
              onMouseEnter={runDecrypt}
              onMouseLeave={resetName}
            >
              {displayName}
            </motion.h1>
            <motion.p className="home-title text-muted" variants={fadeUp}>
              <Typewriter words={['Backend Developer', 'Fullstack Developer']} />
            </motion.p>
            <motion.p className="home-bio text-muted" variants={fadeUp}>{t('home.bio')}</motion.p>
            <motion.div className="home-ctas" variants={fadeUp}>
              <Link ref={contactRef} to="/contato" className="btn btn-primary btn-glow btn-glow-white">{t('home.contact_cta')} &rarr;</Link>
              <Link ref={projectsRef} to="/projetos" className="btn btn-secondary btn-glow">{t('home.projects_cta')} &rarr;</Link>
              <Link ref={experiencesRef} to="/experiencias" className="btn btn-secondary btn-glow">{t('home.experiences_cta')} &rarr;</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Skills />
    </>
  )
}

export default Home
