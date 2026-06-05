const svgModules = import.meta.glob('../assets/icons/*.svg', { query: '?raw', eager: true, import: 'default' })

const svgMap = {}
for (const [path, content] of Object.entries(svgModules)) {
  const name = path.split('/').pop().replace('.svg', '')
  svgMap[name] = content
}

function InlineSvg({ name, className, width = 40, height = 40 }) {
  const raw = svgMap[name]
  if (!raw) return null

  const cleaned = raw
    .replace(/<svg[^>]*>/, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="${width}" height="${height}">`)

  return (
    <span
      className={className}
      aria-label={name}
      dangerouslySetInnerHTML={{ __html: cleaned }}
    />
  )
}

export default InlineSvg
