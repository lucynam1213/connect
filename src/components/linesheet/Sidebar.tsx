import {
  LayoutDashboard,
  Package,
  Columns2,
  ShoppingCart,
  Users,
  MessageSquareMore,
  WalletMinimal,
  CaseSensitive,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// SVGs live in public/ so they're served from the site root.
// Use BASE_URL so the path resolves correctly under GitHub Pages, where the
// app is mounted at /connect/. In dev (BASE_URL = '/') this is just '/figma/...'.
const logoSign = `${import.meta.env.BASE_URL}figma/logo-sign.svg`
const logoWordmark = `${import.meta.env.BASE_URL}figma/logo-wordmark.svg`

// Sidebar 07 — Figma node 2661:337586
//
// Responsive collapse:
//  - Viewport > 1600px → full sidebar (256w) with labels
//  - Viewport ≤ 1600px → collapsed sidebar (~64w) showing only icons
//
// Tailwind v3 supports arbitrary screens via min-[1601px]: so the threshold
// matches the spec exactly without modifying tailwind.config.
type NavItem = {
  label: string
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  active?: boolean
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Item', icon: Package },
  { label: 'Linesheet', icon: Columns2, active: true },
  { label: 'Orders', icon: ShoppingCart },
  { label: 'Customers', icon: Users },
  { label: 'Marketing', icon: MessageSquareMore },
  { label: 'Payments', icon: WalletMinimal },
]

export function Sidebar() {
  return (
    <aside
      className={cn(
        'flex shrink-0 flex-col overflow-hidden rounded-2xl border border-border bg-sidebar',
        // Pin to the viewport — fixed height = 100vh - page padding (16+16).
        // sticky top-4 keeps the sidebar visible while the main content scrolls.
        'sticky top-4 self-start h-[calc(100vh-32px)]',
        // Width: 64 collapsed (≤1600), 256 expanded (>1600).
        'w-16 min-[1601px]:w-64',
      )}
    >
      {/* Header — logo */}
      <div className="border-b border-border p-2">
        <div className="flex h-[42px] items-center justify-center min-[1601px]:justify-start gap-2 rounded-md p-2">
          <Logo />
        </div>
      </div>

      {/* Content — primary menu */}
      <div className="flex flex-1 flex-col gap-2 p-2">
        <ul className="flex flex-col gap-3">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                aria-label={item.label}
                title={item.label}
                className={cn(
                  'flex h-8 w-full items-center gap-2 rounded-md p-2 text-left text-sm leading-none transition-colors',
                  // Center the icon when collapsed; left-align with label when expanded.
                  'justify-center min-[1601px]:justify-start',
                  // Hover: sidebar-accent bg + primary fg/icon (currentColor).
                  'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                  item.active
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-foreground',
                )}
              >
                {/*
                  Stroke is set in TWO ways for redundancy:
                    - strokeWidth={1.5} prop → SVG `stroke-width` attribute
                    - `stroke-[1.5]` Tailwind class → CSS `stroke-width: 1.5`
                  CSS wins over presentation attributes, so even if a Lucide
                  release re-introduced a path-level override, the CSS value
                  pins the stroke at 1.5.
                */}
                <item.icon
                  className="h-4 w-4 shrink-0 stroke-[1.5]"
                  strokeWidth={1.5}
                />
                <span className="hidden min-[1601px]:flex flex-1 truncate">
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer — user pill */}
      <div className="border-t border-border p-2">
        <button
          className={cn(
            'flex w-full items-center gap-2 rounded-md p-2 transition-colors',
            // text-left overrides the browser's default `text-align: center` on <button>,
            // so "Terry Park" aligns flush-left.
            'text-left',
            // Match menu-item hover pattern: no bg by default; on hover the entire row
            // swaps to sidebar-accent bg + sidebar-accent-foreground (pink) text/icon.
            'text-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
            'justify-center min-[1601px]:justify-start',
          )}
        >
          {/* Avatar pill stays pink at all times — it's its own self-contained tile, not part of the row swap. */}
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary p-2.5">
            <CaseSensitive
              className="h-4 w-4 stroke-[1.5] text-sidebar-primary-foreground"
              strokeWidth={1.5}
            />
          </span>
          {/* Name + chevron inherit currentColor from the button so they swap with hover. */}
          <span className="hidden min-[1601px]:flex flex-1 flex-col items-start gap-0.5 overflow-hidden">
            <span className="w-full truncate text-sm font-semibold leading-none">
              Terry Park
            </span>
          </span>
          <ChevronRight
            className="hidden min-[1601px]:block h-4 w-4 shrink-0 stroke-[1.5]"
            strokeWidth={1.5}
          />
        </button>
      </div>
    </aside>
  )
}

// Logo — uses the SVG assets from Figma (shopcord brand).
// Collapsed (≤1600): show only the sign mark.
// Expanded (>1600): sign + wordmark (Figma layout 142×24).
function Logo() {
  return (
    <div className="flex h-6 items-center gap-[11px]">
      <img src={logoSign} alt="shopcord" className="h-[24px] w-[18px]" />
      <img
        src={logoWordmark}
        alt=""
        aria-hidden="true"
        className="hidden min-[1601px]:block h-[24px] w-[113px]"
      />
    </div>
  )
}
