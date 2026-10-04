export type PostcardLayoutCard = {
  orientation: string
  size: string
}

export type PostcardRect = {
  x: number
  y: number
  w: number
  h: number
}

const EPSILON = 1e-9

export function postcardDimensions(card: PostcardLayoutCard) {
  const verticalSize = card.size === "big"
    ? { w: 5.5, h: 8.5 }
    : { w: 5, h: 7 }

  return card.orientation === "horizontal"
    ? { w: verticalSize.h, h: verticalSize.w }
    : verticalSize
}

export function packPostcards(
  cards: readonly PostcardLayoutCard[],
  W = 18,
  G = 0.25,
): PostcardRect[] {
  const placed: PostcardRect[] = []

  for (const card of cards) {
    const { w, h } = postcardDimensions(card)
    const candidateXs = new Set<number>([0, W - w])
    const candidateYs = new Set<number>([0])

    for (const previous of placed) {
      candidateXs.add(previous.x + previous.w + G)
      candidateXs.add(previous.x)
      candidateXs.add(previous.x + previous.w - w)
      candidateXs.add(previous.x - G - w)
      candidateYs.add(previous.y + previous.h + G)
    }

    const xs = [...candidateXs]
      .filter((x) => x >= -EPSILON && x + w <= W + EPSILON)
      .map((x) => Math.min(Math.max(x, 0), W - w))
      .sort((a, b) => a - b)
    const ys = [...candidateYs].sort((a, b) => a - b)

    let best: PostcardRect | undefined
    for (const y of ys) {
      for (const x of xs) {
        const isFree = placed.every((previous) => !(
          x < previous.x + previous.w + G - EPSILON
          && previous.x < x + w + G - EPSILON
          && y < previous.y + previous.h + G - EPSILON
          && previous.y < y + h + G - EPSILON
        ))

        if (
          isFree
          && (!best || y < best.y - EPSILON || (Math.abs(y - best.y) <= EPSILON && x < best.x - EPSILON))
        ) {
          best = { x, y, w, h }
        }
      }

      if (best && y > best.y + EPSILON) break
    }

    if (!best) {
      throw new Error(`Unable to place postcard in a ${W}-unit wall.`)
    }
    placed.push(best)
  }

  return placed
}

export function stackPostcards(
  cards: readonly PostcardLayoutCard[],
  W = 8.5,
  G = 0.25,
): PostcardRect[] {
  let y = 0
  return cards.map((card) => {
    const { w, h } = postcardDimensions(card)
    const rect = { x: (W - w) / 2, y, w, h }
    y += h + G
    return rect
  })
}

export function postcardWallHeight(rects: readonly PostcardRect[]): number {
  return rects.reduce((height, rect) => Math.max(height, rect.y + rect.h), 0)
}
