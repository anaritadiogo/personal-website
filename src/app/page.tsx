"use client"

import { useEffect } from "react"
import { drawablyButton } from "drawably"
import { DrawablyUnderline } from "drawably/react"
import "drawably/style.css"

export default function Home() {
  useEffect(() => {
    const aboutBtn = document.querySelector("#about")
    const projectsBtn = document.querySelector("#projects")
    const photographyBtn = document.querySelector("#photography")
    const postcardsBtn = document.querySelector("#postcards")
    
    if (aboutBtn) drawablyButton(aboutBtn as HTMLElement, { variant: "outline" })
    if (projectsBtn) drawablyButton(projectsBtn as HTMLElement, { variant: "outline" })
    if (photographyBtn) drawablyButton(photographyBtn as HTMLElement, { variant: "outline" })
    if (postcardsBtn) drawablyButton(postcardsBtn as HTMLElement, { variant: "outline" })
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <div className="absolute top-30 left-1/2 -translate-x-1/2 flex flex-col md:flex-row gap-6">
        <div className="flex gap-6">
          <button id="about" className="px-8 py-3 text-lg text-white border border-white" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>about</button>
          <button id="projects" className="px-8 py-3 text-lg text-white border border-white" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>projects</button>
        </div>
        <div className="flex gap-6">
          <button id="photography" className="px-8 py-3 text-lg text-white border border-white" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>photography</button>
          <button id="postcards" className="px-8 py-3 text-lg text-white border border-white" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>postcards</button>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="max-w-xl mx-auto text-center">
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
      <footer className="flex items-center justify-center gap-6 px-6 pb-32">
        <a href="https://linkedin.com/in/anaritadiogo" target="_blank" rel="noopener noreferrer" className="text-white" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>
          <DrawablyUnderline color="white">
            linkedin
          </DrawablyUnderline>
        </a>
        <a href="https://github.com/anaritadiogo" target="_blank" rel="noopener noreferrer" className="text-white" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>
          <DrawablyUnderline color="white">
            github
          </DrawablyUnderline>
        </a>
        <a href="mailto:rita.i.diogo@gmail.com" className="text-white" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>
          <DrawablyUnderline color="white">
            contact
          </DrawablyUnderline>
        </a>
      </footer>
    </div>
  )
}
