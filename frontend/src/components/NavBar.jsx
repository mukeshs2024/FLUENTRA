import { NavLink } from 'react-router-dom'
import { AudioLines, FileText, Globe2, Home, Subtitles, ShieldAlert } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const links = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/text', label: 'Text', icon: Globe2 },
  { to: '/audio', label: 'Audio', icon: AudioLines },
  { to: '/video', label: 'Video', icon: Subtitles },
  { to: '/document', label: 'Documents', icon: FileText },
  { to: '/bias', label: 'Bias Lab', icon: ShieldAlert },
]

export default function NavBar({ isDark, onToggle }) {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-200/70 bg-white/70 backdrop-blur dark:border-ink-800/80 dark:bg-ink-950/80">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-lagoon-500 text-white">
            PL
          </div>
          <div>
            <p className="text-sm font-semibold text-ink-900 dark:text-ink-100">
              FLUENTRA
            </p>
            <p className="text-xs text-ink-500 dark:text-ink-400">
              AI localization engine
            </p>
          </div>
        </div>
        <nav className="hidden items-center gap-4 text-sm font-medium text-ink-600 dark:text-ink-300 md:flex">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `rounded-full px-3 py-1 transition ${
                  isActive
                    ? 'bg-ink-900 text-white'
                    : 'text-ink-600 hover:text-ink-900 dark:text-ink-300 dark:hover:text-ink-100'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <ThemeToggle isDark={isDark} onToggle={onToggle} />
      </div>
    </header>
  )
}
