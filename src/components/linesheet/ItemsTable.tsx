import * as React from 'react'
import { Eye, EyeOff, ChevronDown, Trash2, Info } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Tooltip } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

// Item table — Figma 2661:337640 LinesheetTable / 2661:337641 Table(03-linehshet)
// + expanded row (Figma 2733:209704). Header h-9, body h-16, sub-row h-12.
//
// Layout strategy:
//  - The table has a fixed minimum width (TABLE_MIN_W) so columns never collapse.
//  - The wrapper enables horizontal scroll only when the viewport is narrower than
//    the minimum, keeping the page layout stable.
//  - Item Name uses flex-1 with min-w-[184px] so it grows to fill extra space at
//    wide viewports but never shrinks below its Figma minimum.
//  - Special Price column is 132px wide (matching the other price columns) so the
//    header label + eye icon never overflow into MSRP. The 81px input inside is
//    left-aligned per spec.
const TABLE_MIN_W = 1488

export type ExpansionType = 'openpack-1' | 'openpack-1+2' | 'prepack-1' | 'prepack-2'

export interface ExpansionConfig {
  type: ExpansionType
  /** Date shown in the Availability cell of each sub-row (per Figma). */
  date: string
  /** Sub-row data — meaning depends on type. */
  rows: ExpansionSubRow[]
  /** Pack-breakdown tooltip (only used by prepack-2). */
  packBreakdown?: { packSize: string; values: string }
}

export type ExpansionSubRow = {
  /** Visible Option1 (col 3): primary value (size for openpack, color for prepack-2). */
  option1?: string
  /** Visible Option2 (col 4): secondary value (color for openpack-1+2). */
  option2?: string
}

export type AvailabilityBadge = {
  label: string
  tone: 'green' | 'red' | 'amber' | 'gray'
}

export type ItemRow = {
  id: string
  name: string
  thumbnail: string
  styleNumber: string
  option1?: { value: string; count?: number }
  option2?: { value: string; count?: number }
  /** One or two availability badges per Figma reference (2661:337577 etc). */
  availability: AvailabilityBadge[]
  wsPrice: string
  salePrice: string
  msrp: string
  expansion?: ExpansionConfig
}

// WS Price is intentionally NOT toggleable per spec — it must always remain
// visible. Keep it out of the union so we can't accidentally call toggle('wsPrice').
type PriceCol = 'salePrice' | 'specialPrice' | 'msrp'

const OPTION_MAX_CHARS = 15
const truncate = (s: string) =>
  s.length > OPTION_MAX_CHARS ? s.slice(0, OPTION_MAX_CHARS - 1) + '…' : s

interface ItemsTableProps {
  rows: ItemRow[]
  specialPriceEnabled: boolean
  specialPrices: Record<string, string>
  onSpecialPriceChange: (rowId: string, next: string) => void
}

