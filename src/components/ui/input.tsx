import * as React from 'react'
import { cn } from '@/lib/utils'

// Input — Figma DS node 2985:221218
// Default: border #f2ede7, bg white, h-9, rounded-md, px-3 py-1, text-sm
// Focus  : border swaps to #737373 (--base-ring) — NOT a pink ring
// Disabled: bg-muted, border #f2ede7, opacity-50
export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'flex h-9 w-full rounded-md border border-elements-border bg-input px-3 py-1 text-sm text-foreground placeholder:text-muted-foreground transition-colors',
        'focus:border-ring focus:outline-none focus-visible:border-ring focus-visible:outline-none',
        'disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
)
Input.displayName = 'Input'
