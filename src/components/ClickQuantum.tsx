"use client"

import { useRef, useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

type Particle = {
  cx: number;
  cy: number;
  x: number;
  y: number;
  timer: number;
  startTime: number;
};

type ClickQuantumProps = {
  strokeColor?: string;
  particleCount?: number;
  spreadRadius?: number;
  crossSize?: number;
  teleportInterval?: number;
  duration?: number;
  children?: ReactNode;
};

export default function ClickQuantum({
  strokeColor = '#fff',
  particleCount = 15,
  spreadRadius = 80,
  crossSize = 3,
  teleportInterval = 10,
  duration = 1500,
  children,
}: ClickQuantumProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animIdRef = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log('ClickQuantum mounted');
  }, []);

  // sync canvas to full viewport
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const syncSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    syncSize();
    window.addEventListener('resize', syncSize);
    return () => window.removeEventListener('resize', syncSize);
  }, [mounted]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log('Canvas not found');
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.log('Context not found');
      return;
    }

    console.log('Animation loop starting, canvas:', canvas.width, 'x', canvas.height);
    let animationRunning = true;

    const draw = (timestamp: number) => {
      if (!animationRunning) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (particlesRef.current.length > 0) {
        console.log('Drawing', particlesRef.current.length, 'particles');
        particlesRef.current = particlesRef.current.filter((p) => {
          const elapsed = timestamp - p.startTime;
          if (elapsed >= duration) return false;

          const progress = elapsed / duration;
          const alpha = Math.max(0, 1 - progress);

          p.timer--;
          if (p.timer <= 0) {
            p.x = p.cx + (Math.random() - 0.5) * spreadRadius;
            p.y = p.cy + (Math.random() - 0.5) * spreadRadius;
            p.timer = Math.random() * teleportInterval;
          }

          ctx.beginPath();
          ctx.moveTo(p.x - crossSize, p.y);
          ctx.lineTo(p.x + crossSize, p.y);
          ctx.moveTo(p.x, p.y - crossSize);
          ctx.lineTo(p.x, p.y + crossSize);
          ctx.lineWidth = 1;
          ctx.strokeStyle = strokeColor;
          ctx.globalAlpha = alpha;
          ctx.stroke();
          ctx.globalAlpha = 1;

          return true;
        });
      }

      animIdRef.current = requestAnimationFrame(draw);
    };

    animIdRef.current = requestAnimationFrame(draw);

    return () => {
      animationRunning = false;
      if (animIdRef.current !== null) cancelAnimationFrame(animIdRef.current);
    };
  }, [mounted, strokeColor, duration, crossSize, teleportInterval, spreadRadius]);

  // clientX/Y maps directly to fixed canvas — no rect offset needed
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const now = performance.now();

      const newParticles: Particle[] = Array.from(
        { length: particleCount },
        () => ({
          cx: e.clientX,
          cy: e.clientY,
          x: e.clientX,
          y: e.clientY,
          timer: Math.random() * teleportInterval,
          startTime: now,
        })
      );

      particlesRef.current.push(...newParticles);
    },
    [particleCount, teleportInterval]
  );

  // Add global click listener as fallback
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      console.log('Click detected at:', e.clientX, e.clientY);
      const now = performance.now();
      const newParticles: Particle[] = Array.from(
        { length: particleCount },
        () => ({
          cx: e.clientX,
          cy: e.clientY,
          x: e.clientX,
          y: e.clientY,
          timer: Math.random() * teleportInterval,
          startTime: now,
        })
      );
      console.log('Adding', newParticles.length, 'particles');
      particlesRef.current.push(...newParticles);
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, [particleCount, teleportInterval]);

  return (
    <>
      <div style={{ display: 'contents' }}>
        {children}
      </div>

      {mounted &&
        createPortal(
          <canvas
            ref={canvasRef}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              display: 'block',
              pointerEvents: 'none',
              zIndex: 9999,
            }}
          />,
          document.body
        )}
    </>
  );
}