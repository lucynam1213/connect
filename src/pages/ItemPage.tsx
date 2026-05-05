import * as React from 'react'
import { ItemPageHeader } from '@/components/item/ItemPageHeader'
import { ItemPageEmpty } from '@/components/item/ItemPageEmpty'
import { ItemPageList } from '@/components/item/ItemPageList'
import { mockProducts } from '@/data/mockProducts'

// Item page — implements both Figma frames as one page that renders different
// bodies depending on whether the catalog has items:
//   2733-219665 → empty state (no items yet)
//   2733-219567 → list state (items present)
export function ItemPage() {
  // For demo purposes, default to the list state since it's the more visually
  // interesting variant. Designers can flip to the empty state via the small
  // demo control below the header.
  const [hasItems, setHasItems] = React.useState(mockProducts.length > 0)

  return (
    <div className="flex flex-col gap-6 px-6 pt-2">
      <ItemPageHeader subtitle="Manage your items for linesheets" />

      {/* Demo-only state toggle (not in Figma — left-padded hint so designers can review both states). */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Demo:</span>
        <button
          type="button"
          onClick={() => setHasItems(true)}
          className={
            'rounded-sm px-2 py-0.5 ' +
            (hasItems ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground')
          }
        >
          List state
        </button>
        <button
          type="button"
          onClick={() => setHasItems(false)}
          className={
            'rounded-sm px-2 py-0.5 ' +
            (!hasItems ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground')
          }
        >
          Empty state
        </button>
      </div>

      {hasItems ? <ItemPageList /> : <ItemPageEmpty />}
    </div>
  )
}
