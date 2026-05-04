import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

// Calendar / Basic — Figma 2661:337682
// bg-card, rounded-lg, border, p-3, shadow-sm
// Header row + 7 day-headers + 6 weeks of 7-day buttons (32x32)

const dayHeaders = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

// January 2025 grid — matches the Figma snapshot exactly
type Cell = { num: number; variant: 'outside' | 'default' | 'current' | 'selected' }

const weeks: Cell[][] = [
  [
    { num: 30, variant: 'outside' },
    { num: 1, variant: 'default' },
    { num: 2, variant: 'default' },
    { num: 3, variant: 'default' },
    { num: 4, variant: 'default' },
    { num: 5, variant: 'default' },
    { num: 6, variant: 'default' },
  ],
  [
    { num: 7, variant: 'default' },
    { num: 8, variant: 'default' },
    { num: 9, variant: 'default' },
    { num: 10, variant: 'selected' },
    { num: 11, variant: 'default' },
    { num: 12, variant: 'default' },
    { num: 13, variant: 'default' },
  ],
  [
    { num: 14, variant: 'default' },
    { num: 15, variant: 'default' },
    { num: 16, variant: 'default' },
    { num: 17, variant: 'default' },
    { num: 18, variant: 'default' },
    { num: 19, variant: 'default' },
    { num: 20, variant: 'default' },
  ],
  [
    { num: 21, variant: 'default' },
    { num: 22, variant: 'default' },
    { num: 23, variant: 'default' },
    { num: 24, variant: 'current' },
    { num: 25, variant: 'default' },
    { num: 26, variant: 'default' },
    { num: 27, variant: 'default' },
  ],
  [
    { num: 28, variant: 'default' },
    { num: 29, variant: 'default' },
    { num: 30, variant: 'default' },
    { num: 31, variant: 'default' },
    { num: 1, variant: 'outside' },
    { num: 2, variant: 'outside' },
    { num: 3, variant: 'outside' },
  ],
]

export function Calendar() {
  return (
    <div className="flex w-[248px] flex-col gap-4 rounded-lg border border-elements-border bg-card p-3 shadow-sm">
      {/* Header */}
      <div className="relative flex h-8 items-center justify-center">
        <button className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-md p-2.5 hover:bg-muted">
          <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
        </button>
        <p className="text-sm font-medium leading-5 text-foreground">January 2025</p>
        <button className="absolute right-0 flex h-8 w-8 items-center justify-center rounded-md p-2.5 hover:bg-muted">
          <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>

      {/* Month grid */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          {dayHeaders.map((d) => (
            <div key={d} className="flex h-[21px] w-8 items-center justify-center rounded-md">
              <span className="text-xs leading-4 text-muted-foreground">{d}</span>
            </div>
          ))}
        </div>
        {weeks.map((week, i) => (
          <div key={i} className="flex items-center">
            {week.map((c, j) => (
              <DayCell key={`${i}-${j}`} cell={c} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function DayCell({ cell }: { cell: Cell }) {
  const base = 'flex h-8 w-8 items-center justify-center rounded-md text-sm leading-5'
  if (cell.variant === 'selected')
    return (
      <button className={cn(base, 'bg-primary text-primary-foreground')}>{cell.num}</button>
    )
  if (cell.variant === 'current')
    return <button className={cn(base, 'bg-muted text-foreground')}>{cell.num}</button>
  if (cell.variant === 'outside')
    return <span className={cn(base, 'text-muted-foreground')}>{cell.num}</span>
  return (
    <button className={cn(base, 'text-foreground hover:bg-muted')}>{cell.num}</button>
  )
}
