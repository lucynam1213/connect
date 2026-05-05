import { Search, ChevronDown, Calendar as CalendarIcon, ArrowUpDown, Download } from 'lucide-react'
import { cn } from '@/lib/utils'

// Tab menu + Filter/search — Figma 2733:219589.
// Search input (320–420w), Price range / Date range / Sort filter dropdowns,
// Clear All link, and right-aligned Export dropdown.
// All dropdowns are styled identically: outline button, h-9, px-4, rounded-md,
// border elements-border, secondary text, gap-2 with chevron-down on the right
// (and an optional leading icon).
export function ItemFilterBar() {
  return (
    <div className="flex items-center justify-between gap-2 px-6">
      <div className="flex flex-1 items-start gap-2 min-w-0">
        {/* Search input */}
        <div className="flex h-9 w-[320px] max-w-[420px] items-center gap-1 rounded-md border border-elements-border bg-input px-3 py-1">
          <Search className="h-4 w-4 shrink-0 text-secondary stroke-[1.5]" strokeWidth={1.5} />
          <input
            type="search"
            placeholder="Search by name, tag, style#..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>

        <FilterButton label="$ Price range" />
        <FilterButton label="Date range" leadingIcon={CalendarIcon} />
        <FilterButton label="Sort" leadingIcon={ArrowUpDown} />

        {/* Clear All — link button */}
        <button
          type="button"
          className="flex h-9 items-center justify-center rounded-md px-0.5 py-2 text-sm font-medium text-secondary hover:opacity-80"
        >
          Clear All
        </button>
      </div>

      {/* Right-aligned Export dropdown */}
      <FilterButton label="Export" leadingIcon={Download} />
    </div>
  )
}

function FilterButton({
  label,
  leadingIcon: LeadingIcon,
}: {
  label: string
  leadingIcon?: React.ComponentType<{ className?: string; strokeWidth?: number }>
}) {
  return (
    <button
      type="button"
      className={cn(
        'flex h-9 shrink-0 items-center justify-center gap-2 rounded-md border border-elements-border bg-input px-4 py-2 transition-colors',
        'text-sm font-medium leading-5 text-secondary',
        'hover:bg-muted',
        'focus-visible:outline-none focus-visible:border-ring',
      )}
    >
      {LeadingIcon && <LeadingIcon className="h-4 w-4 shrink-0 stroke-[1.5]" strokeWidth={1.5} />}
      <span>{label}</span>
      <ChevronDown className="h-4 w-4 shrink-0 text-secondary stroke-[1.5]" strokeWidth={1.5} />
    </button>
  )
}
