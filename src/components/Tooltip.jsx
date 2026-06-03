import { useState } from 'react'

function Tooltip({ text, children }) {
  const [visible, setVisible] = useState(false)

  return (
    <span
      className="tooltip-wrapper"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span className="tooltip" role="tooltip">
          {text}
        </span>
      )}
    </span>
  )
}

export default Tooltip
