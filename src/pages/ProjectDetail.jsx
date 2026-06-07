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

  const featureIcon = useMemo(() => {
    if (!project) return []
    const keywords = {
      analisador: '🔍', analyzer: '🔍', classifica: '🔍',
      árvore: '🌳', tree: '🌳', visualizar: '🌳',
      quiz: '🎯', questões: '🎯', questions: '🎯',
      desktop: '🖥️', instalador: '🖥️', installer: '🖥️',
      estatísticas: '📊', statistics: '📊', métricas: '📊', metrics: '📊',
      dashboard: '📈', gráfico: '📈', chart: '📈',
      docker: '🐳', deploy: '🐳',
      criação: '📦',
      rastreamento: '📍', tracking: '📍', código: '📍', code: '📍',
      atualização: '🔄', update: '🔄', transição: '🔄', transition: '🔄',
      cancelamento: '❌', cancellation: '❌',
      filtro: '🔎', filters: '🔎', busca: '🔎', search: '🔎',
      geração: '🔢', generation: '🔢', automática: '🔢', automatic: '🔢',
    }
    return project.features.map((feat) => {
      const lower = feat.toLowerCase()
      const found = Object.entries(keywords).find(([kw]) => lower.includes(kw))
      return found ? found[1] : '✨'
    })
  }, [project])

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

  const categoryClass = (cat) => {
    const slug = cat.toLowerCase().replace(/\s+/g, '-')
    return `project-slide-tag-tech--${slug}`
  }

  const categoryColors = {
    frontend: '#14b8a6',
    backend: '#3b82f6',
    'api-rest': '#a855f7',
    devops: '#22c55e',
    desktop: '#f59e0b',
    banco: '#06b6d4',
    database: '#06b6d4',
  }

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

            {project.context && (
              <span className="project-slide-context-badge">
                {project.slug === 'morslum' ? '🧪' : '🚀'} {p('context')}
              </span>
            )}

            <div className="project-slide-header">
              <p className="project-detail-subtitle text-muted">{project.subtitle}</p>
              <h1 className="project-detail-title heading-gradient">{project.title}</h1>
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

            {project.links.doi && (
              <div className="project-slide-callout">
                <span className="project-slide-callout-icon">⭐</span>
                <div>
                  <p className="project-slide-callout-title">{t('project_detail.highlights')}</p>
                  <ul className="project-slide-callout-bullets">
                    {project.slug === 'morslum' && (
                      <li>{t('project_detail.months_development')}</li>
                    )}
                    <li>{t('project_detail.has_doi')}</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="project-slide" id="slide-funcionalidades">
          <div className="project-slide-inner">
            <h2 className="project-slide-heading">{t('project_detail.features')}</h2>
            <div className="project-slide-feature-grid">
              {project.features.map((_, i) => (
                <div key={i} className="project-slide-card project-slide-card--hover-lift">
                  <span className="project-slide-card-icon">{featureIcon[i]}</span>
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
            <div className="project-slide-callout">
              <span className="project-slide-callout-icon">📐</span>
              <div>
                <p className="project-slide-callout-title">{t('project_detail.how_it_works')}</p>
                <ul className="project-slide-callout-bullets">
                  {project.techStack.filter(g => g.category === 'Frontend').length > 0 && (
                    <li>
                      <strong>{t(techCategoryMap[project.techStack.find(g => g.category === 'Frontend')?.category] || 'Frontend')}:</strong>{' '}
                      {project.techStack.find(g => g.category === 'Frontend')?.items.slice(0, 3).join(', ')}
                    </li>
                  )}
                  {project.techStack.filter(g => g.category === 'Backend' || g.category === 'API REST').length > 0 && (
                    <li>
                      <strong>{t(techCategoryMap['Backend'] || 'Backend')}:</strong>{' '}
                      {[...(project.techStack.find(g => g.category === 'Backend')?.items || []), ...(project.techStack.find(g => g.category === 'API REST')?.items || [])].slice(0, 3).join(', ')}
                    </li>
                  )}
                  {project.techStack.filter(g => g.category === 'Banco' || g.category === 'Database').length > 0 && (
                    <li>
                      <strong>{t(techCategoryMap['Banco'] || 'Database')}:</strong>{' '}
                      {project.techStack.find(g => g.category === 'Banco' || g.category === 'Database')?.items.join(', ')}
                    </li>
                  )}
                  {project.techStack.filter(g => g.category === 'DevOps').length > 0 && (
                    <li>
                      <strong>{t(techCategoryMap['DevOps'])}:</strong>{' '}
                      {project.techStack.find(g => g.category === 'DevOps')?.items.join(', ')}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="project-slide" id="slide-tecnologias">
          <div className="project-slide-inner">
            <h2 className="project-slide-heading">{t('project_detail.tech')}</h2>
            <div className="project-slide-tech-grid">
              {project.techStack.map((group) => (
                <div key={group.category} className="project-slide-card">
                  <span className="project-slide-card-label" style={{ color: categoryColors[categoryClass(group.category).replace('project-slide-tag-tech--', '')] || 'var(--color-text-muted)' }}>
                    {t(techCategoryMap[group.category] || group.category)}
                  </span>
                  <div className="project-slide-tags" style={{ gap: '0.35rem' }}>
                    {group.items.map((item) => (
                      <span key={item} className={`project-slide-tag-tech ${categoryClass(group.category)}`}>{item}</span>
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
              <div className="project-slide-feature-grid">
                {project.limitations.map((_, i) => (
                  <div key={i} className="project-slide-card project-slide-card--hover-lift project-slide-card--warning">
                    <span className="project-slide-card-icon">⚠️</span>
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
