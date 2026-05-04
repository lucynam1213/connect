import * as React from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

// Dropdown — trigger styled like an Input (DS focus pattern: border swaps to #737373)
// Menu (popover): bg-card, 1px elements-border, rounded-md, shadow-sm
// Selected item shows a check.
export type DropdownOption = { value: string; label: string }

interface DropdownProps {
  options: DropdownOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function Dropdown({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  disabled,
  className,
}: DropdownProps) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!open) return
    function onDocClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const selected = options.find((o) => o.value === value)

  return (
    <div ref={ref} className={cn('relative w-full', className)}>
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex h-9 w-full items-center gap-2 rounded-md border border-elements-border bg-input px-3 py-1 text-sm text-foreground transition-colors',
          'focus:border-ring focus:outline-none focus-visible:border-ring focus-visible:outline-none',
          'hover:bg-muted',
          'disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-50',
          open && 'border-ring',
        )}
      >
        <span className={cn('flex-1 truncate text-left', !selected && 'text-muted-foreground')}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-muted-foreground transition-transform',
            open && 'rotate-180',
          )}
          strokeWidth={1.5}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full z-20 mt-1 max-h-60 overflow-auto rounded-md border border-elements-border bg-card p-1 shadow-sm"
        >
          {options.map((opt) => {
            const isSelected = opt.value === value
            return (
              <li key={opt.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(opt.value)
                    setOpen(false)
                  }}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm text-foreground',
                    'hover:bg-muted',
                  )}
                >
                  <span className="flex-1 truncate">{opt.label}</span>
                  {isSelected && <Check className="h-4 w-4 text-primary" strokeWidth={2} />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
