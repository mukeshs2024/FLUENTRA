import clsx from 'clsx'

export default function Select({ className, ...props }) {
  return (
    <select
      className={clsx(
        'w-full rounded-2xl border border-ink-200/70 bg-white px-4 py-3 text-sm text-ink-800 shadow-sm transition focus:border-lagoon-500 focus:outline-none focus:ring-2 focus:ring-lagoon-500/30 dark:border-ink-700/70 dark:bg-ink-900/70 dark:text-ink-100',
        className,
      )}
      {...props}
    />
  )
}
