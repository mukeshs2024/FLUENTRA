import clsx from 'clsx'

export default function Progress({ value = 0, className }) {
  return (
    <div
      className={clsx('h-2 w-full rounded-full bg-ink-200/70 dark:bg-ink-800', className)}
    >
      <div
        className="h-full rounded-full bg-lagoon-500 transition"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}
