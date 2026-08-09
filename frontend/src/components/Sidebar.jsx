import { NavLink } from 'react-router-dom'
import {
  AudioLines,
  FileText,
  Globe2,
  LayoutDashboard,
  ShieldAlert,
  Subtitles,
} from 'lucide-react'

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/text', label: 'Text Localization', icon: Globe2 },
  { to: '/audio', label: 'Audio Translation', icon: AudioLines },
  { to: '/video', label: 'Video Captioning', icon: Subtitles },
  { to: '/document', label: 'Document Translation', icon: FileText },
  { to: '/bias', label: 'Bias Check', icon: ShieldAlert },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand-block">
        <div className="brand-mark">PL</div>
        <div>
          <p className="brand-title">FLUENTRA</p>
          <p className="brand-sub">AI Localization</p>
        </div>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-label">Tools</p>
        <nav className="sidebar-nav">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

    </aside>
  )
}
