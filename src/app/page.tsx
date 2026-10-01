"use client"

import { useEffect, useState } from "react"
import { drawablyButton } from "drawably"
import { DrawablyUnderline } from "drawably/react"
import ClickQuantum from "@/components/ClickQuantum"
import "drawably/style.css"

export default function Home() {
  const [mounted, setMounted] = useState(false)

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

  const pageContent = (
    <div className="flex flex-col min-h-screen">
      <div className="absolute top-30 left-1/2 -translate-x-1/2 flex flex-col md:flex-row gap-6 items-center">
        <div className="flex gap-6">
          <button id="about" className="px-8 py-3 text-lg text-white border border-white" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>about</button>
          <button id="projects" className="px-8 py-3 text-lg text-white border border-white" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>projects</button>
        </div>
        <div className="flex gap-6">
          <button id="photography" className="px-8 py-3 text-lg text-white border border-white" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>photography</button>
          <button id="postcards" className="px-8 py-3 text-lg text-white border border-white" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>postcards</button>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-12 md:px-6">
        <div className="max-w-xl text-center">
          <h1 className="text-100xl md:text-100xl font-bold text-white mb-6 tracking-tight italic" style={{ fontFamily: 'var(--font-instrument-serif)' }}>
            hello stranger,
          </h1>
          <p className="text-l md:text-m text-white font-light">i'm <DrawablyUnderline style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>
            ana
          </DrawablyUnderline>. engineer, traveler, creator. </p>
          <p className="text-l md:text-m text-white font-light">welcome to my corner of the internet,</p>
          <p className="text-l md:text-m text-white font-light">pull up a chair, poke around.</p>
        </div>
      </div>
      <footer className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="flex justify-center gap-4">
          <a href="https://linkedin.com/in/anaritadiogo" target="_blank" rel="noopener noreferrer" className="text-xs hover:opacity-70 transition-opacity" style={{ fontFamily: 'var(--font-jetbrains-mono)', color: 'white' }}><DrawablyUnderline style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>linkedin</DrawablyUnderline></a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:opacity-70 transition-opacity" style={{ fontFamily: 'var(--font-jetbrains-mono)', color: 'white' }}><DrawablyUnderline style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>github</DrawablyUnderline></a>
          <a href="mailto:contact@example.com" className="text-xs hover:opacity-70 transition-opacity" style={{ fontFamily: 'var(--font-jetbrains-mono)', color: 'white' }}><DrawablyUnderline style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>email</DrawablyUnderline></a>
        </div>
      </footer>
    </div>
  )

  return mounted ? (
    <ClickQuantum
      strokeColor="#ffffff"
      particleCount={8}
      spreadRadius={165}
      teleportInterval={7}
    >
      {pageContent}
    </ClickQuantum>
  ) : pageContent;
}