export function ItemsTable({
  rows,
  specialPriceEnabled,
  specialPrices,
  onSpecialPriceChange,
}: ItemsTableProps) {
  const [hidden, setHidden] = React.useState<Set<PriceCol>>(new Set())
  const toggle = (col: PriceCol) =>
    setHidden((prev) => {
      const next = new Set(prev)
      if (next.has(col)) next.delete(col)
      else next.add(col)
      return next
    })

  React.useEffect(() => {
    if (!specialPriceEnabled && hidden.has('specialPrice')) {
      setHidden((prev) => {
        const next = new Set(prev)
        next.delete('specialPrice')
        return next
      })
    }
  }, [specialPriceEnabled, hidden])

  // Single-open expansion semantics.
  const [expandedId, setExpandedId] = React.useState<string | null>(null)
  const toggleExpanded = (id: string) =>
    setExpandedId((cur) => (cur === id ? null : id))

  return (
    <div className="w-full table-scroll">
      <div style={{ minWidth: TABLE_MIN_W }}>
        {/* Header */}
        <div className="flex items-center">
        <Th className="flex-1 min-w-[184px]">Item Name</Th>
        <Th className="w-[154px]">Style #</Th>
        <Th className="w-[140px] min-w-[80px]">Option1</Th>
        <Th className="w-[140px] min-w-[80px]">Option2</Th>
        <Th className="w-[172px]">Availability</Th>

        {/* WS Price has no Eye toggle — always visible per spec. */}
        <Th className="w-[132px]">WS Price</Th>
        <Th
          className="w-[132px]"
          trailing={<EyeIconBtn hidden={hidden.has('salePrice')} onClick={() => toggle('salePrice')} />}
        >
          Sale Price
        </Th>

        {specialPriceEnabled && (
          <Th
            className="w-[132px]"
            accent
            trailing={
              <EyeIconBtn
                hidden={hidden.has('specialPrice')}
                onClick={() => toggle('specialPrice')}
              />
            }
          >
            Special Price
          </Th>
        )}

        <Th
          className="w-[132px]"
          trailing={<EyeIconBtn hidden={hidden.has('msrp')} onClick={() => toggle('msrp')} />}
        >
          MSRP
        </Th>
        <Th className="w-20" />
      </div>

      {/* Rows */}
      {rows.map((row) => {
        const isExpanded = expandedId === row.id
        const canExpand = !!row.expansion
        // Row-level click handler — toggles expand/collapse when the click did
        // NOT originate from an interactive child (button/input/select/textarea).
        // The chevron button still bubbles, but its event matches the closest()
        // filter and is short-circuited here, so the chevron's own onClick is the
        // single source of truth for that path.
        const onRowClick = (e: React.MouseEvent<HTMLDivElement>) => {
          if (!canExpand) return
          // Skip the toggle if the click originated from an interactive child.
          // We deliberately omit [role="button"] from this selector — the row
          // itself carries that role for a11y, and including it would cause
          // closest() to match the row and short-circuit every toggle.
          const target = e.target as HTMLElement
          if (
            target.closest(
              'button, input, select, textarea, [role="combobox"], [role="listbox"], [role="option"], [data-no-row-toggle]',
            )
          ) {
            return
          }
          toggleExpanded(row.id)
        }
        return (
          <React.Fragment key={row.id}>
            <div
              role={canExpand ? 'button' : undefined}
              aria-expanded={canExpand ? isExpanded : undefined}
              tabIndex={canExpand ? 0 : undefined}
              onClick={onRowClick}
              onKeyDown={(e) => {
                if (!canExpand) return
                if (e.key === 'Enter' || e.key === ' ') {
                  // Only fire when focus is on the row itself, not a child control.
                  if (e.target !== e.currentTarget) return
                  e.preventDefault()
                  toggleExpanded(row.id)
                }
              }}
              className={cn(
                'flex items-center transition-colors',
                canExpand && 'cursor-pointer hover:bg-muted/40',
                isExpanded && 'bg-muted/20',
              )}
            >
              <Td className="flex-1 min-w-[184px]">
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className="h-10 w-[27px] shrink-0 rounded-xs bg-cover bg-center"
                    style={{ backgroundImage: `url(${row.thumbnail})`, backgroundColor: '#f4f4f5' }}
                  />
                  <p className="truncate text-sm text-foreground">{row.name}</p>
                </div>
              </Td>

              <Td className="w-[154px]">
                {/*
                  Style # may overflow on long codes. Allow up to 2 lines
                  with ellipsis (line-clamp-2) so the row stays at h-16 and
                  doesn't expand vertically.
                */}
                <p className="text-sm leading-5 text-foreground line-clamp-2 break-words">
                  {row.styleNumber}
                </p>
              </Td>

              <Td className="w-[140px] min-w-[80px]">
                <OptionCell value={row.option1} />
              </Td>
              <Td className="w-[140px] min-w-[80px]">
                <OptionCell value={row.option2} />
              </Td>

              <Td className="w-[172px]">
                <div className="flex flex-wrap items-center gap-2">
                  {row.availability.map((a) => (
                    <Badge key={a.label} tone={a.tone}>
                      {a.label}
                    </Badge>
                  ))}
                </div>
              </Td>

              {/* WS Price is never hidden — pass false directly. */}
              <PriceCell value={row.wsPrice} hidden={false} />
              <PriceCell value={row.salePrice} hidden={hidden.has('salePrice')} />

              {specialPriceEnabled && (
                <SpecialPriceCell
                  value={specialPrices[row.id] ?? ''}
                  onChange={(v) => onSpecialPriceChange(row.id, v)}
                  hidden={hidden.has('specialPrice')}
                />
              )}

              <PriceCell value={row.msrp} hidden={hidden.has('msrp')} />

              <Td className="w-20">
                <div className="flex h-6 items-center gap-3">
                  <button
                    type="button"
                    aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
                    aria-expanded={isExpanded}
                    disabled={!canExpand}
                    onClick={() => canExpand && toggleExpanded(row.id)}
                    className={cn(
                      'flex h-6 w-6 items-center justify-center rounded-sm transition-colors',
                      canExpand
                        ? 'text-foreground hover:bg-muted'
                        : 'text-muted-foreground cursor-not-allowed opacity-30',
                    )}
                  >
                    <ChevronDown
                      className={cn('h-4 w-4 transition-transform', isExpanded && 'rotate-180')}
                      strokeWidth={1.5}
                    />
                  </button>
                  <button
                    type="button"
                    aria-label="Remove row"
                    className="flex h-6 w-6 items-center justify-center rounded-sm hover:bg-muted"
                  >
                    <Trash2 className="h-4 w-4 text-foreground" strokeWidth={1.5} />
                  </button>
                </div>
              </Td>
            </div>

            {isExpanded && row.expansion && (
              <ExpandedPanel
                config={row.expansion}
                specialPriceEnabled={specialPriceEnabled}
                hidden={hidden}
              />
            )}
          </React.Fragment>
        )
      })}
      </div>
    </div>
  )
}

