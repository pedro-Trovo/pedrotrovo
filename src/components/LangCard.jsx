import { useLanguage } from '../i18n'

function LangCard({ items }) {
  const { t } = useLanguage()

  return (
    <div className="lang-list">
      {items.map((item) => (
        <a
          key={item.nameKey}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="lang-row"
        >
          <span className="lang-row-name">{t(item.nameKey)}</span>
          <span className="lang-row-level">{t(item.levelKey)}</span>
        </a>
      ))}
    </div>
  )
}

export default LangCard
