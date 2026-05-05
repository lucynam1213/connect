import * as React from 'react'
import { Columns2, MoreHorizontal, LayoutGrid, List, CircleDashed, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToggleGroup } from './ToggleGroup'
import { ItemCard } from './ItemCard'
import { ItemFilterBar } from './ItemFilterBar'
import { Pagination } from '@/components/linesheet/Pagination'
import { mockProducts } from '@/data/mockProducts'
import { cn } from '@/lib/utils'

// Item page — list state (Figma 2733:219567).
// Layout per Figma:
//   1) Toggle bar OUTSIDE the card: status segmented (All / Active / Inactive) +
//      grid/list view switcher right.
//   2) Itemlist CARD (Figma frame 2733:219580) wraps:
//        • Select-all + Create Linesheet + ellipsis row
//        • Search + Price/Date/Sort filters + Clear All + Export bar
//        • Items grid
//        • Pagination footer
//      All in one bordered card so the controls visually belong to the same
//      table section.
type ActiveFilter = 'all' | 'active' | 'inactive'
type View = 'grid' | 'list'

export function ItemPageList() {
  const [activeFilter, setActiveFilter] = React.useState<ActiveFilter>('active')
  const [view, setView] = React.useState<View>('grid')
  const [selected, setSelected] = React.useState<Set<string>>(new Set())

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Toggle bar — kept outside the list card per Figma 2733:219577 */}
      <div className="flex items-center justify-between">
        <ToggleGroup
          ariaLabel="Filter by status"
          value={activeFilter}
          onChange={setActiveFilter}
          options={[
            { value: 'all', label: 'All', icon: CircleDashed },
            { value: 'active', label: 'Active', icon: Check },
            { value: 'inactive', label: 'Inactive', icon: CircleDashed },
          ]}
        />
        <ToggleGroup
          ariaLabel="View mode"
          iconOnly
          value={view}
          onChange={setView}
          options={[
            { value: 'grid', icon: LayoutGrid },
            { value: 'list', icon: List },
          ]}
        />
      </div>

      {/* Unified Itemlist card (Figma 2733:219580) — single bordered surface
          containing select row, filter bar, items grid, and pagination. */}
      <section className="flex flex-col gap-6 rounded-2xl border border-elements-border bg-card py-6">
        {/* Multi-select row */}
        <div className="flex items-center justify-between gap-3 px-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="h-4 w-4 rounded-[4px] border border-elements-border accent-primary"
              checked={selected.size > 0 && selected.size === mockProducts.length}
              onChange={(e) => {
                if (e.target.checked) setSelected(new Set(mockProducts.map((p) => p.id)))
                else setSelected(new Set())
              }}
            />
            <span className="text-sm leading-5 text-foreground">
              {selected.size > 0
                ? `Selected ${selected.size} ${selected.size === 1 ? 'item' : 'items'}`
                : `Select items to create a linesheet`}
            </span>
          </label>

          <div className="flex items-center gap-2">
            <Button variant="secondary" size="md">
              <Columns2 className="h-4 w-4 stroke-[1.5]" strokeWidth={1.5} />
              Create Linesheet
            </Button>
            <button
              type="button"
              aria-label="More actions"
              className={cn(
                'inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-transparent transition-colors',
                'hover:bg-muted',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20',
              )}
            >
              <MoreHorizontal className="h-4 w-4 stroke-[1.5]" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Tab menu + filter/search */}
        <ItemFilterBar />

        {/* Items grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-7 px-6 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {mockProducts.map((p) => (
            <ItemCard
              key={p.id}
              item={p}
              selected={selected.has(p.id)}
              onToggleSelect={toggleSelect}
            />
          ))}
        </div>

        {/* Pagination footer */}
        <Pagination />
      </section>
    </div>
  )
}
