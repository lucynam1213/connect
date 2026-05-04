import * as React from 'react'
import { cn } from '@/lib/utils'

// Tooltip — Figma node 2661:337584 (Side=Bottom variant)
// bg #0a0a0a (popover-foreground), white text-xs (12/16), px-3 py-1.5, rounded-md
// 14.142px arrow centered on top, rotated -45°.
// Shown on hover OR keyboard focus of the trigger; hidden otherwise.
interface TooltipProps {
  children: React.ReactElement
  content: React.ReactNode
  /** Max width of tooltip body (Figma reference is 243px) */
  maxWidth?: number
  /** Pixels below the trigger */
  offset?: number
}

export function Tooltip({ children, content, maxWidth = 243, offset = 8 }: TooltipProps) {
  const [open, setOpen] = React.useState(false)
  const wrapRef = React.useRef<HTMLSpanElement>(null)

  const onEnter = () => setOpen(true)
  const onLeave = () => setOpen(false)

  return (
    <span
      ref={wrapRef}
      className="relative inline-flex"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocusCapture={onEnter}
      onBlurCapture={onLeave}
    >
      {children}
      {open && (
        <span
          role="tooltip"
          className={cn(
            'absolute left-1/2 z-30 -translate-x-1/2',
            'rounded-md bg-[#0a0a0a] px-3 py-1.5 text-xs leading-4 text-primary-foreground',
            'whitespace-pre-wrap text-left',
            'shadow-sm',
          )}
          style={{ top: `calc(100% + ${offset}px)`, width: maxWidth }}
        >
          {/* Arrow — same color as bg, rotated 45° */}
          <span
            aria-hidden
            className="absolute left-1/2 -top-1 h-2 w-2 -translate-x-1/2 rotate-45 bg-[#0a0a0a]"
          />
          <span className="relative block">{content}</span>
        </span>
      )}
    </span>
  )
}
