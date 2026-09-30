"use client"

import { RefObject, useEffect, useRef } from "react"
import { useMousePositionRef } from "@/hooks/useMousePositionRef"

interface TextCursorProximityProps {
  children: React.ReactNode
  className?: string
  styles?: {
    filter?: {
      from: string
      to: string
    }
    opacity?: {
      from: number
      to: number
    }
  }
  falloff?: "gaussian" | "exponential" | "linear"
  radius?: number
  containerRef?: RefObject<HTMLElement | null>
}

export default function TextCursorProximity({
  children,
  className = "",
  styles,
  falloff = "gaussian",
  radius = 100,
  containerRef,
}: TextCursorProximityProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const positionRef = useMousePositionRef(containerRef)
  const charRefs = useRef<Array<HTMLSpanElement | null>>([])

  const textContent = typeof children === "string" ? children : ""

  useEffect(() => {
    const interval = setInterval(() => {
      const cursorX = positionRef.current.x
      const cursorY = positionRef.current.y

      charRefs.current.forEach((charRef) => {
        if (!charRef) return

        const rect = charRef.getBoundingClientRect()
        const charCenterX = rect.left + rect.width / 2
        const charCenterY = rect.top + rect.height / 2

        let distance = Math.sqrt(
          Math.pow(cursorX - charCenterX, 2) +
            Math.pow(cursorY - charCenterY, 2)
        )

        let intensity = 0
        if (distance < radius) {
          if (falloff === "gaussian") {
            intensity = Math.exp(-Math.pow(distance / (radius / 3), 2))
          } else if (falloff === "exponential") {
            intensity = 1 - distance / radius
          } else {
            // linear
            intensity = Math.max(0, 1 - distance / radius)
          }
        }

        // Apply filter effects (blur)
        if (styles?.filter) {
          const fromValue = parseFilterValue(styles.filter.from)
          const toValue = parseFilterValue(styles.filter.to)
          const blurAmount = fromValue + (toValue - fromValue) * intensity
          charRef.style.filter = `blur(${blurAmount}px)`
        }

        // Apply opacity effects
        if (styles?.opacity) {
          const opacityAmount =
            styles.opacity.from + (styles.opacity.to - styles.opacity.from) * intensity
          charRef.style.opacity = opacityAmount.toString()
        }
      })
    }, 1000 / 60) // 60fps

    return () => clearInterval(interval)
  }, [radius, falloff, styles])

  return (
    <div ref={elementRef} className={className}>
      {textContent.split("").map((char, i) => (
        <span
          key={i}
          ref={(el) => {
            charRefs.current[i] = el
          }}
          style={{ display: "inline" }}
        >
          {char}
        </span>
      ))}
    </div>
  )
}

function parseFilterValue(filterString: string): number {
  const match = filterString.match(/\d+/)
  return match ? parseInt(match[0]) : 0
}
