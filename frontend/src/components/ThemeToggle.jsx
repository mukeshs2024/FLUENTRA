import { Moon, Sun } from 'lucide-react'
import Button from './ui/button'

export default function ThemeToggle({ isDark, onToggle }) {
  return (
    <Button variant="soft" size="sm" onClick={onToggle}>
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
      {isDark ? 'Light' : 'Dark'}
    </Button>
  )
}
