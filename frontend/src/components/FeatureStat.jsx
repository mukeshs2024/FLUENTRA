export default function FeatureStat({ label, value }) {
  return (
    <div className="rounded-2xl border border-ink-200/60 bg-white/70 px-4 py-3 dark:border-ink-700/70 dark:bg-ink-900/70">
      <p className="text-xs uppercase tracking-[0.2em] text-ink-500 dark:text-ink-300">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold text-ink-900 dark:text-ink-100">
        {value}
      </p>
    </div>
  )
}
