import { UploadCloud } from 'lucide-react'

export default function Dropzone({ title, description, formats }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-ink-300/70 bg-white/60 p-6 text-center dark:border-ink-700/70 dark:bg-ink-900/60">
      <div className="rounded-full bg-ink-100 p-3 text-ink-700 dark:bg-ink-800 dark:text-ink-200">
        <UploadCloud size={24} />
      </div>
      <div>
        <p className="text-sm font-semibold text-ink-900 dark:text-ink-100">{title}</p>
        <p className="text-xs text-ink-500 dark:text-ink-300">{description}</p>
      </div>
      <span className="text-xs uppercase tracking-[0.2em] text-ink-400 dark:text-ink-400">
        {formats}
      </span>
    </div>
  )
}
