export default function ToolCard({ icon, title, tag, description }) {
  return (
    <div className="tool-card">
      <div className="tool-icon">{icon}</div>
      <div className="tool-body">
        <div className="tool-header">
          <h3>{title}</h3>
          <span className="tool-tag">{tag}</span>
        </div>
        <p>{description}</p>
      </div>
    </div>
  )
}
