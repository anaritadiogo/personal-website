"use client"

import { useRef } from "react"
import TextCursorProximity from "@/components/fancy/text/text-cursor-proximity"
import FolderSidebar from "@/components/FolderSidebar"
import { useFolderContext } from "@/context/FolderContext"

const styles = {
  title: {
    filter: {
      from: "blur(0px)",
      to: "blur(8px)",
    },
  },
  subtitle: {
    filter: {
      from: "blur(0px)",
      to: "blur(4px)",
    },
  },
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { activeFolder, getFolderColor } = useFolderContext()

  return (
    <>
      <FolderSidebar />
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 transition-colors duration-500"
        ref={containerRef}
        style={{
          backgroundColor: `${getFolderColor(activeFolder)}20`,
        }}
      >
        <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-100xl md:text-100xl font-bold text-white mb-6 tracking-tight will-change-transform">
          <TextCursorProximity
            styles={styles.title}
            falloff="linear"
            radius={100}
            containerRef={containerRef}
          >
            WELCOME
          </TextCursorProximity>
        </h1>
        <p className="text-xl md:text-2xl text-white font-light will-change-transform">
          <TextCursorProximity
            styles={styles.subtitle}
            falloff="linear"
            radius={80}
            containerRef={containerRef}
          >
            this is a work in progress
          </TextCursorProximity>
        </p>
        </div>
      </div>
    </>
  )
}
