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

const TECH_BADGES = {
  React: { name: 'React', color: '#61DAFB', logo: 'react', url: 'https://react.dev' },
  Vite: { name: 'Vite', color: '#646CFF', logo: 'vite', url: 'https://vitejs.dev' },
  PrimeReact: { name: 'PrimeReact', color: '#4FC3F7', url: 'https://primereact.org' },
  Python: { name: 'Python', color: '#3776AB', logo: 'python', url: 'https://www.python.org' },
  Flask: { name: 'Flask', color: '#000000', logo: 'flask', url: 'https://flask.palletsprojects.com' },
  spaCy: { name: 'spaCy', color: '#09A3D5', logo: 'spacy', url: 'https://spacy.io' },
  Docker: { name: 'Docker', color: '#2496ED', logo: 'docker', url: 'https://www.docker.com' },
  'Docker Compose': { name: 'Docker Compose', color: '#2496ED', logo: 'docker', url: 'https://docs.docker.com/compose' },
  Electron: { name: 'Electron', color: '#47848F', logo: 'electron', url: 'https://www.electronjs.org' },
  TailwindCSS: { name: 'Tailwind CSS', color: '#06B6D4', logo: 'tailwindcss', url: 'https://tailwindcss.com' },
  'shadcn/ui': { name: 'shadcn/ui', color: '#000000', url: 'https://ui.shadcn.com' },
  ECharts: { name: 'ECharts', color: '#AA344D', logo: 'apacheecharts', url: 'https://echarts.apache.org' },
  Express: { name: 'Express', color: '#000000', logo: 'express', url: 'https://expressjs.com' },
  'Node.js': { name: 'Node.js', color: '#339933', logo: 'nodedotjs', url: 'https://nodejs.org' },
  Java: { name: 'Java', color: '#ED8B00', logo: 'openjdk', url: 'https://www.java.com' },
  'Spring Boot': { name: 'Spring Boot', color: '#6DB33F', logo: 'spring', url: 'https://spring.io/projects/spring-boot' },
  'SOAP Web Services': { name: 'SOAP', color: '#6A1B9A', url: 'https://www.w3.org/TR/soap' },
  JPA: { name: 'JPA', color: '#59666C', logo: 'hibernate', url: 'https://jakarta.ee/specifications/persistence' },
  PostgreSQL: { name: 'PostgreSQL', color: '#4169E1', logo: 'postgresql', url: 'https://www.postgresql.org' },
  Maven: { name: 'Maven', color: '#C71A36', logo: 'apachemaven', url: 'https://maven.apache.org' },
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

  const featureLabels = useMemo(() => {
    const labels = {
      morslum: {
        pt: ['Analisador Morfossintático', 'Árvore de Dependências', 'Quiz Educativo', 'Desktop App', 'Estatísticas', 'Infraestrutura Docker'],
        en: ['Morphosyntactic Analyzer', 'Dependency Tree', 'Educational Quiz', 'Desktop App', 'Statistics', 'Docker Infrastructure'],
      },
      translog: {
        pt: ['Cadastro de Entregas', 'Rastreamento', 'Atualização de Status', 'Cancelamento', 'Filtros', 'Dashboard', 'Código de Rastreio'],
        en: ['Delivery Registration', 'Tracking', 'Status Update', 'Cancellation', 'Filters', 'Dashboard', 'Tracking Code'],
      },
    }
    return labels[project?.slug]?.[language] || []
  }, [project, language])

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

  const badgeUrl = (name) => {
    const b = TECH_BADGES[name]
    if (!b) return null
    const parts = [`https://img.shields.io/badge/${encodeURIComponent(b.name)}-${b.color.slice(1)}?style=for-the-badge`]
    if (b.logo) parts.push(`&logo=${b.logo}&logoColor=white`)
    return parts.join('')
  }

  const featureGroups = {
    morslum: [
      { icon: '🧠', label: 'Núcleo de Análise', indices: [0, 1, 4] },
      { icon: '🎯', label: 'Aprendizado', indices: [2] },
      { icon: '🐳', label: 'Infraestrutura e Distribuição', indices: [3, 5] },
    ],
    translog: [
      { icon: '📦', label: 'Gestão de Entregas', indices: [0, 1, 2, 3] },
      { icon: '🔎', label: 'Consulta e Monitoria', indices: [4, 5, 6] },
    ],
  }

  const archGroups = {
    morslum: [
      { icon: '🌐', title: 'Frontend', desc: 'React com PrimeReact — interface que consome a API REST e renderiza árvores SVG.' },
      { icon: '⚙️', title: 'Backend (Flask)', desc: 'API REST em Flask com spaCy — pipeline de NLP para análise morfossintática.' },
      { icon: '🗄️', title: 'Cache (Redis)', desc: 'Banco Redis para cache de análises frequentes, agilizando respostas.' },
      { icon: '🐳', title: 'Infraestrutura', desc: 'Docker Compose orquestra Redis, API Flask e Frontend Nginx.' },
      { icon: '🖥️', title: 'Desktop (Electron)', desc: 'Electron empacota frontend + Python portátil em instalador único (NSIS).' },
    ],
    translog: [
      { icon: '🌐', title: 'Frontend', desc: 'React com TailwindCSS e shadcn/ui — consome API REST intermediária.' },
      { icon: '🔗', title: 'API REST (Express)', desc: 'Express traduz chamadas REST do frontend para Web Services SOAP.' },
      { icon: '⚙️', title: 'Backend (Spring Boot)', desc: 'Expõe operações SOAP de criação, rastreamento e cancelamento de entregas.' },
      { icon: '🗄️', title: 'Banco (PostgreSQL)', desc: 'Armazena dados de entregas, status e rastreamento.' },
      { icon: '🐳', title: 'DevOps', desc: 'Docker Compose orquestra todos os serviços da aplicação.' },
    ],
  }

  const limitationGroups = {
    morslum: [
      { icon: '🧠', label: 'Limitações do Modelo NLP', indices: [0, 1, 2] },
      { icon: '📝', label: 'Qualidade da Análise', indices: [3] },
    ],
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
        <div className="project-progress-bar" role="progressbar" aria-valuenow={activeSlide + 1} aria-valuemin={1} aria-valuemax={slides.length}>
          <div className="project-progress-fill" style={{ width: `${((activeSlide + 1) / slides.length) * 100}%` }} />
        </div>

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
            <div className="project-slide-group" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: 0, border: 'none', background: 'none' }}>
              {(featureGroups[project.slug] || []).map((group) => (
                <div key={group.label} className="project-slide-group">
                  <div className="project-slide-group-header">
                    <span>{group.icon}</span>
                    <span>{group.label}</span>
                  </div>
                  <div className="project-slide-group-grid" style={{ gridTemplateColumns: group.indices.length < 3 ? `repeat(${group.indices.length}, 1fr)` : undefined }}>
                    {group.indices.map((i) => (
                      <div key={i} className="project-slide-inner-card">
                        <span className="project-slide-inner-card-icon">{featureIcon[i]}</span>
                        {featureLabels[i] && <strong className="project-slide-inner-card-label">{featureLabels[i]}</strong>}
                        <p className="project-slide-inner-card-text">{p(`features.${i}`)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="project-slide" id="slide-arquitetura">
          <div className="project-slide-inner">
            <h2 className="project-slide-heading">{t('project_detail.architecture')}</h2>
            <div className="project-slide-group" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: 0, border: 'none', background: 'none' }}>
              <div className="project-slide-card">
                <p className="project-slide-text">{p('architecture')}</p>
              </div>
              <div className="project-slide-group">
                <div className="project-slide-group-header">
                  <span>📐</span>
                  <span>{t('project_detail.how_it_works')}</span>
                </div>
                <div className="project-slide-group-grid" style={{ gridTemplateColumns: `repeat(${Math.min((archGroups[project.slug] || []).length, 3)}, 1fr)` }}>
                  {(archGroups[project.slug] || []).map((layer) => (
                    <div key={layer.title} className="project-slide-inner-card">
                      <span className="project-slide-inner-card-icon">{layer.icon}</span>
                      <strong className="project-slide-inner-card-label">{layer.title}</strong>
                      <p className="project-slide-inner-card-text">{layer.desc}</p>
                    </div>
                  ))}
                </div>
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
                  <span className="project-slide-card-label">
                    {t(techCategoryMap[group.category] || group.category)}
                  </span>
                  <div className="project-slide-tags" style={{ gap: '0.4rem' }}>
                    {group.items.map((item) => {
                      const url = badgeUrl(item)
                      if (!url) return <span key={item} className="project-slide-text" style={{ fontSize: '0.85rem' }}>{item}</span>
                      return (
                        <a key={item} href={TECH_BADGES[item]?.url} target="_blank" rel="noopener noreferrer" title={item}>
                          <img alt={item} src={url} className="project-tech-badge-img" />
                        </a>
                      )
                    })}
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
              <div className="project-slide-group" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: 0, border: 'none', background: 'none' }}>
                {(limitationGroups[project.slug] || []).map((group) => (
                  <div key={group.label} className="project-slide-group">
                    <div className="project-slide-group-header">
                      <span>{group.icon}</span>
                      <span>{group.label}</span>
                    </div>
                    <div className="project-slide-group-grid">
                      {group.indices.map((i) => (
                        <div key={i} className="project-slide-inner-card project-slide-inner-card--warning">
                          <span className="project-slide-inner-card-icon">⚠️</span>
                          <p className="project-slide-inner-card-text" style={{ color: 'var(--color-text-primary)' }}>{p(`limitations.${i}`)}</p>
                        </div>
                      ))}
                    </div>
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
