import type { ItemCardData } from '@/components/item/ItemCard'

// Mock items for the Item page list state. Thumbnails use Picsum so we get
// real product-ish imagery without bundling assets.
const thumb = (seed: string) => `https://picsum.photos/seed/${seed}/600/800`

export const mockProducts: ItemCardData[] = [
  {
    id: 'p1',
    styleNumber: 'FG-SS25-101',
    thumbnail: thumb('linen-shirt'),
    wholesale: '$13.75',
    sale: '$13.75',
    options: [
      { label: 'Color', count: 2 },
      { label: 'Waist', count: 5 },
    ],
    status: 'active',
    availability: { label: 'In Stock', tone: 'green' },
  },
  {
    id: 'p2',
    styleNumber: 'FG-SS25-102',
    thumbnail: thumb('wool-coat'),
    wholesale: '$24.90',
    sale: '$19.90',
    options: [
      { label: 'Color', count: 3 },
      { label: 'Size', count: 4 },
    ],
    status: 'active',
    availability: { label: 'In Stock', tone: 'green' },
  },
  {
    id: 'p3',
    styleNumber: 'FG-SS25-103',
    thumbnail: thumb('trousers'),
    wholesale: '$32.00',
    sale: '$28.00',
    options: [
      { label: 'Color', count: 1 },
      { label: 'Waist', count: 6 },
    ],
    status: 'active',
    availability: { label: 'Low Stock', tone: 'amber' },
  },
  {
    id: 'p4',
    styleNumber: 'FG-SS25-104',
    thumbnail: thumb('cashmere'),
    wholesale: '$45.00',
    sale: '$39.00',
    options: [
      { label: 'Color', count: 4 },
      { label: 'Size', count: 5 },
    ],
    status: 'active',
    availability: { label: 'In Stock', tone: 'green' },
  },
  {
    id: 'p5',
    styleNumber: 'FG-SS25-105',
    thumbnail: thumb('slip-dress'),
    wholesale: '$28.50',
    sale: '$24.00',
    options: [
      { label: 'Color', count: 5 },
      { label: 'Size', count: 6 },
    ],
    status: 'active',
    availability: { label: 'Pre-order', tone: 'amber' },
  },
  {
    id: 'p6',
    styleNumber: 'FG-SS25-106',
    thumbnail: thumb('hoodie'),
    wholesale: '$22.00',
    sale: '$22.00',
    options: [
      { label: 'Color', count: 6 },
      { label: 'Size', count: 5 },
    ],
    status: 'draft',
  },
  {
    id: 'p7',
    styleNumber: 'FG-SS25-107',
    thumbnail: thumb('skirt'),
    wholesale: '$18.00',
    sale: '$16.00',
    options: [
      { label: 'Color', count: 3 },
      { label: 'Waist', count: 4 },
    ],
    status: 'active',
    availability: { label: 'In Stock', tone: 'green' },
  },
  {
    id: 'p8',
    styleNumber: 'FG-SS25-108',
    thumbnail: thumb('blazer'),
    wholesale: '$54.00',
    sale: '$48.00',
    options: [
      { label: 'Color', count: 2 },
      { label: 'Size', count: 6 },
    ],
    status: 'active',
    availability: { label: 'In Stock', tone: 'green' },
  },
  {
    id: 'p9',
    styleNumber: 'FG-SS25-109',
    thumbnail: thumb('denim-jacket'),
    wholesale: '$36.00',
    sale: '$30.00',
    options: [
      { label: 'Color', count: 2 },
      { label: 'Size', count: 5 },
    ],
    status: 'active',
    availability: { label: 'In Stock', tone: 'green' },
  },
]
