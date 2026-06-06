function LangCard({ items }) {
  return (
    <div className="lang-list">
      {items.map((item) => (
        <a
          key={item.name}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="lang-row"
        >
          <span className="lang-row-name">{item.name}</span>
          <span className="lang-row-level">{item.level}</span>
        </a>
      ))}
    </div>
  )
}

export default LangCard
