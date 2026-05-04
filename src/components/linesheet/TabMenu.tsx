import { ChevronLeft, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Tab menu — Figma node 2661:337588 / 2661:337522
// 1600 × 64 chip — rounded-2xl, sidebar bg, border, px-4 py-2.
// Spec: outer height MUST be exactly 64px.
//
// Sticky to the top of the viewport on scroll (top-4 matches the page's p-4
// outer padding). z-30 keeps it above body content when content scrolls
// underneath. The bg is opaque (sidebar token) so nothing bleeds through.
export function TabMenu() {
  return (
    <div className="sticky top-4 z-30 flex h-16 items-center justify-between rounded-2xl border border-border bg-sidebar px-4 py-2">
      <button className="flex items-center gap-1 text-sm font-semibold text-foreground hover:opacity-80">
        <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
        Back to Linesheet
      </button>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Monitor className="h-4 w-4" strokeWidth={1.5} />
          Preview
        </Button>
        <Button variant="outline" size="sm">
          Save
        </Button>
        <Button variant="badge-green" size="sm">
          Activate
        </Button>
      </div>
    </div>
  )
}
