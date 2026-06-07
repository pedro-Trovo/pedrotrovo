import { useState, useCallback, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faExternalLinkAlt,
  faBookOpen,
  faTimes,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { projects } from '../data/projects'
import { useLanguage } from '../i18n'
import { useMouseGlow } from '../hooks/useMouseGlow'

const techCategoryMap = {
  Frontend: 'tech.frontend',
  Backend: 'tech.backend',
  'API REST': 'tech.api_rest',
  DevOps: 'tech.devops',
  Desktop: 'tech.desktop',
  Banco: 'tech.database',
  Database: 'tech.database',
}

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.35 },
}

function ProjectDetail() {
  const { slug } = useParams()
  const { t, language } = useLanguage()
  const project = projects.find((p) => p.slug === slug)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const githubRef = useMouseGlow()
  const siteRef = useMouseGlow()
  const doiRef = useMouseGlow()
  const lightboxCloseRef = useMouseGlow()
  const lightboxPrevRef = useMouseGlow()
  const lightboxNextRef = useMouseGlow()

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : project.images.length - 1))
  }, [project])

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev < project.images.length - 1 ? prev + 1 : 0))
  }, [project])

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : project.images.length - 1))
  }

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev < project.images.length - 1 ? prev + 1 : 0))
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide()
      else prevSlide()
    }
  }

  useEffect(() => {
    if (lightboxIndex === null) return
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'ArrowRight') nextImage()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [lightboxIndex, closeLightbox, prevImage, nextImage])

  if (!project) {
    return (
      <section className="page">
        <h1>{t('project_detail.not_found')}</h1>
        <p className="text-muted">
          <Link to="/projetos">{t('project_detail.back_to_projects')}</Link>
        </p>
      </section>
    )
  }

  const p = (key) => t(`project.${project.slug}.${key}`)

  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>{project.title} | Pedro Trovo</title>
        <meta name="description" content={p('description')} />
        <meta property="og:title" content={`${project.title} | Pedro Trovo`} />
        <meta property="og:description" content={p('description')} />
        <meta property="og:image" content={project.image} />
      </Helmet>

      <section className="page project-detail">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">{t('nav.home')}</Link>
          <span className="breadcrumbs-sep">/</span>
          <Link to="/projetos">{t('nav.projects')}</Link>
          <span className="breadcrumbs-sep">/</span>
          <span className="breadcrumbs-current" aria-current="page">{project.title}</span>
        </nav>

        <Link to="/projetos" className="back-link">
          <FontAwesomeIcon icon={faArrowLeft} /> {t('project_detail.back')}
        </Link>

        <div className="project-detail-header">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <p className="project-detail-subtitle text-muted">{project.subtitle}</p>
            <h1 className="project-detail-title heading-gradient">{project.title}</h1>
            {project.context && (
              <p className="project-detail-context text-muted">{p('context')}</p>
            )}
          </motion.div>
          <motion.div
            className="project-detail-links"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
          >
            <a ref={githubRef} href={project.links.github} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-glow">
              <FontAwesomeIcon icon={faGithub} /> GitHub
            </a>
            {project.links.site && (
              <a ref={siteRef} href={project.links.site} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-glow">
                <FontAwesomeIcon icon={faExternalLinkAlt} /> Site
              </a>
            )}
            {project.links.doi && (
              <a ref={doiRef} href={project.links.doi} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-glow">
                <FontAwesomeIcon icon={faBookOpen} /> DOI
              </a>
            )}
          </motion.div>
        </div>

        <motion.section className="project-detail-section" {...fadeUp}>
          <h2 className="project-detail-section-title">{t('project_detail.about')}</h2>
          <p className="project-detail-text">{p('about')}</p>
        </motion.section>

        <motion.section className="project-detail-section" {...fadeUp}>
          <h2 className="project-detail-section-title">{t('project_detail.features')}</h2>
          <ul className="project-detail-features">
            {project.features.map((_, i) => (
              <li key={i}>{p(`features.${i}`)}</li>
            ))}
          </ul>
        </motion.section>

        <motion.section className="project-detail-section" {...fadeUp}>
          <h2 className="project-detail-section-title">{t('project_detail.architecture')}</h2>
          <p className="project-detail-text">{p('architecture')}</p>
        </motion.section>

        <motion.section className="project-detail-section" {...fadeUp}>
          <h2 className="project-detail-section-title">{t('project_detail.tech')}</h2>
          <div className="project-detail-stack">
            {project.techStack.map((group) => (
              <div key={group.category} className="project-detail-stack-group">
                <span className="project-detail-stack-label">
                  {t(techCategoryMap[group.category] || group.category)}
                </span>
                <div className="project-detail-tags">
                  {group.items.map((item) => (
                    <span key={item} className="project-tag">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {project.limitations.length > 0 && (
          <motion.section className="project-detail-section" {...fadeUp}>
            <h2 className="project-detail-section-title">{t('project_detail.limitations')}</h2>
            <ul className="project-detail-features project-detail-limitations">
              {project.limitations.map((_, i) => (
                <li key={i}>{p(`limitations.${i}`)}</li>
              ))}
            </ul>
          </motion.section>
        )}

        <motion.section className="project-detail-section" {...fadeUp}>
          <h2 className="project-detail-section-title">{t('project_detail.gallery')}</h2>
          <div className="carousel">
            <div
              className="carousel-viewport"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                  key={currentIndex}
                  className="carousel-image"
                  src={project.images[currentIndex]}
                  alt={`${project.title} ${currentIndex + 1}`}
                  onClick={() => setLightboxIndex(currentIndex)}
                  custom={direction}
                  variants={{
                    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
                    center: { x: 0, opacity: 1 },
                    exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
              </AnimatePresence>
              {project.images.length > 1 && (
                <>
                  <button className="carousel-btn carousel-prev" onClick={prevSlide} aria-label="Previous image">
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                  <button className="carousel-btn carousel-next" onClick={nextSlide} aria-label="Next image">
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </>
              )}
            </div>
            {project.images.length > 1 && (
              <div className="carousel-dots">
                {project.images.map((_, i) => (
                  <button
                    key={i}
                    className={`carousel-dot${i === currentIndex ? ' carousel-dot--active' : ''}`}
                    onClick={() => goToSlide(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.section>

        {lightboxIndex !== null && (
          <div className="lightbox" onClick={closeLightbox}>
            <button ref={lightboxCloseRef} className="lightbox-close btn-glow" onClick={closeLightbox}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <button ref={lightboxPrevRef} className="lightbox-nav lightbox-prev btn-glow" onClick={(e) => { e.stopPropagation(); prevImage() }}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <img
              className="lightbox-image"
              src={project.images[lightboxIndex]}
              alt={`${project.title} ${lightboxIndex + 1}`}
              onClick={(e) => e.stopPropagation()}
            />
            <button ref={lightboxNextRef} className="lightbox-nav lightbox-next btn-glow" onClick={(e) => { e.stopPropagation(); nextImage() }}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        )}
      </section>
    </>
  )
}

export default ProjectDetail
