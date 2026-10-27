"use client"

import { drawablyButton } from "drawably"
import { motion, useReducedMotion } from "motion/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLayoutEffect, useRef, useState, type MouseEvent } from "react"
import "drawably/style.css"

export default function About() {
  const [isLeaving, setIsLeaving] = useState(false)
  const homeLinkRef = useRef<HTMLAnchorElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const router = useRouter()

  useLayoutEffect(() => {
    const homeLink = homeLinkRef.current
    if (!homeLink) return
    const sketch = drawablyButton(homeLink, { variant: "outline" })
    return () => sketch.destroy()
  }, [])

  const openHome = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    if (prefersReducedMotion) {
      router.push("/")
      return
    }

    setIsLeaving(true)
  }

  return (
    <motion.div
      className="relative min-h-screen overflow-hidden bg-black text-white"
      animate={isLeaving ? { opacity: 0, y: -16 } : { opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: "easeInOut" }}
      onAnimationComplete={() => {
        if (isLeaving) router.push("/")
      }}
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
        className="absolute top-30 left-1/2 z-20 -translate-x-1/2 text-[clamp(3.5rem,10vw,8rem)] font-bold text-white mb-6 tracking-tight italic leading-none"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.65, ease: "easeOut" }}
        style={{ fontFamily: "var(--font-instrument-serif)" }}
      >
        about
      </motion.h1>

      <div
        className="absolute z-20"
        style={{ left: "50%", top: "12rem", transform: "translateX(-50%)", width: "calc(100% - 2rem)" }}
      >
        <motion.p
          className="text-base md:text-lg text-center text-white font-light"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: "easeOut", delay: prefersReducedMotion ? 0 : 0.12 }}
        >
          <p>my name is ana and here is a little about me</p>
        </motion.p>
      </div>
    </motion.div>
  )
}
