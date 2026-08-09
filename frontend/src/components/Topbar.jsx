export default function Topbar() {
  return (
    <header className="topbar">
      <div className="breadcrumbs">
        <span className="crumb">FLUENTRA</span>
        <span className="crumb-divider">/</span>
        <span className="crumb-active">Dashboard</span>
      </div>
      <div className="status-pill">
        <span className="status-dot" />
        Live
      </div>
    </header>
  )
}
