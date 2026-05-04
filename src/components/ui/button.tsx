import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// Button states per Figma "Button interaction" frame (node 2970:77608).
// Pattern observed in Figma:
//   Default = base color
//   Hover   = ~10% black overlay on filled / muted-tint on ghost-outline
//   Pressed = ~20% black overlay (here: darker brightness)
//   Disabled = opacity-30 (NOT 50% — Figma uses 0.3 for buttons specifically)
// The Activate variant is special: Hover transforms light-pill → solid fill.
//
// Focus is intentionally NOT a pink ring (Figma uses gray border swap on
// inputs); for buttons we keep a subtle ring only for keyboard a11y.
const buttonVariants = cva(
  [
    'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium gap-2 transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-1 focus-visible:ring-offset-background',
    'disabled:opacity-30 disabled:pointer-events-none disabled:cursor-not-allowed',
  ].join(' '),
  {
    variants: {
      variant: {
        // Primary filled (pink) — used for primary CTAs
        default: [
          'bg-primary text-primary-foreground shadow-xs',
          'hover:bg-primary/90',
          'active:bg-primary/80',
        ].join(' '),
        // Secondary filled (black) — "Add Item"
        secondary: [
          'bg-secondary-button text-secondary-foreground shadow-xs',
          'hover:bg-secondary-button/90',
          'active:bg-secondary-button/80',
        ].join(' '),
        // Outline (white bg, gray border) — "Save"
        outline: [
          'bg-input border border-secondary text-foreground',
          'hover:bg-muted',
          'active:bg-muted/70',
        ].join(' '),
        // Ghost (transparent) — "Preview", icon buttons
        ghost: [
          'bg-transparent text-foreground',
          'hover:bg-muted',
          'active:bg-muted/70',
        ].join(' '),
        // Link (text-only with underline) — "Add Special Price"
        link: [
          'bg-transparent text-primary underline underline-offset-2 px-3',
          'hover:opacity-80',
          'active:opacity-70',
        ].join(' '),
        // Activate green pill → Hover flips to solid green
        'badge-green': [
          'bg-badge-green border border-badge-green-accent text-badge-green-accent',
          'hover:bg-badge-green-accent hover:text-secondary-foreground hover:border-badge-green-accent',
          'active:brightness-90',
        ].join(' '),
      },
      size: {
        sm: 'h-8 px-3 py-2 text-xs',
        md: 'h-9 px-4 py-2 text-sm',
        icon: 'h-8 w-8 p-0',
        'icon-sm': 'h-6 w-6 p-0',
        'icon-xs': 'h-[22px] w-[22px] p-0 rounded-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
)
Button.displayName = 'Button'

export { buttonVariants }
