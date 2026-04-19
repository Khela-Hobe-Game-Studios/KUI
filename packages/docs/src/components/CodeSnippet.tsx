import { useState } from 'react'

export const CodeSnippet = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(code).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="docs-snippet">
      <button className="docs-snippet__copy" onClick={copy}>
        {copied ? '✓ Copied' : 'Copy'}
      </button>
      <pre><code>{code}</code></pre>
    </div>
  )
}
