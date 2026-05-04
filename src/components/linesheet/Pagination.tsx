import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

// Section-footer pagination — Figma 2661:337681
// px-6 (24), h-9 (36); items rounded-md, active gets muted bg + white border + shadow-xs
export function Pagination() {
  return (
    <div className="flex items-center justify-end px-6">
      <div className="flex items-center gap-1">
        <PageItem className="pl-2.5 pr-4 gap-1">
          <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
          Previous
        </PageItem>
        <PageNumber>1</PageNumber>
        <PageNumber active>2</PageNumber>
        <PageNumber>3</PageNumber>
        <button className="flex h-9 w-9 items-center justify-center rounded-md p-2.5">
          <MoreHorizontal className="h-4 w-4 text-foreground" strokeWidth={1.5} />
        </button>
        <PageItem className="pl-4 pr-2.5 gap-1 text-muted-foreground">
          Next
          <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
        </PageItem>
      </div>
    </div>
  )
}

function PageItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <button
      className={cn(
        'flex h-9 items-center justify-center rounded-md py-2 text-sm font-medium leading-5 text-foreground hover:bg-muted',
        className
      )}
    >
      {children}
    </button>
  )
}

function PageNumber({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <button
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium leading-5 text-foreground',
        active
          ? 'bg-muted border border-input shadow-xs'
          : 'hover:bg-muted'
      )}
    >
      {children}
    </button>
  )
}
