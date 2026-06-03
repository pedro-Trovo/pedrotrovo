import { useState, useEffect } from 'react'

function Typewriter({ words, className }) {
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const current = words[wordIndex]
    let timeout

    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && text === '') {
      timeout = setTimeout(() => {
        setIsDeleting(false)
        setWordIndex((i) => (i + 1) % words.length)
      }, 300)
    } else {
      timeout = setTimeout(
        () => {
          setText(
            isDeleting
              ? current.substring(0, text.length - 1)
              : current.substring(0, text.length + 1)
          )
        },
        isDeleting ? 40 : 80
      )
    }

    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex, words])

  return (
    <span className={className}>
      {text}
      <span className="typewriter-cursor">|</span>
    </span>
  )
}

export default Typewriter
