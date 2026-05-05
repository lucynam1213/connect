import { Plus, Upload } from 'lucide-react'
import { AddItemDropdown } from './AddItemDropdown'

// Item page header — Figma 2733:219668 (empty state) / 2733:219570 (list state).
// Both states use the same header:
//   Left  : "Items" h1 (text-3xl bold, tracking -0.84px) + subtitle (text-base secondary)
//   Right : Primary "Add New Item" button with ChevronDown (opens dropdown)
//
// NOTE — the previous "Welcome back, Bibi" was the LinesheetEditor header.
// The Item page uses a simpler section header per Figma.
export function ItemPageHeader({
  subtitle = 'Manage your items for linesheets',
}: {
  subtitle?: string
}) {
  return (
    <div className="flex items-center justify-between gap-6">
      <div className="flex flex-col gap-2 min-w-0">
        <h1 className="text-3xl font-bold leading-9 tracking-[-0.84px] text-foreground whitespace-nowrap">
          Items
        </h1>
        <p className="text-base leading-6 text-secondary whitespace-nowrap">{subtitle}</p>
      </div>
      <AddItemDropdown
        triggerLabel="Add New Item"
        showLeadingIcon={false}
        options={[
          {
            value: 'single',
            label: 'Add Single Item',
            description: 'Fill in details manually',
            icon: Plus,
          },
          {
            value: 'xlsx',
            label: 'Upload .xlsx file',
            description: 'Import multiple items at once',
            icon: Upload,
          },
        ]}
      />
    </div>
  )
}