// Renders the expanded panel for a row. Mirrors the parent's column structure
// using sub-row variants from Figma 2733:209704.
function ExpandedPanel({
  config,
  specialPriceEnabled,
  hidden,
}: {
  config: ExpansionConfig
  specialPriceEnabled: boolean
  hidden: Set<PriceCol>
}) {
  return (
    <div className="border-b border-elements-border bg-card">
      {config.rows.map((sub, i) => (
        <SubRow
          key={i}
          type={config.type}
          sub={sub}
          date={config.date}
          specialPriceEnabled={specialPriceEnabled}
          hidden={hidden}
          // Pack badge appears ONLY on the first sub-row per item (spec).
          showPackBadge={i === 0}
          packBreakdown={config.packBreakdown}
        />
      ))}
    </div>
  )
}

function SubRow({
  type,
  sub,
  date,
  specialPriceEnabled,
  hidden,
  showPackBadge,
  packBreakdown,
}: {
  type: ExpansionType
  sub: ExpansionSubRow
  date: string
  specialPriceEnabled: boolean
  hidden: Set<PriceCol>
  showPackBadge: boolean
  packBreakdown?: { packSize: string; values: string }
}) {
  const isOpenPack = type === 'openpack-1' || type === 'openpack-1+2'

  // Pack badge only on the first sub-row of an item's expansion.
  const badge = !showPackBadge ? null : isOpenPack ? (
    <Badge tone="amber" className="tracking-[0.4px]">
      OPEN PACK
    </Badge>
  ) : (
    <Badge tone="gray">PRE PACK</Badge>
  )

  // Column mapping per type (visible Option1 = col 3, visible Option2 = col 4):
  //   openpack-1     : col3 = sub.option1 (size); col4 = empty
  //   openpack-1+2   : col3 = sub.option1 (color); col4 = sub.option2 (size)
  //   prepack-1      : col3 = "Size Pack" + Info(tooltip); col4 = empty
  //   prepack-2      : col3 = sub.option1 (color); col4 = "Size Pack" + Info(tooltip)
  const showSizePackInOpt2 = type === 'prepack-2'
  const showSizePackInOpt1 = type === 'prepack-1'
  // Both Pre Pack expansion types show an Info tooltip next to "Size Pack" per spec.
  const isPrePack = type === 'prepack-1' || type === 'prepack-2'

  // Pack Breakdown tooltip (Figma 2845:81482) — same dark popover used for both
  // Pre Pack types. The tooltip wraps an Info icon button next to "Size Pack".
  const sizePackInfo = isPrePack && packBreakdown ? (
    <Tooltip
      content={
        <>
          <p className="font-semibold text-sm leading-5 mb-2">{packBreakdown.packSize}</p>
          <p className="text-sm leading-5">{packBreakdown.values}</p>
        </>
      }
      maxWidth={384}
      offset={8}
    >
      <button
        type="button"
        aria-label="Pack breakdown"
        className="flex h-3 w-3 shrink-0 items-center justify-center text-muted-foreground hover:text-foreground"
      >
        <Info className="h-3 w-3" strokeWidth={1.5} />
      </button>
    </Tooltip>
  ) : isPrePack ? (
    <Info className="h-3 w-3 shrink-0 text-muted-foreground" strokeWidth={1.5} />
  ) : null

  return (
    <div className="flex items-center">
      {/* Item name col — left-padded badge (only on first sub-row) */}
      <SubTd className="flex-1 min-w-[184px]" pl="pl-12">
        {badge}
      </SubTd>

      <SubTd className="w-[154px]">{/* Style # — empty */}</SubTd>

      {/* Visible Option1 column (col 3) */}
      <SubTd className="w-[140px] min-w-[80px]">
        {showSizePackInOpt1 ? (
          <span className="flex items-center gap-1.5 min-w-0">
            <p className="truncate text-sm font-medium text-foreground">Size Pack</p>
            {sizePackInfo}
          </span>
        ) : (
          sub.option1 && (
            <p className="truncate text-sm font-medium text-foreground">{sub.option1}</p>
          )
        )}
      </SubTd>

      {/* Visible Option2 column (col 4) */}
      <SubTd className="w-[140px] min-w-[80px]">
        {showSizePackInOpt2 ? (
          <span className="flex items-center gap-1.5 min-w-0">
            <p className="truncate text-sm font-medium text-foreground">Size Pack</p>
            {sizePackInfo}
          </span>
        ) : (
          sub.option2 && (
            <p className="truncate text-sm font-medium text-foreground">{sub.option2}</p>
          )
        )}
      </SubTd>

      {/* Availability cell — date in expanded sub-row (Figma reuses this column). */}
      <SubTd className="w-[172px]">
        <p className="truncate text-sm font-medium text-secondary">{date}</p>
      </SubTd>

      {/* Trailing price columns — all empty in expanded sub-rows */}
      <SubTd className="w-[132px]" hidden={hidden.has('wsPrice')} />
      <SubTd className="w-[132px]" hidden={hidden.has('salePrice')} />
      {specialPriceEnabled && (
        <SubTd className="w-[132px]" hidden={hidden.has('specialPrice')} />
      )}
      <SubTd className="w-[132px]" hidden={hidden.has('msrp')} />
      <SubTd className="w-20" />
    </div>
  )
}

