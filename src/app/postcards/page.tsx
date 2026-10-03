"use client"

import { X } from "lucide-react"
import { drawablyButton } from "drawably"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import Link from "next/link"
import { useEffect, useRef, useState, type MouseEvent } from "react"
import "drawably/style.css"

type Postcard = {
  id: number
  place: string
  country: string
  year: number
  orientation: "portrait" | "landscape"
  featured: boolean
  offset: number
  palette: string
}

const places = [
  ["Amalfi Coast", "Italy"],
  ["Kyoto", "Japan"],
  ["Sao Miguel", "Portugal"],
  ["Marrakesh", "Morocco"],
  ["Copenhagen", "Denmark"],
  ["Cartagena", "Colombia"],
  ["Rila", "Bulgaria"],
  ["Valparaiso", "Chile"],
  ["Essaouira", "Morocco"],
  ["Reykjavik", "Iceland"],
]

const palettes = [
  "from-[#e86951] via-[#f0b05e] to-[#f4d59d]",
  "from-[#176a72] via-[#65a6a1] to-[#d5dfb6]",
  "from-[#35638d] via-[#8aaec7] to-[#f4c58a]",
  "from-[#8b4051] via-[#d5775e] to-[#efc275]",
  "from-[#557043] via-[#9dac66] to-[#dfd28f]",
]

const postcards: Postcard[] = Array.from({ length: 100 }, (_, index) => {
  const [place, country] = places[index % places.length]
  const orientation = index % 5 < 3 ? "portrait" : "landscape"
  return {
    id: index + 1,
    place,
    country,
    year: 1938 + ((index * 7) % 79),
    orientation,
    featured: index % 13 === 0 || index % 17 === 0,
    offset: (index * 11) % 17,
    palette: palettes[index % palettes.length],
  }
})

function postcardSizeClass(postcard: Postcard) {
  if (postcard.orientation === "portrait") {
    return postcard.featured
      ? "w-[calc(100%-0rem)] sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.333rem)] xl:w-[calc(25%-1.5rem)] aspect-[0.72/1]"
      : "w-[calc(50%-1rem)] sm:w-[calc(25%-1.5rem)] lg:w-[calc(16.666%-1.667rem)] xl:w-[calc(12.5%-1.75rem)] aspect-[0.72/1]"
  }

  return postcard.featured
    ? "w-full sm:w-full lg:w-[calc(50%-1rem)] xl:w-[calc(37.5%-1.25rem)] aspect-[1.42/1]"
    : "w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.333rem)] xl:w-[calc(25%-1.5rem)] aspect-[1.42/1]"
}

function PostcardArt({ postcard, expanded = false }: { postcard: Postcard; expanded?: boolean }) {
  return (
    <div className={`relative h-full w-full overflow-hidden bg-gradient-to-br ${postcard.palette}`}>
      <div className="absolute -left-[10%] bottom-[14%] h-[62%] w-[72%] rounded-[48%_52%_20%_22%] bg-[#193c43]/40" />
      <div className="absolute -right-[12%] bottom-[8%] h-[52%] w-[82%] rounded-[55%_45%_16%_30%] bg-[#f9dd9e]/70" />
      <div className="absolute left-[17%] top-[16%] h-[27%] w-[27%] rounded-full border-[3px] border-[#f7e9c4]/80" />
      <div className="absolute left-[24%] top-[24%] h-[6%] w-[6%] rounded-full bg-[#f7e9c4]/80" />
      <div className="absolute inset-x-[12%] bottom-[19%] h-px bg-[#1f4650]/45" />
      <p
        className={`absolute bottom-[9%] left-[10%] max-w-[75%] text-[#182d37] ${expanded ? "text-3xl" : "text-[8px] sm:text-[10px]"}`}
        style={{ fontFamily: "var(--font-instrument-serif)" }}
      >
        {postcard.place.toUpperCase()}
      </p>
      <span className={`absolute right-[10%] top-[10%] border border-[#183943]/35 px-1 text-[#183943]/70 ${expanded ? "text-xs" : "text-[6px]"}`}>
        {postcard.year}
      </span>
    </div>
  )
}

export default function Postcards() {
  const [selectedPostcard, setSelectedPostcard] = useState<Postcard | null>(null)
  const [isLeaving, setIsLeaving] = useState(false)
  const homeLinkRef = useRef<HTMLAnchorElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const motionDuration = prefersReducedMotion ? 0 : 0.65

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

      <section className="mx-auto w-full max-w-[1320px] px-4 pb-16" style={{ marginLeft: "auto", marginRight: "auto", paddingTop: "18rem" }}>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-16">
          {postcards.map((postcard, index) => (
            <motion.button
              key={postcard.id}
              type="button"
              onClick={() => setSelectedPostcard(postcard)}
              className={`group relative w-full cursor-zoom-in text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black ${postcardSizeClass(postcard)}`}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: postcard.offset }}
              transition={{ duration: motionDuration, delay: prefersReducedMotion ? 0 : Math.min(index * 0.018, 0.7), ease: "easeOut" }}
              whileHover={prefersReducedMotion ? undefined : { y: postcard.offset - 7, zIndex: 10, transition: { duration: 0.2 } }}
              aria-label={`View postcard ${postcard.id}: ${postcard.place}, ${postcard.country}`}
            >
              <span className="absolute -inset-1 bg-white shadow-[3px_4px_0_rgba(255,255,255,0.38)]" />
              <span className="relative block h-full overflow-hidden border border-white"><PostcardArt postcard={postcard} /></span>
              <span className="absolute -bottom-5 left-0 text-[8px] uppercase tracking-[0.13em] text-white/70 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">{String(postcard.id).padStart(3, "0")} / {postcard.country}</span>
            </motion.button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedPostcard && (
          <motion.div className="fixed inset-0 z-[60] grid place-items-center bg-black/85 p-5 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedPostcard(null)}>
            <motion.article initial={{ opacity: 0, y: 14, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 14, scale: 0.97 }} transition={{ duration: prefersReducedMotion ? 0 : 0.24 }} onClick={(event) => event.stopPropagation()} className="relative w-full max-w-3xl bg-black p-3 text-white shadow-[8px_9px_0_white] sm:p-5">
              <button onClick={() => setSelectedPostcard(null)} className="absolute right-3 top-3 z-10 border border-white bg-black p-2 text-white" aria-label="Close postcard"><X size={16} /></button>
              <div className={`overflow-hidden border border-white ${selectedPostcard.orientation === "portrait" ? "aspect-[0.72/1]" : "aspect-[1.42/1]"}`}><PostcardArt postcard={selectedPostcard} expanded /></div>
              <div className="flex items-end justify-between pt-4">
                <div><p className="text-[10px] uppercase tracking-[0.2em] text-white/65">postcard {String(selectedPostcard.id).padStart(3, "0")}</p><h2 className="text-3xl italic" style={{ fontFamily: "var(--font-instrument-serif)" }}>{selectedPostcard.place}, {selectedPostcard.country}</h2></div>
                <p className="text-xs text-white/65">{selectedPostcard.year}</p>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
