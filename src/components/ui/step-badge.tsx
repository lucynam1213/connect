import { cn } from '@/lib/utils'

// Step number circle — Figma: 32x32 round-full, badge-gray bg, 16px bold accent text
export function StepBadge({ number, className }: { number: number; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-badge-gray text-badge-gray-accent font-bold',
        'text-base leading-none',
        className
      )}
    >
      {number}
    </span>
  )
}
