import { useState, useCallback, useEffect, useRef, useMemo } from 'react'
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

function ProjectDetail() {
  const { slug } = useParams()
  const { t, language } = useLanguage()
  const project = projects.find((p) => p.slug === slug)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [activeSlide, setActiveSlide] = useState(0)
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
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : (project?.images?.length || 1) - 1))
  }, [project])

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev < (project?.images?.length || 1) - 1 ? prev + 1 : 0))
  }, [project])

  const goToSlideImg = useCallback((index) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }, [currentIndex])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : (project?.images?.length || 1) - 1))
  }, [project])

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev < (project?.images?.length || 1) - 1 ? prev + 1 : 0))
  }, [project])

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX
  }, [])

  const handleTouchEnd = useCallback((e) => {
    touchEndX.current = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide()
      else prevSlide()
    }
  }, [nextSlide, prevSlide])

  const slides = useMemo(() => {
    if (!project) return []
    return [
      { id: 'sobre', label: t('project_detail.about') },
      { id: 'funcionalidades', label: t('project_detail.features') },
      { id: 'arquitetura', label: t('project_detail.architecture') },
      { id: 'tecnologias', label: t('project_detail.tech') },
      ...(project.limitations.length > 0 ? [{ id: 'limitacoes', label: t('project_detail.limitations') }] : []),
      { id: 'galeria', label: t('project_detail.gallery') },
    ]
  }, [project, t])

  const scrollToSlide = useCallback((id) => {
    document.getElementById(`slide-${id}`)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

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

  useEffect(() => {
    const observers = []
    slides.forEach((slide, index) => {
      const el = document.getElementById(`slide-${slide.id}`)
      if (!el) return
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSlide(index)
          })
        },
        { threshold: 0.3 },
      )
      observer.observe(el)
      observers.push(observer)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [slides])

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

      <section className="page project-slides">
        <nav className="project-slide-nav" aria-label="Slide navigation">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => scrollToSlide(s.id)}
              className={`project-slide-dot${i === activeSlide ? ' project-slide-dot--active' : ''}`}
              title={s.label}
              aria-label={s.label}
            />
          ))}
        </nav>

        <section className="project-slide" id="slide-sobre">
          <div className="project-slide-inner">
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

            <div className="project-slide-header">
              <p className="project-detail-subtitle text-muted">{project.subtitle}</p>
              <h1 className="project-detail-title heading-gradient">{project.title}</h1>
              {project.context && (
                <p className="project-detail-context text-muted">{p('context')}</p>
              )}
              <div className="project-detail-links">
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
              </div>
            </div>

            <h2 className="project-slide-heading">{t('project_detail.about')}</h2>
            <div className="project-slide-card">
              <p className="project-slide-text">{p('about')}</p>
            </div>
          </div>
        </section>

        <section className="project-slide" id="slide-funcionalidades">
          <div className="project-slide-inner">
            <h2 className="project-slide-heading">{t('project_detail.features')}</h2>
            <div className="project-slide-card-list">
              {project.features.map((_, i) => (
                <div key={i} className="project-slide-card">
                  <p className="project-slide-text">{p(`features.${i}`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="project-slide" id="slide-arquitetura">
          <div className="project-slide-inner">
            <h2 className="project-slide-heading">{t('project_detail.architecture')}</h2>
            <div className="project-slide-card">
              <p className="project-slide-text">{p('architecture')}</p>
            </div>
          </div>
        </section>

        <section className="project-slide" id="slide-tecnologias">
          <div className="project-slide-inner">
            <h2 className="project-slide-heading">{t('project_detail.tech')}</h2>
            <div className="project-slide-card-list">
              {project.techStack.map((group) => (
                <div key={group.category} className="project-slide-card">
                  <span className="project-slide-card-label">
                    {t(techCategoryMap[group.category] || group.category)}
                  </span>
                  <div className="project-slide-tags">
                    {group.items.map((item) => (
                      <span key={item} className="project-tag">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {project.limitations.length > 0 && (
          <section className="project-slide" id="slide-limitacoes">
            <div className="project-slide-inner">
              <h2 className="project-slide-heading">{t('project_detail.limitations')}</h2>
              <div className="project-slide-card-list">
                {project.limitations.map((_, i) => (
                  <div key={i} className="project-slide-card">
                    <p className="project-slide-text">{p(`limitations.${i}`)}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="project-slide" id="slide-galeria">
          <div className="project-slide-inner">
            <h2 className="project-slide-heading">{t('project_detail.gallery')}</h2>
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
                      onClick={() => goToSlideImg(i)}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </section>

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
    </>
  )
}

export default ProjectDetail
