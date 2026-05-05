import * as React from 'react'
import { cn } from '@/lib/utils'

// Toggle group — Figma 2733:219578 (text variant) and 2733:219579 (icon variant).
// White outer container, rounded-md, gap-px between items.
// Each toggle: h-9 (36), px-2.5, text-sm.
//   Inactive: bg-white, secondary text.
//   Active  : bg-secondary-button (#1f1f1f), white text, border-4 white inset
//             (the white inset creates the visual "lift" inside the white container).

export type ToggleOption<T extends string> = {
  value: T
  label?: string
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>
}

interface ToggleGroupProps<T extends string> {
  options: ToggleOption<T>[]
  value: T
  onChange: (value: T) => void
  /** When true, options render icon-only (Figma node 2733:219579 "Toggle Group"). */
  iconOnly?: boolean
  className?: string
  ariaLabel?: string
}

export function ToggleGroup<T extends string>({
  options,
  value,
  onChange,
  iconOnly,
  className,
  ariaLabel,
}: ToggleGroupProps<T>) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn(
        'inline-flex items-center gap-px rounded-md bg-white',
        className,
      )}
    >
      {options.map((opt) => {
        const isActive = opt.value === value
        const Icon = opt.icon
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(opt.value)}
            className={cn(
              'inline-flex h-9 items-center justify-center gap-2 rounded-md transition-colors',
              iconOnly ? 'px-3' : 'px-2.5',
              'border-4 border-white',
              isActive
                ? 'bg-secondary-button text-white font-semibold'
                : 'bg-white text-secondary font-medium hover:bg-muted',
              'text-sm leading-5',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20',
            )}
          >
            {Icon && <Icon className="h-4 w-4 shrink-0 stroke-[1.5]" strokeWidth={1.5} />}
            {!iconOnly && opt.label && <span>{opt.label}</span>}
          </button>
        )
      })}
    </div>
  )
}
