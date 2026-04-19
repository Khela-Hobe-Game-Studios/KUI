import { useState, type ReactNode } from 'react'
import { PropsTable } from './PropsTable'
import { CodeSnippet } from './CodeSnippet'
import type { PropRow } from './PropsTable'

export type { PropRow }

interface BoothProps {
  id:          string
  emoji:       string
  title:       string
  description: string
  snippet:     string
  props?:      PropRow[]
  children:    ReactNode
}

export const Booth = ({ id, emoji, title, description, snippet, props, children }: BoothProps) => {
  const [showProps, setShowProps] = useState(false)

  return (
    <div id={id} className="docs-booth">
      <div className="docs-booth__header">
        <span className="docs-booth__emoji">{emoji}</span>
        <div className="docs-booth__info">
          <h3 className="docs-booth__title">{title}</h3>
          <p className="docs-booth__desc">{description}</p>
        </div>
        {props && (
          <button
            className="docs-booth__props-btn"
            onClick={() => setShowProps(p => !p)}
          >
            Props {showProps ? '▲' : '▼'}
          </button>
        )}
      </div>
      <div className="docs-booth__demo">{children}</div>
      {props && (
        <div className={`docs-booth__props-drawer${showProps ? ' is-open' : ''}`}>
          <PropsTable rows={props} />
        </div>
      )}
      <CodeSnippet code={snippet} />
    </div>
  )
}