function Th({
  children,
  className,
  trailing,
  accent,
}: {
  children?: React.ReactNode
  className?: string
  trailing?: React.ReactNode
  accent?: boolean
}) {
  return (
    <div
      className={cn(
        'flex h-9 shrink-0 items-center gap-1 border-b border-border px-2.5 min-w-0',
        className,
      )}
    >
      <span
        className={cn(
          'text-sm font-medium leading-5 whitespace-nowrap',
          accent ? 'text-primary' : 'text-secondary',
        )}
      >
        {children}
      </span>
      {trailing}
    </div>
  )
}

function Td({
  children,
  className,
  hidden,
}: {
  children?: React.ReactNode
  className?: string
  hidden?: boolean
}) {
  return (
    <div
      className={cn(
        'flex h-16 shrink-0 items-center border-b border-elements-border bg-card px-2.5 min-w-0',
        className,
      )}
    >
      <div className={cn('flex w-full items-center min-w-0', hidden && 'opacity-20')}>
        {children}
      </div>
    </div>
  )
}

function SubTd({
  children,
  className,
  hidden,
  pl,
}: {
  children?: React.ReactNode
  className?: string
  hidden?: boolean
  pl?: string
}) {
  return (
    <div
      className={cn(
        'flex h-12 shrink-0 items-center min-w-0 px-2.5',
        pl,
        className,
      )}
    >
      <div className={cn('flex w-full items-center min-w-0', hidden && 'opacity-20')}>
        {children}
      </div>
    </div>
  )
}

