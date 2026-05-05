import * as React from 'react'
import { AppShell } from '@/components/AppShell'
import { type SidebarRoute } from '@/components/linesheet/Sidebar'
import { LinesheetEditor } from './pages/LinesheetEditor'
import { ItemPage } from './pages/ItemPage'

export default function App() {
  // Simple state-based routing. Sidebar dispatches `onNavigate(route)` and
  // App swaps the active page. No router library needed for this scope.
  const [route, setRoute] = React.useState<SidebarRoute>('linesheet')

  return (
    <AppShell currentRoute={route} onNavigate={setRoute}>
      {route === 'linesheet' && <LinesheetEditor />}
      {route === 'item' && <ItemPage />}
      {/* Other routes are placeholders — show a friendly empty state. */}
      {route !== 'linesheet' && route !== 'item' && (
        <div className="flex flex-1 items-center justify-center px-6 py-16 text-sm text-muted-foreground">
          {route.charAt(0).toUpperCase() + route.slice(1)} page — not implemented yet.
        </div>
      )}
    </AppShell>
  )
}
