export interface PropRow {
  name:        string
  type:        string
  default?:    string
  required?:   boolean
  description: string
}

export const PropsTable = ({ rows }: { rows: PropRow[] }) => {
  return (
    <div className="docs-props">
      <table>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Req</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.name}>
              <td><code>{r.name}</code></td>
              <td><code>{r.type}</code></td>
              <td>{r.default ?? '—'}</td>
              <td>{r.required ? '✓' : ''}</td>
              <td>{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
