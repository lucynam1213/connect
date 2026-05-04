import * as React from 'react'
import { cn } from '@/lib/utils'

// Textarea — same focus/disabled pattern as Input (DS node 2985:221218)
export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-[134px] w-full resize-none rounded-md border border-elements-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-colors',
        'focus:border-ring focus:outline-none focus-visible:border-ring focus-visible:outline-none',
        'disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
)
Textarea.displayName = 'Textarea'
