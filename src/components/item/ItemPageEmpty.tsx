import { Signpost, Plus, Upload } from 'lucide-react'
import { AddItemDropdown } from './AddItemDropdown'

// Item page — empty state (Figma 2733:219665 → 2733:219683).
// Layout per Figma:
//   • Icon container: 96×96, rounded-[24px], bg-sidebar-accent (light pink)
//     with a 48×48 Signpost icon centered, colored sidebar-accent-foreground (#e11d74)
//   • Heading: "No items added" (text-xl 20/28 bold, tracking -0.84px)
//   • Body: 2-line subhead, secondary color
//   • CTA: 222w "Add Your First Item" primary button with dropdown
//     (options: "Add Single Item" / "Upload .xlsx file")
export function ItemPageEmpty() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-16">
      {/* Icon container — light-pink rounded-[24px] tile with Signpost in primary pink */}
      <div className="flex h-24 w-24 items-center justify-center rounded-[24px] bg-sidebar-accent">
        <Signpost
          className="h-12 w-12 stroke-[1.5] text-sidebar-accent-foreground"
          strokeWidth={1.5}
        />
      </div>

      <div className="flex flex-col items-center gap-3 text-center">
        <h3 className="text-xl font-bold leading-7 tracking-[-0.84px] text-foreground">
          No items added
        </h3>
        <p className="text-sm leading-normal text-secondary">
          Add your first item to start building your linesheet and
          <br />
          create linesheet to share with buyers.
        </p>
      </div>

      <AddItemDropdown
        triggerLabel="Add Your First Item"
        className="w-[222px]"
        fullWidthMenu
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
