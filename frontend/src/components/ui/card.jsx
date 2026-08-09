import clsx from 'clsx'

export function Card({ className, ...props }) {
  return (
    <div
      className={clsx(
        'rounded-3xl border border-ink-200/80 bg-white/90 p-6 shadow-glow backdrop-blur dark:border-ink-700/70 dark:bg-ink-900/70',
        className,
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }) {
  return <div className={clsx('mb-4', className)} {...props} />
}

export function CardTitle({ className, ...props }) {
  return (
    <h3
      className={clsx(
        'text-xl font-semibold tracking-tight text-ink-900 dark:text-ink-100',
        className,
      )}
      {...props}
    />
  )
}

export function CardDescription({ className, ...props }) {
  return (
    <p className={clsx('text-sm text-ink-500 dark:text-ink-300', className)} {...props} />
  )
}

export function CardContent({ className, ...props }) {
  return <div className={clsx('space-y-4', className)} {...props} />
}
