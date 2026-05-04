import * as React from 'react'
import { Pencil, CornerDownLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

// LinesheetTitle — Figma 3046:310094 (editable state).
//
// Per Figma reference (node 3046:310115), the trailing button changes icon
// based on state:
//   Display mode → Pencil icon (click to enter edit mode)
//   Edit mode    → CornerDownLeft / Enter-arrow icon (click to save)
//
// Save can also be triggered by pressing Enter or blurring the input.
// Escape cancels and reverts the draft.
export function LinesheetTitle({ title = 'Spring Linesheet 2026' }: { title?: string }) {
  const [savedTitle, setSavedTitle] = React.useState(title)
  const [isEditing, setIsEditing] = React.useState(false)
  const [draft, setDraft] = React.useState(savedTitle)
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Keep saved title in sync if the prop ever changes.
  React.useEffect(() => {
    setSavedTitle(title)
  }, [title])

  const startEdit = () => {
    setDraft(savedTitle)
    setIsEditing(true)
  }
  const save = () => {
    const next = draft.trim() || savedTitle
    setSavedTitle(next)
    setIsEditing(false)
  }
  const cancel = () => {
    setDraft(savedTitle)
    setIsEditing(false)
  }

  // Autofocus the input + select-all when entering edit mode.
  React.useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [isEditing])

  return (
    <div className="flex h-9 items-center gap-2">
      {isEditing ? (
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              save()
            } else if (e.key === 'Escape') {
              e.preventDefault()
              cancel()
            }
          }}
          onBlur={save}
          aria-label="Linesheet title"
          className={cn(
            // Figma input — 373×36, text-sm 14px, white bg, border #f2ede7, rounded-md, px-3 py-1.
            'h-9 w-[373px] rounded-md border border-elements-border bg-input px-3 py-1',
            'text-sm text-foreground placeholder:text-muted-foreground transition-colors',
            'focus:border-ring focus:outline-none focus-visible:border-ring focus-visible:outline-none',
          )}
        />
      ) : (
        <h1 className="text-3xl font-bold leading-9 text-foreground">{savedTitle}</h1>
      )}
      <button
        type="button"
        aria-label={isEditing ? 'Save linesheet name' : 'Edit linesheet name'}
        onClick={isEditing ? save : startEdit}
        // Prevent the input's blur from firing first when this button is in
        // save mode — without this the blur handler would fire `save()` and
        // close edit mode before the click handler runs.
        onMouseDown={(e) => {
          if (isEditing) e.preventDefault()
        }}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
      >
        {isEditing ? (
          <CornerDownLeft className="h-4 w-4 text-foreground" strokeWidth={1.5} />
        ) : (
          <Pencil className="h-4 w-4 text-foreground" strokeWidth={1.5} />
        )}
      </button>
    </div>
  )
}
