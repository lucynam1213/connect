import type { ItemRow } from '@/components/linesheet/ItemsTable'

// Mock items — placeholder data for the Selected Items table.
const thumb = (hue: number) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 40"><rect width="27" height="40" fill="hsl(${hue}, 35%, 80%)"/><rect x="6" y="14" width="15" height="14" fill="hsl(${hue}, 35%, 65%)"/></svg>`
  )}`

// Each of the 4 expansion types is wired into one of the first four items so
// the Figma reference layouts are all reachable from the demo.
//   1) openpack-1   — list of Option1 (sizes) only
//   2) openpack-1+2 — Option1 (color) × Option2 (size) cartesian
//   3) prepack-1    — single "Size Pack" sub-row (under Option1 col)
//   4) prepack-2    — multiple color sub-rows + "Size Pack" + Info tooltip in Option2 col
//
// Item 5 carries TWO availability badges to demonstrate the new badge-array shape.
export const mockItems: ItemRow[] = [
  {
    id: '1',
    name: 'Relaxed Linen Shirt Relaxed Linen Shirt ',
    thumbnail: thumb(28),
    styleNumber: 'FS25-OVSHIRT-001',
    option1: { value: 'maxmaxm15letter', count: 4 },
    option2: undefined,
    availability: [{ label: 'In Stock', tone: 'green' }],
    wsPrice: '$999.99',
    salePrice: '$999.99',
    msrp: '$999.99',
    expansion: {
      type: 'openpack-1',
      date: '05/30/2026',
      rows: [
        { option1: 'XXX Small' },
        { option1: 'XX Small' },
        { option1: 'X Small' },
        { option1: 'Small' },
      ],
    },
  },
  {
    id: '2',
    name: 'Wool Blend Coat',
    thumbnail: thumb(220),
    styleNumber: 'FS25-COAT-014',
    option1: { value: 'Color', count: 3 },
    option2: { value: 'Size', count: 2 },
    availability: [{ label: 'In Stock', tone: 'green' }],
    wsPrice: '$249.00',
    salePrice: '$199.00',
    msrp: '$498.00',
    expansion: {
      type: 'openpack-1+2',
      date: '05/30/2026',
      rows: [
        { option1: 'Red', option2: 'XXX Small' },
        { option1: 'Red', option2: 'XX Small' },
        { option1: 'Blue', option2: 'XXX Small' },
        { option1: 'Blue', option2: 'XX Small' },
        { option1: 'Camel', option2: 'XXX Small' },
        { option1: 'Camel', option2: 'XX Small' },
      ],
    },
  },
  {
    id: '3',
    name: 'Pleated Wide-Leg Trousers',
    thumbnail: thumb(40),
    styleNumber: 'FS25-PANT-022',
    option1: { value: 'Charcoal', count: 1 },
    option2: { value: 'Size', count: 6 },
    availability: [{ label: 'Low Stock', tone: 'amber' }],
    wsPrice: '$120.00',
    salePrice: '$99.00',
    msrp: '$240.00',
    expansion: {
      type: 'prepack-1',
      date: '05/30/2026',
      // Pack Breakdown (Figma 2845:81482) — also shown on prepack-1 per spec.
      packBreakdown: {
        packSize: '14pcs / Pack',
        values:
          'X Small(2) - Small(2) - Medium(2) - Large(2) - X Large(2) - XX Large(2) - XXX Large(2)',
      },
      rows: [{}],
    },
  },
  {
    id: '4',
    name: 'Cotton Cashmere Crewneck',
    thumbnail: thumb(155),
    styleNumber: 'FS25-KNIT-007',
    option1: { value: 'Cream', count: 2 },
    option2: { value: 'Size', count: 4 },
    availability: [{ label: 'In Stock', tone: 'green' }],
    wsPrice: '$89.00',
    salePrice: '$69.00',
    msrp: '$178.00',
    expansion: {
      type: 'prepack-2',
      date: '05/30/2026',
      // Pack breakdown surfaces in the Option2-col Info tooltip (Figma 2845:81482).
      packBreakdown: {
        packSize: '14pcs / Pack',
        values:
          'X Small(2) - Small(2) - Medium(2) - Large(2) - X Large(2) - XX Large(2) - XXX Large(2)',
      },
      rows: [
        { option1: 'Cream' },
        { option1: 'Sage' },
        { option1: 'Charcoal' },
        { option1: 'Black' },
      ],
    },
  },
  {
    id: '5',
    name: 'Silk-Blend Slip Dress',
    thumbnail: thumb(330),
    // Intentionally long to demo the 2-line ellipsis clamp on Style #.
    styleNumber: 'FS25-DRESS-LONGCODE-031-A2026-COLLECTION-EVERGREEN',
    option1: { value: 'Rose', count: 3 },
    option2: { value: 'Size', count: 5 },
    // Two badges per Figma reference frame 2661:337519.
    availability: [
      { label: 'In Stock', tone: 'green' },
      { label: 'Pre-order', tone: 'amber' },
    ],
    wsPrice: '$210.00',
    salePrice: '$179.00',
    msrp: '$420.00',
  },
  {
    id: '6',
    name: 'Heavyweight Hoodie',
    thumbnail: thumb(0),
    styleNumber: 'FS25-HOOD-018',
    option1: { value: 'Color', count: 4 },
    option2: { value: 'Size', count: 5 },
    availability: [{ label: 'In Stock', tone: 'green' }],
    wsPrice: '$72.00',
    salePrice: '$60.00',
    msrp: '$144.00',
  },
  {
    id: '7',
    name: 'Pleated Mini Skirt',
    thumbnail: thumb(280),
    styleNumber: 'FS25-SKIRT-009',
    option1: { value: 'Plaid', count: 2 },
    option2: { value: 'Size', count: 4 },
    availability: [{ label: 'In Stock', tone: 'green' }],
    wsPrice: '$58.00',
    salePrice: '$48.00',
    msrp: '$116.00',
  },
  {
    id: '8',
    name: 'Tailored Wool Blazer',
    thumbnail: thumb(195),
    styleNumber: 'FS25-BLAZE-002',
    option1: { value: 'Camel', count: 2 },
    option2: { value: 'Size', count: 6 },
    availability: [{ label: 'Pre-order', tone: 'amber' }],
    wsPrice: '$185.00',
    salePrice: '$155.00',
    msrp: '$370.00',
  },
  {
    id: '9',
    name: 'Cropped Denim Jacket',
    thumbnail: thumb(210),
    styleNumber: 'FS25-DENIM-021',
    option1: { value: 'Indigo', count: 2 },
    option2: { value: 'Size', count: 5 },
    availability: [{ label: 'In Stock', tone: 'green' }],
    wsPrice: '$95.00',
    salePrice: '$78.00',
    msrp: '$190.00',
  },
]
