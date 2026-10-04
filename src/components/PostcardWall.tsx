"use client"

import { useEffect, useMemo, useRef, useState, type CSSProperties, type RefObject } from "react"
import { motion, useReducedMotion } from "motion/react"
import {
  packPostcards,
  postcardDimensions,
  postcardWallHeight,
  stackPostcards,
  type PostcardRect,
} from "@/lib/postcard-layout"

export type Postcard = {
  catalogue: number
  id: number
  title: string
  location: string
  orientation: string
  size: string
  type: string
  colours: string[]
  image?: string
}

type WallStyle = CSSProperties & {
  "--desktop-height": string
  "--mobile-height": string
}

type CardStyle = CSSProperties & {
  "--desktop-left": string
  "--desktop-top": string
  "--desktop-width": string
  "--desktop-card-height": string
  "--mobile-left": string
  "--mobile-top": string
  "--mobile-width": string
  "--mobile-card-height": string
  "--card-colour": string
  "--card-gradient": string
}

const DESKTOP_WIDTH = 18
const MOBILE_WIDTH = 8.5
const GAP = 0.5
const BATCH_SIZE = 12
const colourValues: Record<string, string> = {
  white: "#f4f4ef",
  red: "#d9483b",
  yellow: "#f2c230",
  blue: "#3b6fd1",
  orange: "#ee8a2e",
  green: "#4e9a5b",
  black: "#23262b",
  grey: "#9aa0a6",
  brown: "#8a5a3c",
  pink: "#ee9ab5",
  purple: "#7d5bb3",
}

function unit(value: number, wallWidth: number) {
  return `${(value / wallWidth) * 100}cqw`
}

function visualStyle(postcard: Postcard) {
  const colours = postcard.colours.map((colour) => colourValues[colour] ?? colourValues.grey)
  const gradient = colours.length > 1
    ? `linear-gradient(135deg, ${colours.map((colour, index) => `${colour} ${index / colours.length * 100}% ${(index + 1) / colours.length * 100}%`).join(", ")})`
    : `linear-gradient(135deg, ${colours[0]} 0%, ${colours[0]} 100%)`

  return {
    "--card-colour": colours[0] ?? colourValues.grey,
    "--card-gradient": gradient,
  } as const
}

export function PostcardArtwork({ postcard, expanded = false }: { postcard: Postcard; expanded?: boolean }) {
  const alt = [postcard.title, postcard.location].filter(Boolean).join(", ")
  const { w, h } = postcardDimensions(postcard)

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${postcard.type === "photo" ? "border-[5px] border-[#f7f7f4]" : ""}`}
      style={{
        aspectRatio: `${w} / ${h}`,
        backgroundColor: "var(--card-colour)",
        backgroundImage: "var(--card-gradient)",
      }}
    >
      {postcard.image ? (
        <img
          src={postcard.image}
          alt={alt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <>
          <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "repeating-linear-gradient(135deg, transparent 0 14px, #fff 14px 24px)" }} />
          <span className={`absolute bottom-[8%] left-[8%] max-w-[84%] truncate bg-white/90 px-1.5 py-0.5 text-[#1a2027] ${expanded ? "text-base" : "text-[8px] sm:text-[10px]"}`}>
            {postcard.title || "untitled"} · {postcard.location}
          </span>
        </>
      )}
    </div>
  )
}

function cardStyle(desktop: PostcardRect, mobile: PostcardRect, postcard: Postcard): CardStyle {
  return {
    "--desktop-left": unit(desktop.x, DESKTOP_WIDTH),
    "--desktop-top": unit(desktop.y, DESKTOP_WIDTH),
    "--desktop-width": unit(desktop.w, DESKTOP_WIDTH),
    "--desktop-card-height": unit(desktop.h, DESKTOP_WIDTH),
    "--mobile-left": unit(mobile.x, MOBILE_WIDTH),
    "--mobile-top": unit(mobile.y, MOBILE_WIDTH),
    "--mobile-width": unit(mobile.w, MOBILE_WIDTH),
    "--mobile-card-height": unit(mobile.h, MOBILE_WIDTH),
    ...visualStyle(postcard),
  }
}

