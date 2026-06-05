import { useState, useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBars, faTimes, faUser, faCode, faCog, faBriefcase, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { useLanguage } from '../i18n'
import { useMouseGlow } from '../hooks/useMouseGlow'
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts'
import ThemeToggle from './ThemeToggle'
import LanguageToggle from './LanguageToggle'
import SearchModal from './SearchModal'


function Header() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [showSearch, setShowSearch] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const searchBtnRef = useMouseGlow()
  const hamburgerRef = useMouseGlow()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useKeyboardShortcuts({
    goHome: () => navigate('/'),
    goProjects: () => navigate('/projetos'),
    goSkills: () => navigate('/skills'),
    goExperiences: () => navigate('/experiencias'),
    goContact: () => navigate('/contato'),
    openSearch: () => setShowSearch(true),
    toggleTheme: () => document.querySelector('.theme-toggle')?.click(),
  })

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <NavLink to="/" className="logo-link" aria-label="Pedro Trovo — Home">
        <svg width="24" height="28" viewBox="0 0 790 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="logo-grad" cx="0" cy="0" r="1" gradientTransform="matrix(632.616,0,0,633.388,499.32,-86.401)" gradientUnits="userSpaceOnUse">
              <stop stop-color="#0F172A"/>
              <stop offset="1" stop-color="#2DD4BF"/>
            </radialGradient>
            <linearGradient id="logo-grad2" x1="86.342" x2="86.342" y1="599.269" y2="358.469" gradientUnits="userSpaceOnUse">
              <stop stop-color="#0F172A"/>
              <stop offset="1" stop-color="#0D9488"/>
            </linearGradient>
          </defs>
          <g transform="matrix(1.5890899,0,0,1.5890899,-0.30664861,-1.5445954)">
            <path fill="url(#logo-grad)" d="M 0.193,466.389 V 630.263 H 115.08 V 473.48 a 57.55,57.55 0 0 1 16.824,-40.668 57.41,57.41 0 0 1 40.619,-16.846 h 117.798 c 54.953,-0.016 107.65,-21.884 146.504,-60.793 38.853,-38.91 60.681,-91.676 60.686,-146.696 0,-55.028 -21.832,-107.803 -60.692,-146.717 C 397.958,22.846 345.251,0.98 290.29,0.972 H 115.08 V 109.239 h 167.467 a 98,98 0 0 1 69.329,28.746 98.24,98.24 0 0 1 28.733,69.405 98.242,98.242 0 0 1 -28.721,69.425 98.004,98.004 0 0 1 -69.341,28.757 H 160.798 a 160.372,160.372 0 0 0 -61.477,12.221 160.515,160.515 0 0 0 -52.116,34.859 160.737,160.737 0 0 0 -34.812,52.184 160.892,160.892 0 0 0 -12.2,61.553 z"/>
            <path fill="url(#logo-grad2)" d="M 172.491,415.966 A 172.21,172.21 0 0 0 50.663,466.498 C 18.35,498.848 0.197,542.724 0.193,588.475 v 41.788 H 115.08 V 473.48 a 57.548,57.548 0 0 1 16.813,-40.657 57.411,57.411 0 0 1 40.598,-16.857 z"/>
          </g>
        </svg>
        <svg width="125" height="28" viewBox="0 0 125 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="25" fontFamily="'Plus Jakarta Sans','Inter','Segoe UI',sans-serif" fontWeight="300" fontSize="18" fill="currentColor" letterSpacing="-0.3">pedro</text>
          <text x="60" y="25" fontFamily="'Plus Jakarta Sans','Inter','Segoe UI',sans-serif" fontWeight="700" fontSize="18" fill="currentColor" letterSpacing="-0.3">trovo</text>
        </svg>
      </NavLink>

      <nav className="header-nav-desktop">
        <NavLink to="/" end>{t('nav.home')}</NavLink>
        <NavLink to="/projetos">{t('nav.projects')}</NavLink>
        <NavLink to="/skills">{t('nav.skills')}</NavLink>
        <NavLink to="/experiencias">{t('nav.experiences')}</NavLink>
        <NavLink to="/contato">{t('nav.contact')}</NavLink>
      </nav>

      <div className="header-actions">
        <button ref={searchBtnRef} className="header-search-btn btn-glow" onClick={() => setShowSearch(true)} aria-label="Search">
          <FontAwesomeIcon icon={faSearch} />
        </button>
        <div className="header-actions-desktop">
          <span><LanguageToggle /></span>
          <span><ThemeToggle /></span>
        </div>
        <button
          ref={hamburgerRef}
          className="hamburger btn-glow"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </button>
      </div>

      {menuOpen && <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />}

      <div className={`mobile-drawer${menuOpen ? ' mobile-drawer--open' : ''}`}>
        <div className="mobile-drawer-top">
          <LanguageToggle />
          <ThemeToggle />
        </div>
        <div className="mobile-divider" />
        <nav className="mobile-nav">
          <NavLink to="/" end>
            <FontAwesomeIcon icon={faUser} className="mobile-nav-icon" />
            {t('nav.home')}
          </NavLink>
          <NavLink to="/projetos">
            <FontAwesomeIcon icon={faCode} className="mobile-nav-icon" />
            {t('nav.projects')}
          </NavLink>
          <NavLink to="/skills">
            <FontAwesomeIcon icon={faCog} className="mobile-nav-icon" />
            {t('nav.skills')}
          </NavLink>
          <NavLink to="/experiencias">
            <FontAwesomeIcon icon={faBriefcase} className="mobile-nav-icon" />
            {t('nav.experiences')}
          </NavLink>
          <NavLink to="/contato">
            <FontAwesomeIcon icon={faEnvelope} className="mobile-nav-icon" />
            {t('nav.contact')}
          </NavLink>
        </nav>
      </div>

      {showSearch && <SearchModal onClose={() => setShowSearch(false)} />}
    </header>
  )
}

export default Header
