"use client"

import { X } from "lucide-react"
import { drawablyButton } from "drawably"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import Link from "next/link"
import { useEffect, useRef, useState, type MouseEvent } from "react"
import postcardCatalogue from "@/data/postcards.json"
import PostcardWall, { PostcardArtwork, type Postcard } from "@/components/PostcardWall"
import { postcardDimensions } from "@/lib/postcard-layout"
import "drawably/style.css"

const postcards: Postcard[] = postcardCatalogue

export default function Postcards() {
  const [selectedPostcard, setSelectedPostcard] = useState<Postcard | null>(null)
  const [isLeaving, setIsLeaving] = useState(false)
  const homeLinkRef = useRef<HTMLAnchorElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (homeLinkRef.current) drawablyButton(homeLinkRef.current, { variant: "outline" })
  }, [])

  const openHome = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    if (prefersReducedMotion) {
      window.location.assign("/")
      return
    }

    setIsLeaving(true)
  }

  return (
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
      <Link
        ref={homeLinkRef}
        href="/"
        onClick={openHome}
        className="absolute left-6 top-6 z-30 text-s transition-opacity hover:opacity-70 sm:left-10 sm:top-10"
        style={{ color: "white", display: "inline-block", fontFamily: "var(--font-jetbrains-mono)", padding: "0.3rem 0.8rem" }}
      >
        home
      </Link>
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
          onSelect={setSelectedPostcard}
        />
      </section>

      <AnimatePresence>
        {selectedPostcard && (
          <motion.div className="fixed inset-0 z-[60] grid place-items-center bg-black/85 p-5 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedPostcard(null)}>
            <motion.article initial={{ opacity: 0, y: 14, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 14, scale: 0.97 }} transition={{ duration: prefersReducedMotion ? 0 : 0.24 }} onClick={(event) => event.stopPropagation()} className="relative w-full max-w-3xl bg-black p-3 text-white shadow-[8px_9px_0_white] sm:p-5">
              <button onClick={() => setSelectedPostcard(null)} className="absolute right-3 top-3 z-10 border border-white bg-black p-2 text-white" aria-label="Close postcard"><X size={16} /></button>
              <div className="mx-auto max-h-[70vh] overflow-hidden border border-white" style={{ aspectRatio: `${postcardDimensions(selectedPostcard).w} / ${postcardDimensions(selectedPostcard).h}` }}><PostcardArtwork postcard={selectedPostcard} expanded /></div>
              <div className="flex items-end justify-between pt-4">
                <div><p className="text-[10px] uppercase tracking-[0.2em] text-white/65">postcard {String(selectedPostcard.catalogue).padStart(3, "0")}</p><h2 className="text-3xl italic" style={{ fontFamily: "var(--font-instrument-serif)" }}>{selectedPostcard.title || "untitled"} · {selectedPostcard.location}</h2></div>
                <p className="text-xs text-white/65">{selectedPostcard.size} · {selectedPostcard.orientation}</p>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
