type SpinnerProps = {
  label?: string
  className?: string
}

export const Spinner = ({
  label = 'Загрузка…',
  className = ''
}: SpinnerProps) => {
  return (
    <div
      role="status"
      aria-label={label}
      className={`inline-flex items-center justify-center ${className}`}
    >
      <span
        aria-hidden="true"
        className="
          size-8 rounded-full border-[3px]
          border-white/15 border-t-violet-400
          animate-spin motion-reduce:animate-none
        "
      />
      <span className="sr-only">{label}</span>
    </div>
  )
}
