import { Sidebar } from '@/components/linesheet/Sidebar'
import { TabMenu } from '@/components/linesheet/TabMenu'
import { LinesheetTitle } from '@/components/linesheet/LinesheetTitle'
import { WideCard } from '@/components/linesheet/WideCard'
import { Step1Details } from '@/components/linesheet/Step1Details'
import { Step2SelectedItems } from '@/components/linesheet/Step2SelectedItems'
import { mockItems } from '@/data/mockItems'

// Main screen — Figma frame 2661:337585 "Item added + hover banner"
// Outer 1920x1449 with 16px outer padding;
// Sidebar 256w + Wrap 1632w. Wrap has Tab menu (h-16) + Body (32px side padding).
export function LinesheetEditor() {
  return (
    <div className="min-h-screen bg-background p-4">
      {/* No min-w on the outer row — when the viewport narrows, the page stays
          stable and only the table container scrolls horizontally (per spec). */}
      <div className="flex gap-4">
        {/* Sidebar */}
        <Sidebar />

        {/* Main wrap */}
        <div className="flex flex-1 flex-col gap-3 min-w-0">
          <TabMenu />

          {/* Body */}
          <div className="flex flex-col gap-6 px-8 pt-4">
            <LinesheetTitle title="Spring Linesheet 2026" />
            <WideCard />
            <Step1Details />
            <Step2SelectedItems rows={mockItems} />
          </div>
        </div>
      </div>
    </div>
  )
}