export default function PostcardWall({
  cards,
  scrollRootRef,
  onSelect,
}: {
  cards: readonly Postcard[]
  scrollRootRef: RefObject<HTMLDivElement | null>
  onSelect: (postcard: Postcard) => void
}) {
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE)
  const [raisedCard, setRaisedCard] = useState<number | null>(null)
  const [dragOffsets, setDragOffsets] = useState<Record<number, { x: number; y: number }>>({})
  const draggedCardRef = useRef(false)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const visibleCards = useMemo(() => cards.slice(0, visibleCount), [cards, visibleCount])
  const desktopRects = useMemo(
    () => packPostcards(visibleCards, DESKTOP_WIDTH, GAP),
    [visibleCards],
  )
  const mobileRects = useMemo(
    () => stackPostcards(visibleCards, MOBILE_WIDTH, GAP),
    [visibleCards],
  )
  const wallStyle: WallStyle = {
    "--desktop-height": unit(postcardWallHeight(desktopRects), DESKTOP_WIDTH),
    "--mobile-height": unit(postcardWallHeight(mobileRects), MOBILE_WIDTH),
  }

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || visibleCount >= cards.length) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((current) => Math.min(current + BATCH_SIZE, cards.length))
        }
      },
      { root: scrollRootRef.current, rootMargin: "0px 0px 800px 0px" },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [cards.length, scrollRootRef, visibleCount])

  return (
    <>
      <div className="postcard-wall-container">
        <div className="postcard-wall" style={wallStyle} aria-label="Postcards in catalogue order">
          {visibleCards.map((postcard, index) => {
            const desktop = desktopRects[index]
            const mobile = mobileRects[index]
            const style = cardStyle(desktop, mobile, postcard)
            const title = postcard.title || "untitled"
            const dragOffset = dragOffsets[postcard.catalogue] ?? { x: 0, y: 0 }

            return (
              <motion.button
                key={postcard.id}
                type="button"
                onClick={(event) => {
                  if (draggedCardRef.current) {
                    draggedCardRef.current = false
                    event.preventDefault()
                    event.stopPropagation()
                    return
                  }
                  onSelect(postcard)
                }}
                onDragStart={() => {
                  draggedCardRef.current = true
                  setRaisedCard(postcard.catalogue)
                }}
                onDragEnd={(_, info) => {
                  setDragOffsets((offsets) => {
                    const previous = offsets[postcard.catalogue] ?? { x: 0, y: 0 }
                    return {
                      ...offsets,
                      [postcard.catalogue]: {
                        x: previous.x + info.offset.x,
                        y: previous.y + info.offset.y,
                      },
                    }
                  })
                  window.setTimeout(() => {
                    draggedCardRef.current = false
                  }, 0)
                }}
                className={`postcard-wall-card ${postcard.type === "photo" ? "postcard-wall-card-photo" : ""}`}
                style={{ ...style, zIndex: raisedCard === postcard.catalogue ? 20 : undefined }}
                aria-label={`View postcard ${postcard.catalogue}: ${title}, ${postcard.location}`}
                drag
                dragConstraints={scrollRootRef}
                dragElastic={1}
                dragMomentum={false}
                whileDrag={{ zIndex: 21 }}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
                animate={{ opacity: 1, ...dragOffset }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.65,
                  delay: prefersReducedMotion ? 0 : Math.min(index * 0.018, 0.7),
                  ease: "easeOut",
                }}
                whileHover={prefersReducedMotion ? undefined : {
                  y: dragOffset.y - 7,
                  zIndex: 10,
                  transition: { duration: 0.2 },
                }}
              >
                <PostcardArtwork postcard={postcard} />
                <span className="postcard-wall-chip postcard-wall-chip-number">{String(postcard.catalogue).padStart(3, "0")}</span>
                <span className="postcard-wall-chip postcard-wall-chip-location">{postcard.location}</span>
              </motion.button>
            )
          })}
        </div>
      </div>
      {visibleCount < cards.length && <div ref={sentinelRef} className="postcard-wall-sentinel" aria-hidden="true" />}
    </>
  )
}
