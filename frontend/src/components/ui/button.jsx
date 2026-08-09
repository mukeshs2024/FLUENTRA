import clsx from 'clsx'

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-lagoon-500/70 disabled:cursor-not-allowed disabled:opacity-60'
  const variants = {
    primary: 'bg-ink-900 text-white hover:bg-ink-800',
    ghost:
      'border border-ink-300/70 text-ink-700 hover:border-ink-400 dark:border-ink-700/70 dark:text-ink-200',
    glow: 'bg-lagoon-500 text-white shadow-glow hover:bg-lagoon-600',
    soft:
      'bg-ink-200/70 text-ink-800 hover:bg-ink-200 dark:bg-ink-800/70 dark:text-ink-200',
  }
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  return (
    <button
      className={clsx(base, variants[variant], sizes[size], className)}
      {...props}
    />
  )
}
