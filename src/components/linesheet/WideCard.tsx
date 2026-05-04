import * as React from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Dropdown } from '@/components/ui/dropdown'
import { Calendar } from './Calendar'
import { cn } from '@/lib/utils'

// wide-card(02) — Figma node 2661:337611
// 7 cells in a row sharing edges (first rounded-l-2xl, last rounded-r-2xl).
// Each cell: bg-card, border, p-6; label text-xs medium secondary; content gap-3.

const accessOptions = [
  { value: 'public', label: 'Public' },
  { value: 'password', label: 'Password Required' },
  { value: 'selected', label: 'Selected Buyers' },
]

type DateField = 'start' | 'end'

export function WideCard() {
  const [access, setAccess] = React.useState('public')
  const [openCal, setOpenCal] = React.useState<DateField | null>(null)
  const [dates, setDates] = React.useState<Record<DateField, string>>({ start: '', end: '' })

  // Refs to anchor the calendar popover to the actual date input position
  const startRef = React.useRef<HTMLDivElement>(null)
  const endRef = React.useRef<HTMLDivElement>(null)
  const wrapRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!openCal) return
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpenCal(null)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenCal(null)
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [openCal])

  return (
    <div ref={wrapRef} className="relative flex w-full items-stretch">
      <Cell first>
        <Label>Status</Label>
        <div className="flex h-9 items-center">
          <Badge tone="red">Inactive</Badge>
        </div>
      </Cell>

      <Cell>
        <Label>Access Type</Label>
        <Dropdown options={accessOptions} value={access} onChange={setAccess} />
      </Cell>

      <Cell>
        <Label>Start Date</Label>
        <DateInput
          ref={startRef}
          value={dates.start}
          onCalendarClick={() => setOpenCal((c) => (c === 'start' ? null : 'start'))}
          onChange={(v) => setDates((d) => ({ ...d, start: v }))}
          active={openCal === 'start'}
        />
      </Cell>

      <Cell>
        <Label>End Date</Label>
        <DateInput
          ref={endRef}
          value={dates.end}
          onCalendarClick={() => setOpenCal((c) => (c === 'end' ? null : 'end'))}
          onChange={(v) => setDates((d) => ({ ...d, end: v }))}
          active={openCal === 'end'}
        />
      </Cell>

      <Cell>
        <Label>Item Count</Label>
        <Value>-</Value>
      </Cell>
      <Cell>
        <Label>Linesheet Opened</Label>
        <Value>-</Value>
      </Cell>
      <Cell last>
        <Label>Orders</Label>
        <Value>-</Value>
      </Cell>

      {/* Calendar popover anchored to whichever date input is open. */}
      {/* Spec: 4px below the date picker, left-aligned to its left edge. */}
      {openCal && (
        <CalendarPopover
          anchorRef={openCal === 'start' ? startRef : endRef}
          containerRef={wrapRef}
        />
      )}
    </div>
  )
}

function CalendarPopover({
  anchorRef,
  containerRef,
}: {
  anchorRef: React.RefObject<HTMLDivElement | null>
  containerRef: React.RefObject<HTMLDivElement | null>
}) {
  const [pos, setPos] = React.useState<{ left: number; top: number } | null>(null)
  React.useLayoutEffect(() => {
    if (!anchorRef.current || !containerRef.current) return
    const a = anchorRef.current.getBoundingClientRect()
    const c = containerRef.current.getBoundingClientRect()
    setPos({
      // 4px below the date input
      top: a.bottom - c.top + 4,
      // left-aligned to the date input's left edge
      left: a.left - c.left,
    })
  }, [anchorRef, containerRef])

  if (!pos) return null
  return (
    <div className="absolute z-20" style={{ top: pos.top, left: pos.left }}>
      <Calendar />
    </div>
  )
}

// — atoms —
function Cell({
  children,
  first,
  last,
}: {
  children: React.ReactNode
  first?: boolean
  last?: boolean
}) {
  return (
    <div
      className={cn(
        'flex flex-1 flex-col gap-3 border border-elements-border bg-card p-6 min-w-0',
        first && 'rounded-l-2xl',
        last && 'rounded-r-2xl',
        !first && 'border-l-0',
      )}
    >
      {children}
    </div>
  )
}
function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-medium leading-4 text-secondary">{children}</p>
}
function Value({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex h-9 items-center text-sm font-semibold text-foreground">{children}</p>
  )
}

const DateInput = React.forwardRef<
  HTMLDivElement,
  {
    value: string
    onChange: (v: string) => void
    onCalendarClick: () => void
    active?: boolean
  }
>(function DateInput({ value, onChange, onCalendarClick, active }, ref) {
  return (
    <div ref={ref} className="relative flex h-9 items-center">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="mm/dd/yyyy"
        className={cn(
          'h-9 w-full rounded-md border border-elements-border bg-input pl-3 pr-9 text-sm text-foreground placeholder:text-muted-foreground transition-colors',
          'focus:border-ring focus:outline-none focus-visible:border-ring focus-visible:outline-none',
          active && 'border-ring',
        )}
      />
      <button
        type="button"
        aria-label="Open calendar"
        onClick={onCalendarClick}
        className="absolute right-1 flex h-7 w-7 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
      >
        <CalendarIcon className="h-4 w-4" strokeWidth={1.5} />
      </button>
    </div>
  )
})
