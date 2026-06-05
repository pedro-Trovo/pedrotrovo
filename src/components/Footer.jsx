import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { useLanguage } from '../i18n'

function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-cta">
          <p className="footer-cta-text">{t('footer.cta_text')}</p>
          <Link to="/contato" className="btn btn-primary btn-glow btn-glow-white">
            {t('footer.cta_btn')} &rarr;
          </Link>
        </div>

        <div className="footer-hr" />

        <div className="footer-bottom">
          <div className="footer-bottom-row">
            <div className="footer-logo">
              <svg width="24" height="28" viewBox="0 0 790 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M 0.193,466.389 V 630.263 H 115.08 V 473.48 a 57.55,57.55 0 0 1 16.824,-40.668 57.41,57.41 0 0 1 40.619,-16.846 h 117.798 c 54.953,-0.016 107.65,-21.884 146.504,-60.793 38.853,-38.91 60.681,-91.676 60.686,-146.696 0,-55.028 -21.832,-107.803 -60.692,-146.717 C 397.958,22.846 345.251,0.98 290.29,0.972 H 115.08 V 109.239 h 167.467 a 98,98 0 0 1 69.329,28.746 98.24,98.24 0 0 1 28.733,69.405 98.242,98.242 0 0 1 -28.721,69.425 98.004,98.004 0 0 1 -69.341,28.757 H 160.798 a 160.372,160.372 0 0 0 -61.477,12.221 160.515,160.515 0 0 0 -52.116,34.859 160.737,160.737 0 0 0 -34.812,52.184 160.892,160.892 0 0 0 -12.2,61.553 z"/>
                <path fill="currentColor" d="M 172.491,415.966 A 172.21,172.21 0 0 0 50.663,466.498 C 18.35,498.848 0.197,542.724 0.193,588.475 v 41.788 H 115.08 V 473.48 a 57.548,57.548 0 0 1 16.813,-40.657 57.411,57.411 0 0 1 40.598,-16.857 z"/>
              </svg>
              <svg width="100" height="22" viewBox="0 0 125 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="25" fontFamily="'Plus Jakarta Sans','Inter','Segoe UI',sans-serif" fontWeight="300" fontSize="18" fill="currentColor" letterSpacing="-0.3">pedro</text>
                <text x="60" y="25" fontFamily="'Plus Jakarta Sans','Inter','Segoe UI',sans-serif" fontWeight="700" fontSize="18" fill="currentColor" letterSpacing="-0.3">trovo</text>
              </svg>
            </div>
            <div className="footer-social">
              <a href="https://github.com/pedro-Trovo" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a href="https://www.linkedin.com/in/pedro-trovo-link/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="mailto:pedroramostrovo@gmail.com" aria-label="Email">
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
            </div>
          </div>
          <p className="footer-copy">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer