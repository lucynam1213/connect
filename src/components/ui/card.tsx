import * as React from 'react'
import { cn } from '@/lib/utils'

// Card — Figma: bg-card, 1px elements-border, rounded-2xl, p-6
export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-2xl border border-elements-border bg-card p-6',
        className
      )}
      {...props}
    />
  )
)
Card.displayName = 'Card'
