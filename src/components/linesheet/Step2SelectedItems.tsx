import * as React from 'react'
import { Plus, Minus, Info } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { StepBadge } from '@/components/ui/step-badge'
import { Button } from '@/components/ui/button'
import { Tooltip } from '@/components/ui/tooltip'
import { ItemsTable, type ItemRow } from './ItemsTable'
import { Pagination } from './Pagination'

// Step 2. Selected Item — Figma node 2661:337631
// Title row + LinesheetTable + Section-footer.
// Add Special Price toggles a new editable column on the table.

// Tooltip content from Figma node 2661:337584 — verbatim, two paragraphs.
const SPECIAL_PRICE_TOOLTIP = (
  <>
    <p className="mb-1">
      To offer a special discount from the sale price for select buyers, you may add a
      special price.
    </p>
    <p>
      This special price applies only to items on this linesheet, and only buyers who
      access this linesheet will be able to purchase at that special price.
    </p>
  </>
)

export function Step2SelectedItems({ rows }: { rows: ItemRow[] }) {
  const [specialOn, setSpecialOn] = React.useState(false)
  const [specialPrices, setSpecialPrices] = React.useState<Record<string, string>>({})
  const setRowSpecialPrice = (rowId: string, next: string) =>
    setSpecialPrices((prev) => ({ ...prev, [rowId]: next }))

  return (
    <Card>
      <div className="flex w-full flex-col gap-4">
        {/* Title row */}
        <div className="flex items-center gap-3">
          <StepBadge number={2} />
          <h2 className="flex-1 text-base font-semibold leading-6 text-foreground">
            Selected Items
          </h2>

          {/*
            Special-price toggle cluster.
            Outer row uses gap-3 (12px); this cluster uses gap-1 (4px) so the info
            tooltip sits exactly 4px from the link button per spec.
          */}
          {/*
            Special-price toggle cluster.
            Spec: info tooltip sits 4px from the END OF THE TEXT (not 4px from
            the button container). The link variant adds px-3 by default; we
            zero out pr so text touches the button's right edge, and the cluster's
            gap-1 (4px) becomes 4px from text → icon.
          */}
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="link"
              size="sm"
              onClick={() => setSpecialOn((v) => !v)}
              aria-pressed={specialOn}
              className="pr-0"
            >
              {specialOn ? (
                <Minus className="h-4 w-4" strokeWidth={1.5} />
              ) : (
                <Plus className="h-4 w-4" strokeWidth={1.5} />
              )}
              {specialOn ? 'Remove Special Price' : 'Add Special Price'}
            </Button>
            <Tooltip content={SPECIAL_PRICE_TOOLTIP} maxWidth={243} offset={8}>
              <button
                type="button"
                aria-label="More info about special prices"
                className="flex h-3 w-3 items-center justify-center text-muted-foreground hover:text-foreground"
              >
                <Info className="h-3 w-3" strokeWidth={1.5} />
              </button>
            </Tooltip>
          </div>

          <Button variant="secondary" size="sm">
            <Plus className="h-4 w-4" strokeWidth={1.5} />
            Add Item
          </Button>
        </div>

        <ItemsTable
          rows={rows}
          specialPriceEnabled={specialOn}
          specialPrices={specialPrices}
          onSpecialPriceChange={setRowSpecialPrice}
        />

        <Pagination />
      </div>
    </Card>
  )
}
