import * as React from 'react'
import { Trash2, Copy, Check, Send } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { StepBadge } from '@/components/ui/step-badge'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const DESCRIPTION_MAX = 1000
// Demo URL for the "exists" state of the Share URL row. In a real app this
// would come from the saved linesheet record.
const SAMPLE_SHARE_URL = 'https://shopcord.com/linesheets/fw24-closeout-sale'

// Step 1. Linesheet details — Figma node 2661:337612
// Card with: Title (number badge + "Collection Overview") + 2-column Details
// Left col (732w): Description label + counter + textarea + share URL row
// Right col (732w): "Banner" label + dropfile zone (image with Remove overlay)
export function Step1Details() {
  const [description, setDescription] = React.useState('')

  return (
    <Card>
      <div className="flex w-full flex-col gap-4">
        <div className="flex items-center gap-3">
          <StepBadge number={1} />
          <h2 className="flex-1 text-base font-semibold leading-6 text-foreground">
            Collection Overview
          </h2>
        </div>

        <div className="flex items-start gap-6">
          {/* Form column */}
          <div className="flex flex-1 flex-col gap-2 self-stretch">
            {/* Header row — label left, live char counter right (Figma 2661:337554) */}
            <div className="flex items-center justify-between text-xs leading-4">
              <p className="font-medium text-secondary">Description</p>
              <p className="font-normal text-muted-foreground">
                {description.length}/{DESCRIPTION_MAX}
              </p>
            </div>
            <Textarea
              value={description}
              maxLength={DESCRIPTION_MAX}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description"
            />
            <ShareUrlRow url={SAMPLE_SHARE_URL} />
          </div>

          {/* Banner upload column */}
          <div className="flex flex-1 flex-col gap-1.5 h-[166px]">
            <p className="text-xs font-medium leading-4 text-secondary">Banner</p>
            <DropFile />
          </div>
        </div>
      </div>
    </Card>
  )
}

// Share URL row — Figma node 2661:337718.
//   url=null  → "Available after save" (existing fallback)
//   url=value → "Share URL <link> [Copy]   Send via SMS [Send]"
//
// On Copy click:
//   - copies the URL to the clipboard
//   - swaps the Copy icon for a Check icon as the confirmed state
//   - reverts to the Copy icon after ~1500ms
function ShareUrlRow({ url }: { url: string | null }) {
  const [copied, setCopied] = React.useState(false)
  const timeoutRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    }
  }, [])

  if (!url) {
    return (
      <div className="mt-2 flex items-baseline gap-2">
        <p className="text-xs font-medium leading-4 text-secondary whitespace-nowrap">
          Share URL
        </p>
        <p className="text-sm leading-none text-muted-foreground whitespace-nowrap">
          Available after save
        </p>
      </div>
    )
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      // Clipboard may be blocked in non-secure contexts; still proceed
      // so the user gets visual feedback.
    }
    // Small delay before flipping to the Check icon — gives the click a
    // perceptible "round-trip" feel, then revert after the confirmation
    // duration.
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => {
      setCopied(true)
      timeoutRef.current = window.setTimeout(() => setCopied(false), 1500)
    }, 200)
  }

  const handleSendSms = () => {
    // Placeholder — in production this would open the SMS-share flow.
    window.open(`sms:?&body=${encodeURIComponent(url)}`, '_self')
  }

  return (
    <div className="mt-2 flex items-start gap-2 min-w-0">
      <p className="text-xs font-medium leading-4 text-foreground whitespace-nowrap">
        Share URL
      </p>

      {/* Copy URL cluster — gap-1 between link + copy button */}
      <div className="flex min-w-0 items-start gap-1">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium leading-4 text-[#3b82f6] underline truncate hover:opacity-80"
        >
          {url}
        </a>
        <button
          type="button"
          aria-label={copied ? 'Copied to clipboard' : 'Copy share URL'}
          aria-live="polite"
          onClick={handleCopy}
          className={cn(
            'flex h-5 w-5 shrink-0 items-center justify-center rounded-md p-0.5 transition-colors',
            'hover:bg-muted',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20',
            copied ? 'text-badge-green-accent' : 'text-foreground',
          )}
        >
          {copied ? (
            <Check className="h-4 w-4" strokeWidth={2} />
          ) : (
            <Copy className="h-4 w-4" strokeWidth={1.5} />
          )}
        </button>
      </div>

      {/* Send via SMS — text + icon button cluster, gap-1 */}
      <button
        type="button"
        onClick={handleSendSms}
        className={cn(
          'flex shrink-0 items-start gap-1 rounded-md transition-colors',
          'hover:opacity-80',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20',
        )}
      >
        <span className="text-xs font-medium leading-4 text-foreground underline whitespace-nowrap">
          Send via SMS
        </span>
        <span className="flex h-5 w-5 items-center justify-center rounded-md p-0.5 text-foreground">
          <Send className="h-4 w-4" strokeWidth={1.5} />
        </span>
      </button>
    </div>
  )
}

// dropfile — Figma 2661:337630
// Container: muted bg, border, rounded-md, full-bleed.
// Image: fixed 334×120, centered (object-cover).
// Remove button: ABSOLUTE OVERLAY — centered horizontally + vertically over the image.
function DropFile() {
  return (
    <div className="relative flex flex-1 w-full items-center justify-center overflow-hidden rounded-md border border-elements-border bg-muted">
      <div className="relative h-[120px] w-[334px] overflow-hidden rounded-xs">
        <img
          src="/figma/banner.jpg"
          alt="Linesheet banner"
          className="h-full w-full object-cover"
        />
        {/* Remove button — centered overlay on top of the image */}
        <Button
          variant="outline"
          size="sm"
          className={cn(
            'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
            'bg-card shadow-xs',
          )}
        >
          <Trash2 className="h-4 w-4" strokeWidth={1.5} />
          Remove
        </Button>
      </div>
    </div>
  )
}
