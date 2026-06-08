import { useEffect } from 'react'

export function useKeyboardShortcuts(actions) {
  useEffect(() => {
    const handler = (e) => {
      const tag = e.target.tagName
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return

      if (e.key === '1') actions.goHome?.()
      else if (e.key === '2') actions.goProjects?.()
      else if (e.key === '3') actions.goSkills?.()
      else if (e.key === '4') actions.goExperiences?.()
      else if (e.key === '5') actions.goContact?.()
      else if ((e.key === 'b' || e.key === 'B') && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        actions.toggleTheme?.()
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [actions])
}
