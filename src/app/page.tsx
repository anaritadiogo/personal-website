"use client"

import { useEffect, useState, type MouseEvent } from "react"
import { drawablyButton } from "drawably"
import { DrawablyUnderline } from "drawably/react"
import { motion, useReducedMotion, type Variants } from "motion/react"
import "drawably/style.css"

type ComingSoonPosition = {
  id: number
  x: number
  y: number
}

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [comingSoonPosition, setComingSoonPosition] = useState<ComingSoonPosition | null>(null)
  const prefersReducedMotion = useReducedMotion()
  const textReveal: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.45, ease: "easeOut" },
    },
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const aboutBtn = document.querySelector("#about")
    const projectsBtn = document.querySelector("#projects")
    const photographyBtn = document.querySelector("#photography")
    const postcardsBtn = document.querySelector("#postcards")
    
    if (aboutBtn) drawablyButton(aboutBtn as HTMLElement, { variant: "outline" })
    if (projectsBtn) drawablyButton(projectsBtn as HTMLElement, { variant: "outline" })
    if (photographyBtn) drawablyButton(photographyBtn as HTMLElement, { variant: "outline" })
    if (postcardsBtn) drawablyButton(postcardsBtn as HTMLElement, { variant: "outline" })
  }, [mounted])

  const showComingSoon = (event: MouseEvent<HTMLButtonElement>) => {
    const buttonRect = event.currentTarget.getBoundingClientRect()

    setComingSoonPosition({
      id: Date.now(),
      x: buttonRect.left + buttonRect.width / 2,
      y: buttonRect.top - 8,
    })
  }

  const pageContent = (
    <div className="flex flex-col min-h-screen">
      <motion.div
        className="absolute top-30 left-1/2 -translate-x-1/2 flex flex-col md:flex-row gap-6 items-center"
        initial="hidden"
        animate={mounted ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: prefersReducedMotion ? 0 : 0.12,
              delayChildren: prefersReducedMotion ? 0 : 0.16,
            },
          },
        }}
      >
        <motion.div className="flex gap-6" variants={textReveal}>
          <button id="about" onClick={showComingSoon} className="px-8 py-3 text-lg text-white border border-white" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>about</button>
          <button id="projects" onClick={showComingSoon} className="px-8 py-3 text-lg text-white border border-white" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>projects</button>
        </motion.div>
        <motion.div className="flex gap-6" variants={textReveal}>
          <button id="photography" onClick={showComingSoon} className="px-8 py-3 text-lg text-white border border-white" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>photography</button>
          <button id="postcards" onClick={showComingSoon} className="px-8 py-3 text-lg text-white border border-white" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>postcards</button>
        </motion.div>
      </motion.div>
      {comingSoonPosition !== null && (
        <div
          aria-live="polite"
          className="pointer-events-none fixed z-50"
          style={{ left: comingSoonPosition.x, top: comingSoonPosition.y, transform: "translate(-50%, -100%)" }}
        >
          <motion.p
            key={comingSoonPosition.id}
            className="text-xs text-white"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 4 }}
            animate={{ opacity: [0, 1, 1, 0], y: prefersReducedMotion ? 0 : [4, 0, 0, -4] }}
            transition={{ duration: prefersReducedMotion ? 0 : 1.4, times: [0, 0.15, 0.7, 1], ease: "easeOut" }}
            onAnimationComplete={() => setComingSoonPosition(null)}
          >
            coming soon!
          </motion.p>
        </div>
      )}
      <div className="flex-1 flex flex-col items-center justify-center px-12 md:px-6">
        <motion.div
          className="max-w-xl text-center"
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.12,
                delayChildren: prefersReducedMotion ? 0 : 0.08,
              },
            },
          }}
        >
          <motion.h1
            className="text-100xl md:text-100xl font-bold text-white mb-6 tracking-tight italic"
            style={{ fontFamily: 'var(--font-instrument-serif)' }}
            variants={{
              hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
              visible: { opacity: 1, y: 0, transition: { duration: prefersReducedMotion ? 0 : 0.65, ease: "easeOut" } },
            }}
          >
            hello stranger,
          </motion.h1>
          <motion.p className="text-l md:text-m text-white font-light" variants={textReveal}>
            i'm <DrawablyUnderline style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>
              ana
            </DrawablyUnderline>. engineer, traveler, creator.
          </motion.p>
          <motion.p className="text-l md:text-m text-white font-light" variants={textReveal}>welcome to my corner of the internet,</motion.p>
          <motion.p className="text-l md:text-m text-white font-light" variants={textReveal}>pull up a chair, poke around.</motion.p>
        </motion.div>
      </div>
      <motion.footer
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
        animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.45, delay: prefersReducedMotion ? 0 : 0.6, ease: "easeOut" }}
      >
        <div className="flex justify-center gap-4">
          <a href="https://linkedin.com/in/anaritadiogo" target="_blank" rel="noopener noreferrer" className="text-xs hover:opacity-70 transition-opacity" style={{ fontFamily: 'var(--font-jetbrains-mono)', color: 'white' }}><DrawablyUnderline style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>linkedin</DrawablyUnderline></a>
          <a href="https://github.com/anaritadiogo" target="_blank" rel="noopener noreferrer" className="text-xs hover:opacity-70 transition-opacity" style={{ fontFamily: 'var(--font-jetbrains-mono)', color: 'white' }}><DrawablyUnderline style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>github</DrawablyUnderline></a>
          <a href="mailto:rita.i.diogo@gmail.com" className="text-xs hover:opacity-70 transition-opacity" style={{ fontFamily: 'var(--font-jetbrains-mono)', color: 'white' }}><DrawablyUnderline style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>email</DrawablyUnderline></a>
        </div>
      </motion.footer>
    </div>
  )

  return pageContent;
}
