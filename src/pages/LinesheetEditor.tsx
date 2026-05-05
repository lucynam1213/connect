import { TabMenu } from '@/components/linesheet/TabMenu'
import { LinesheetTitle } from '@/components/linesheet/LinesheetTitle'
import { WideCard } from '@/components/linesheet/WideCard'
import { Step1Details } from '@/components/linesheet/Step1Details'
import { Step2SelectedItems } from '@/components/linesheet/Step2SelectedItems'
import { mockItems } from '@/data/mockItems'

// Main screen — Figma frame 2661:337585 "Item added + hover banner".
// AppShell provides the outer page padding + sidebar; this page only owns
// its tab menu + body content.
export function LinesheetEditor() {
  return (
    <>
      <TabMenu />
      <div className="flex flex-col gap-6 px-8 pt-4">
        <LinesheetTitle title="Spring Linesheet 2026" />
        <WideCard />
        <Step1Details />
        <Step2SelectedItems rows={mockItems} />
      </div>
    </>
  )
}
