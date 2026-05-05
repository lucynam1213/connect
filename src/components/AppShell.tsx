import * as React from 'react'
import { Sidebar, type SidebarRoute } from '@/components/linesheet/Sidebar'

// AppShell — common page chrome (sidebar + page padding) shared by every
// route. The active page renders inside `children`; AppShell owns the
// sidebar so navigation state stays out of individual page components.
export function AppShell({
  currentRoute,
  onNavigate,
  children,
}: {
  currentRoute: SidebarRoute
  onNavigate: (route: SidebarRoute) => void
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="flex gap-4">
        <Sidebar currentRoute={currentRoute} onNavigate={onNavigate} />
        <div className="flex flex-1 flex-col gap-3 min-w-0">{children}</div>
      </div>
    </div>
  )
}