function PriceCell({ value, hidden }: { value: string; hidden: boolean }) {
  return (
    <Td className="w-[132px]" hidden={hidden}>
      <p className="truncate text-sm text-foreground">{value}</p>
    </Td>
  )
}

// Special Price input cell.
//
// Per DS Input spec (Figma 2985:221218) the disabled state is rendered on the
// INPUT itself — bg-muted, opacity-50, cursor-not-allowed — instead of a
// cell-level opacity overlay. So we explicitly pass `hidden={false}` to the Td
// (the cell stays at full opacity) and let the input render its native
// :disabled style when the column is toggled off via the Eye button.
function SpecialPriceCell({
  value,
  onChange,
  hidden,
}: {
  value: string
  onChange: (v: string) => void
  hidden: boolean
}) {
  const raw = value.replace(/^\$\s*/, '')
  // Hide the absolute "$" prefix overlay when the input is in its disabled
  // state — the dim styling applies to the input, not the floating prefix.
  const showDollarPrefix = !!raw && !hidden
  return (
    <Td className="w-[132px]" hidden={false}>
      <div className="relative h-9 w-[81px]">
        {showDollarPrefix && (
          <span
            aria-hidden
            className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-sm font-medium text-primary"
          >
            $
          </span>
        )}
        <input
          value={raw}
          onChange={(e) => onChange(e.target.value.replace(/^\$\s*/, ''))}
          placeholder="$0.00"
          inputMode="decimal"
          disabled={hidden}
          className={cn(
            'h-9 w-full rounded-md border border-elements-border bg-input py-1',
            'text-sm font-medium text-primary placeholder:text-primary/40',
            'transition-colors',
            'focus:border-ring focus:outline-none focus-visible:border-ring focus-visible:outline-none',
            // DS disabled state — bg swaps to muted, 50% opacity, cursor-not-allowed.
            // Border (#f2ede7) is unchanged per the DS spec.
            'disabled:bg-muted disabled:opacity-50 disabled:cursor-not-allowed',
            showDollarPrefix ? 'pl-[18px] pr-2' : 'px-2',
          )}
        />
      </div>
    </Td>
  )
}

function EyeIconBtn({ hidden, onClick }: { hidden: boolean; onClick: () => void }) {
  const Icon = hidden ? EyeOff : Eye
  return (
    <button
      type="button"
      aria-pressed={hidden}
      aria-label={hidden ? 'Show column' : 'Hide column'}
      onClick={onClick}
      className={cn(
        'flex h-[22px] w-[22px] items-center justify-center rounded-xs transition-colors',
        'hover:bg-muted',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20',
      )}
    >
      <Icon
        className={cn('h-4 w-4', hidden ? 'text-muted-foreground' : 'text-secondary')}
        strokeWidth={1.5}
      />
    </button>
  )
}

function OptionCell({ value }: { value?: { value: string; count?: number } }) {
  if (!value) return null
  return (
    <div className="flex flex-col gap-0.5 justify-center min-w-0 max-w-full">
      <p
        className="text-sm text-foreground overflow-hidden text-ellipsis whitespace-nowrap"
        title={value.value.length > OPTION_MAX_CHARS ? value.value : undefined}
      >
        {truncate(value.value)}
      </p>
      {value.count != null && (
        <p className="text-sm text-secondary truncate">{value.count} values</p>
      )}
    </div>
  )
}
