import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { useLanguage } from '../i18n'

function CertCard({ cert }) {
  const { t } = useLanguage()

  return (
    <div className="cert-card">
      <div className="cert-card-logo">
        <img src={cert.logo} alt={cert.issuer} />
      </div>
      <div className="cert-card-info">
        <h3 className="cert-card-name">{cert.name}</h3>
        <p className="cert-card-issuer">{cert.issuer} &middot; {cert.issueDate}</p>
        {cert.description && (
          <p className="cert-card-description">{cert.description}</p>
        )}
        <a
          href={cert.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="cert-card-btn"
        >
          {t('cert.show_credential')}
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </a>
      </div>
    </div>
  )
}

export default CertCard
