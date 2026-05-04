import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// Pill badge — Figma uses rounded-full pill, 20px tall, px-2, text-2xs uppercase semibold
const badgeVariants = cva(
  'inline-flex h-5 items-center justify-center gap-1 rounded-full px-2 text-2xs font-semibold uppercase tracking-normal',
  {
    variants: {
      tone: {
        green: 'bg-badge-green text-badge-green-accent',
        red: 'bg-badge-red text-badge-red-accent',
        gray: 'bg-badge-gray text-badge-gray-accent',
        amber: 'bg-badge-amber text-badge-amber-accent',
      },
    },
    defaultVariants: { tone: 'gray' },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />
}
