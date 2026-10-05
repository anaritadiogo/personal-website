"use client"

import { drawablyButton, drawablyCard, drawablyCircle } from "drawably"
import { motion, useReducedMotion } from "motion/react"
import Link from "next/link"
import { createPortal } from "react-dom"
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from "react"
import postcardCatalogue from "@/data/postcards.json"
import PostcardWall, { PostcardCardFace, type Postcard } from "@/components/PostcardWall"
import "drawably/style.css"

const postcards: Postcard[] = postcardCatalogue

type Box = { top: number; left: number; width: number; height: number }
type ActivePostcard = {
  postcard: Postcard
  source: HTMLButtonElement
  box: Box
  phase: "opening" | "open" | "closing"
}

const FLIP_DURATION = 700

function boxOf(element: HTMLElement): Box {
  const rect = element.getBoundingClientRect()
  return { top: rect.top, left: rect.left, width: rect.width, height: rect.height }
}

function centeredBox(): Box {
  const maxWidth = Math.min(window.innerWidth * 0.9, 560)
  const maxHeight = Math.min(window.innerHeight * 0.8, 640)
  const width = Math.min(maxWidth, maxHeight * 7 / 5)
  const height = width * 5 / 7
  return {
    width,
    height,
    left: (window.innerWidth - width) / 2,
    top: (window.innerHeight - height) / 2,
  }
}

