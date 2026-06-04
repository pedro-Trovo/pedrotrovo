import { useTheme } from '../hooks/useTheme'

const darkFilter = 'invert(100%) sepia(4%) saturate(141%) hue-rotate(256deg) brightness(114%) contrast(76%)'
const lightFilter = 'invert(24%) sepia(15%) saturate(0%) hue-rotate(296deg) brightness(106%) contrast(88%)'

const svgModules = import.meta.glob('../assets/icons/*.svg', { query: '?raw', eager: true, import: 'default' })

const svgMap = {}
for (const [path, content] of Object.entries(svgModules)) {
  const name = path.split('/').pop().replace('.svg', '')
  svgMap[name] = content
}

function InlineSvg({ name, className, width = 48, height = 48 }) {
  const raw = svgMap[name]
  if (!raw) return null

  const theme = useTheme()

  const cleaned = raw
    .replace(/<svg[^>]*>/, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="${width}" height="${height}">`)

  return (
    <span
      className={className}
      aria-label={name}
      style={{ filter: theme === 'dark' ? darkFilter : lightFilter }}
      dangerouslySetInnerHTML={{ __html: cleaned }}
    />
  )
}

export default InlineSvg
