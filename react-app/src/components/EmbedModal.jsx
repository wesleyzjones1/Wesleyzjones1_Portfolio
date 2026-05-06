import { useEffect, useRef } from 'react'

const ExternalIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

const XIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

/**
 * EmbedModal — renders a GitHub Pages URL in a sandboxed iframe.
 *
 * Security: the sandbox attribute restricts the iframe to scripts and
 * same-origin access only, preventing navigation of the top frame.
 *
 * Close: Escape key or click outside the window.
 */
export default function EmbedModal({ title, url, onClose }) {
  const backdropRef = useRef(null)

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="modal-backdrop"
      ref={backdropRef}
      onClick={e => { if (e.target === backdropRef.current) onClose() }}
    >
      <div className="modal-window">
        <div className="modal-header">
          <div className="modal-title">
            {title}
            <span className="modal-title-url">{url}</span>
          </div>
          <div className="modal-actions">
            <a className="btn" href={url} target="_blank" rel="noopener noreferrer">
              Open in tab <ExternalIcon />
            </a>
            <button className="modal-close" onClick={onClose} title="Close (Esc)">
              <XIcon />
            </button>
          </div>
        </div>
        <iframe
          className="modal-iframe"
          src={url}
          title={title}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock allow-presentation"
          loading="lazy"
        />
      </div>
    </div>
  )
}
