import clsx from 'clsx'

export default function Badge({ tone = 'neutral', className, ...props }) {
  const tones = {
    neutral:
      'border-ink-200/60 bg-white/70 text-ink-600 dark:border-ink-700/70 dark:bg-ink-900/60 dark:text-ink-300',
    alert: 'border-solar-500/40 bg-solar-500/10 text-solar-600',
    success: 'border-lagoon-500/40 bg-lagoon-500/10 text-lagoon-600',
  }

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]',
        tones[tone],
        className,
      )}
      {...props}
    />
  )
}
