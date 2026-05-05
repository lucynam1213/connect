import * as React from 'react'
import { Plus, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

// Add Item button + dropdown — Figma 2733:219688 (full-width CTA with Plus prefix)
// and Figma 2733:219674 (top-right header button, no Plus prefix).
// Trigger: primary fill (h-9, px-4), [optional Plus] + label + chevron-down/up.
// Menu  : bg-popover white, 1px border, rounded-md, p-1, shadow-md.
// Items : title (text-sm popover-foreground) + subtitle (text-2xs muted-fg).
//         Separator between items: 1px line.

export type AddItemMenuOption = {
  value: string
  label: string
  description: string
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  onSelect?: () => void
}

interface AddItemDropdownProps {
  triggerLabel: string
  options: AddItemMenuOption[]
  /** Match the menu width to the trigger when true (Figma "Add Your First Item" CTA). */
  fullWidthMenu?: boolean
  /** When false, omits the leading Plus icon (Figma top-right "Add New Item" button). */
  showLeadingIcon?: boolean
  className?: string
}

export function AddItemDropdown({
  triggerLabel,
  options,
  fullWidthMenu,
  showLeadingIcon = true,
  className,
}: AddItemDropdownProps) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const Chevron = open ? ChevronUp : ChevronDown

  return (
    <div ref={ref} className={cn('relative inline-flex flex-col gap-1', className)}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 shadow-xs transition-colors',
          'text-sm font-medium leading-5 text-primary-foreground',
          'hover:bg-primary/90 active:bg-primary/80',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20',
          fullWidthMenu && 'w-full',
        )}
      >
        {showLeadingIcon && (
          <Plus className="h-4 w-4 shrink-0 stroke-[1.5]" strokeWidth={1.5} />
        )}
        <span>{triggerLabel}</span>
        <Chevron className="h-4 w-4 shrink-0 stroke-[1.5]" strokeWidth={1.5} />
      </button>

      {open && (
        <ul
          role="menu"
          className={cn(
            'absolute top-full right-0 z-30 mt-1 flex flex-col gap-1 rounded-md border border-elements-border bg-card p-1 shadow-sm',
            fullWidthMenu ? 'left-0 w-full' : 'w-[222px]',
          )}
        >
          {options.map((opt, i) => (
            <React.Fragment key={opt.value}>
              {i > 0 && (
                <li role="separator" className="my-px h-px w-full bg-border" />
              )}
              <li>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    opt.onSelect?.()
                    setOpen(false)
                  }}
                  className="flex h-[50px] w-full items-center gap-2 rounded-sm px-4 text-left hover:bg-muted"
                >
                  <opt.icon className="h-4 w-4 shrink-0 stroke-[1.5] text-foreground" strokeWidth={1.5} />
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm leading-5 text-foreground">{opt.label}</p>
                    <p className="text-2xs leading-3 text-muted-foreground">{opt.description}</p>
                  </div>
                </button>
              </li>
            </React.Fragment>
          ))}
        </ul>
      )}
    </div>
  )
}