export default function Postcards() {
  const [active, setActive] = useState<ActivePostcard | null>(null)
  const [isLeaving, setIsLeaving] = useState(false)
  const [portalHost, setPortalHost] = useState<HTMLElement | null>(null)
  const isActive = active !== null
  const homeLinkRef = useRef<HTMLAnchorElement>(null)
  const backOutlineRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const closeMarkRef = useRef<HTMLSpanElement>(null)
  const pendingFocusRef = useRef<HTMLButtonElement | null>(null)
  const closeTimeoutRef = useRef<number | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const openPostcard = useCallback((postcard: Postcard, source: HTMLButtonElement) => {
    if (active) return
    setActive({ postcard, source, box: boxOf(source), phase: "opening" })
  }, [active])

  const closePostcard = useCallback(() => {
    if (!active || active.phase === "closing") return
    const box = active.source.isConnected ? boxOf(active.source) : active.box
    pendingFocusRef.current = active.source
    setActive({ ...active, box, phase: "closing" })
    overlayRef.current?.focus({ preventScroll: true })
    closeTimeoutRef.current = window.setTimeout(() => {
      closeTimeoutRef.current = null
      setActive(null)
    }, prefersReducedMotion ? 0 : FLIP_DURATION)
  }, [active, prefersReducedMotion])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setPortalHost(document.body))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  useLayoutEffect(() => {
    const homeLink = homeLinkRef.current
    if (!homeLink) return
    const sketch = drawablyButton(homeLink, { variant: "outline" })
    return () => sketch.destroy()
  }, [])

  useEffect(() => {
    const outline = backOutlineRef.current
    if (!outline) return
    const sketch = drawablyCard(outline, { stroke: "#ffffff", width: 1.5, roughness: 0.8 })
    return () => sketch.destroy()
  }, [isActive])

  useEffect(() => {
    const closeMark = closeMarkRef.current
    if (!closeMark) return
    const sketch = drawablyCircle(closeMark, { stroke: "#ffffff", width: 1, roughness: 0.8, boil: 0.3 })
    return () => sketch.destroy()
  }, [isActive])

  useEffect(() => {
    if (active === null && pendingFocusRef.current) {
      const source = pendingFocusRef.current
      pendingFocusRef.current = null
      if (source.isConnected) source.focus({ preventScroll: true })
    }
  }, [active, closePostcard])

  useEffect(() => {
    if (active?.phase !== "open") return
    const recenter = () => setActive((current) => current ? { ...current } : current)
    window.addEventListener("resize", recenter)
    return () => window.removeEventListener("resize", recenter)
  }, [active?.phase])

  useEffect(() => {
    if (active?.phase !== "open") return
    closeButtonRef.current?.focus({ preventScroll: true })
  }, [active?.phase])

  useEffect(() => {
    if (!isActive) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isActive])

  useEffect(() => {
    if (!active) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePostcard()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [active, closePostcard])

  useEffect(() => () => {
    if (closeTimeoutRef.current !== null) window.clearTimeout(closeTimeoutRef.current)
  }, [])

  useEffect(() => {
    if (active?.phase !== "opening") return
    const firstFrame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setActive((current) => current?.phase === "opening" ? { ...current, phase: "open" } : current)
      })
    })
    return () => window.cancelAnimationFrame(firstFrame)
  }, [active?.phase])

  const displayBox = active?.phase === "closing"
    ? active.box
    : active?.phase === "opening"
      ? active.box
      : active
        ? centeredBox()
        : null
  const flipped = active?.phase === "open"

  const openHome = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    if (prefersReducedMotion) {
      window.location.assign("/")
      return
    }

    setIsLeaving(true)
  }

  const page = (
    <motion.div
      className="postcards-scroll bg-black text-white"
      ref={scrollContainerRef}
      animate={isLeaving ? { opacity: 0, y: -16 } : { opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: "easeInOut" }}
      onAnimationComplete={() => {
        if (isLeaving) window.location.assign("/")
      }}
      style={{ height: "100vh", overflowX: "hidden", overflowY: "auto", position: "relative", scrollbarWidth: "none" }}
    >
      <motion.div
        className="absolute left-6 top-6 z-30 sm:left-10 sm:top-10"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: "easeOut", delay: prefersReducedMotion ? 0 : 0.12 }}
      >
        <Link
          ref={homeLinkRef}
          href="/"
          onClick={openHome}
          className="postcards-home-link px-8 py-3 text-lg text-white border border-white"
          style={{ color: "white", fontFamily: "var(--font-jetbrains-mono)" }}
        >
          home
        </Link>
      </motion.div>
      <motion.h1
        className="absolute top-30 left-1/2 z-20 -translate-x-1/2 text-100xl md:text-100xl font-bold text-white mb-6 tracking-tight italic"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.65, ease: "easeOut" }}
        style={{ fontFamily: 'var(--font-instrument-serif)' }}
      >
        postcards
      </motion.h1>
      <div
        className="absolute z-20"
        style={{ left: "50%", top: "12rem", transform: "translateX(-50%)", width: "calc(100% - 2rem)" }}
      >
        <motion.p
          className="text-l md:text-m text-center text-white font-light"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: "easeOut", delay: prefersReducedMotion ? 0 : 0.12 }}
        >
          archive of selected postcards from my travels,
          <br />
          digitized and annotated one scan at a time
        </motion.p>
      </div>

      <section className="mx-auto w-full max-w-[1000px] px-4 pb-16" style={{ marginLeft: "auto", marginRight: "auto", paddingTop: "18rem" }}>

        <PostcardWall
          cards={postcards}
          scrollRootRef={scrollContainerRef}
          onSelect={openPostcard}
          hiddenCardCatalogue={active?.postcard.catalogue ?? null}
        />
      </section>

    </motion.div>
  )

  const overlay = active && displayBox && (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[60]"
      role="dialog"
      aria-modal="true"
      aria-label={`Postcard ${active.postcard.catalogue}: ${active.postcard.title || "untitled"}`}
      tabIndex={-1}
    >
      <div
        aria-hidden="true"
        onClick={closePostcard}
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity motion-reduce:transition-none ${flipped ? "opacity-100" : "opacity-0"}`}
        style={{ transitionDuration: `${FLIP_DURATION}ms` }}
      />
      <div
        className={`postcard-wall-card ${active.postcard.type === "photo" ? "postcard-wall-card-photo" : ""} transition-[top,left,width,height] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none`}
        style={{
          position: "fixed",
          top: displayBox.top,
          left: displayBox.left,
          width: displayBox.width,
          height: displayBox.height,
          perspective: "1400px",
          transitionDuration: `${FLIP_DURATION}ms`,
        }}
      >
        <div
          className="relative h-full w-full transition-transform ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transitionDuration: `${FLIP_DURATION}ms`,
          }}
        >
          <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
            <PostcardCardFace postcard={active.postcard} />
          </div>
          <div
            aria-hidden={active.phase !== "open"}
            className="postcard-modal-back absolute inset-0 overflow-hidden bg-black text-white"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div className="postcard-modal-content absolute inset-0 overflow-y-auto text-white">
              <div className="flex min-h-full flex-col gap-4">
                <header>
                  <h2 className="text-2xl font-semibold" style={{ fontFamily: "var(--font-instrument-serif)" }}>
                    {active.postcard.title || "untitled"}
                  </h2>
                  <p className="text-sm text-white/70">{active.postcard.location}</p>
                </header>
                <p className="text-sm leading-relaxed">
                  date bought: {active.postcard.date}
                  <br />
                  acquired at: {active.postcard.store}
                </p>
                <div className="space-y-3 text-sm leading-relaxed text-white/85">
                  <p>{active.postcard.description}</p>
                </div>
                <div className="space-y-3 text-sm leading-relaxed text-white/85">
                  <p>{active.postcard.history}</p>
                </div>
                <div className="space-y-3 text-sm leading-relaxed text-gray-500">
                  <p>{active.postcard.note}</p>
                </div>
              </div>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closePostcard}
              tabIndex={active.phase === "open" ? 0 : -1}
              className="postcard-modal-close z-10 text-white outline-offset-2 focus-visible:outline-2 focus-visible:outline-white"
              aria-label="Close postcard"
            >
              <span ref={closeMarkRef} className="postcard-modal-close-mark" aria-hidden="true">
                <span className="postcard-modal-close-glyph">×</span>
              </span>
            </button>
            <div ref={backOutlineRef} aria-hidden="true" className="postcard-modal-outline" />
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {page}
      {portalHost && overlay ? createPortal(overlay, portalHost) : null}
    </>
  )
}
