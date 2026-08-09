export default function SectionHeader({ title, subtitle }) {
  return (
    <div className="space-y-2">
      <p className="glow-pill">AI Localization Suite</p>
      <h2 className="section-title">{title}</h2>
      <p className="helper-text max-w-2xl">{subtitle}</p>
    </div>
  )
}
