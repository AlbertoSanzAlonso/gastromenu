export type BentoCardSize = 'large' | 'compact'

export function getBentoLayout(index: number, total: number): {
  spanClass: string
  size: BentoCardSize
} {
  if (total === 1) {
    return { spanClass: 'col-span-6', size: 'large' }
  }

  if (total === 2) {
    return { spanClass: 'col-span-6 lg:col-span-3', size: 'large' }
  }

  if (total === 3) {
    return { spanClass: 'col-span-6 sm:col-span-3 lg:col-span-2', size: 'compact' }
  }

  if (total === 4) {
    return { spanClass: 'col-span-6 sm:col-span-3 lg:col-span-3', size: 'large' }
  }

  const posInCycle = index % 5

  if (posInCycle < 2) {
    return { spanClass: 'col-span-6 lg:col-span-3', size: 'large' }
  }

  return { spanClass: 'col-span-6 sm:col-span-3 lg:col-span-2', size: 'compact' }
}
