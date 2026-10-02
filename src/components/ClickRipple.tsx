"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";

type ClickRippleProps = {
  children?: ReactNode;
  color?: string;
  lineWidth?: number;
  maxRadius?: number;
  rippleCount?: number;
};

export default function ClickRipple({
  children,
  color = "#FFFFFF",
  lineWidth = 5,
  maxRadius = 108,
  rippleCount = 20,
}: ClickRippleProps) {
  const rippleLayerRef = useRef<HTMLDivElement>(null);
  const lastRippleTimeRef = useRef(-Infinity);
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    if (!isHydrated) return;

    const rippleLayer = rippleLayerRef.current;
    if (!rippleLayer) return;

    const addRipple = (event: MouseEvent) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      if (event.timeStamp - lastRippleTimeRef.current < 50) {
        return;
      }
      lastRippleTimeRef.current = event.timeStamp;

      const existingRipples = rippleLayer.querySelectorAll(".click-ripple");
      const excessRipples = Math.max(0, existingRipples.length - rippleCount + 1);
      for (let index = 0; index < excessRipples; index += 1) {
        existingRipples[index].remove();
      }

      const ripple = document.createElement("span");
      ripple.className = "click-ripple";
      ripple.style.left = `${event.clientX}px`;
      ripple.style.top = `${event.clientY}px`;
      ripple.style.width = `${maxRadius * 2}px`;
      ripple.style.height = `${maxRadius * 2}px`;
      ripple.style.borderColor = color;
      ripple.style.borderWidth = `${lineWidth}px`;
      ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
      rippleLayer.append(ripple);
    };

    document.addEventListener("pointerdown", addRipple, { capture: true, passive: true });
    return () => document.removeEventListener("pointerdown", addRipple, true);
  }, [color, isHydrated, lineWidth, maxRadius, rippleCount]);

  return (
    <>
      {children}
      {isHydrated &&
        createPortal(
          <div className="click-ripple-layer" aria-hidden="true" ref={rippleLayerRef} />,
          document.body
        )}
    </>
  );
}
