import { Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// Item card — Figma 2733:219591.
// Outer: 1px elements-border, rounded-md, gap-3, p-px.
// Thumbnail: 348h with rounded-md, checkbox top-left (16×16), Active badge bottom-left.
// Body: p-3 (with no top padding so it hugs the thumbnail), Style # / Wholesale + Sale prices /
//       Color · 2 values / Waist · 5 values / In Stock badge.

export type ItemCardData = {
  id: string
  styleNumber: string
  thumbnail: string
  wholesale: string
  sale: string
  options: { label: string; count: number }[]
  status: 'active' | 'draft' | 'archived'
  availability?: { label: string; tone: 'green' | 'red' | 'amber' | 'gray' }
}

export function ItemCard({
  item,
  selected,
  onToggleSelect,
}: {
  item: ItemCardData
  selected?: boolean
  onToggleSelect?: (id: string) => void
}) {
  return (
    <div className="flex flex-col gap-3 rounded-md border border-border bg-card p-px overflow-hidden">
      {/* Thumbnail */}
      <div className="relative h-[348px] w-full overflow-hidden rounded-md">
        <img
          src={item.thumbnail}
          alt={item.styleNumber}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Checkbox top-left */}
        <button
          type="button"
          aria-label={selected ? 'Deselect item' : 'Select item'}
          aria-pressed={!!selected}
          onClick={(e) => {
            e.stopPropagation()
            onToggleSelect?.(item.id)
          }}
          className={cn(
            'absolute left-3 top-3 flex h-4 w-4 items-center justify-center rounded-[4px] border border-elements-border transition-colors',
            selected ? 'bg-primary text-primary-foreground border-primary' : 'bg-input',
          )}
        >
          {selected && <Check className="h-3 w-3 stroke-[2.5]" strokeWidth={2.5} />}
        </button>

        {/* Status badge bottom-left */}
        {item.status === 'active' && (
          <Badge tone="green" className="absolute left-3 bottom-3">
            Active
          </Badge>
        )}
        {item.status === 'draft' && (
          <Badge tone="gray" className="absolute left-3 bottom-3">
            Draft
          </Badge>
        )}
        {item.status === 'archived' && (
          <Badge tone="amber" className="absolute left-3 bottom-3">
            Archived
          </Badge>
        )}
      </div>

      {/* Body — pt-0 so it hugs the thumbnail; px-3 / pb-3 per Figma */}
      <div className="flex flex-col gap-2 px-3 pb-3">
        <p className="text-sm leading-5 text-foreground">{item.styleNumber}</p>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <p className="text-xs leading-4 text-muted-foreground">Wholesale</p>
            <p className="text-sm font-semibold leading-5 text-foreground">{item.wholesale}</p>
          </div>
          <div className="flex w-full items-center gap-2">
            <p className="text-xs leading-4 text-muted-foreground">Sale</p>
            <p className="text-sm font-semibold leading-5 text-destructive">{item.sale}</p>
          </div>
        </div>

        <div className="flex flex-col">
          {item.options.map((opt) => (
            <div key={opt.label} className="flex items-center gap-0.5 text-xs leading-4">
              <span className="font-medium text-foreground">{opt.label}</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-secondary">{opt.count} values</span>
            </div>
          ))}
        </div>

        {item.availability && (
          <div className="flex">
            <Badge tone={item.availability.tone}>{item.availability.label}</Badge>
          </div>
        )}
      </div>
    </div>
  )
}
