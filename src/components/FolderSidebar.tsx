'use client'

import { useEffect, useRef } from 'react'
import { useFolderContext } from '@/context/FolderContext'

interface FolderItem {
  id: string
  label: string
  number: string
  bgColor: string
}

const FOLDER_ITEMS: FolderItem[] = [
  { id: 'about', label: 'About', number: '01', bgColor: '#c9b3a0' },
  { id: 'photography', label: 'Photography', number: '02', bgColor: '#d4a8a0' },
  { id: 'postcards', label: 'Postcards', number: '03', bgColor: '#c9a8a8' },
  { id: 'projects', label: 'Projects', number: '04', bgColor: '#d4a878' },
  { id: 'contact', label: 'Contact', number: '05', bgColor: '#c9a090' },
]

// Paper grain SVG pattern
const GRAIN_SVG = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .22 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`

export default function FolderSidebar() {
  const { activeFolder, setActiveFolder, getFolderColor } = useFolderContext()
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  // Generate two clip-path shapes: resting (pulled inward) and selected (expanded outward)
  const generateOutline = (W: number, H: number, dx: number, dy: number, f: number = 12) => {
    const X = W - dx
    const T = dy
    const B = H - dy

    return `path('M0,${T} Q0,${T + f} 10,${T + f} L${X - 8},${T + f + 10} Q${X},${T + f + 13} ${X},${T + f + 21} L${X},${B - f - 21} Q${X},${B - f - 13} ${X - 8},${B - f - 10} L10,${B - f} Q0,${B - f} 0,${B} Z')`
  }

  const generateShape = (tab: HTMLButtonElement) => {
    const W = tab.offsetWidth + 7
    const H = tab.offsetHeight + 32

    const restingShape = generateOutline(W, H, 7, 4) // pulled inward
    const selectedShape = generateOutline(W, H, 0, 0) // expanded outward

    tab.style.setProperty('--shape', restingShape)
    tab.style.setProperty('--shape-on', selectedShape)
  }

  useEffect(() => {
    const tabs = tabRefs.current.filter(Boolean) as HTMLButtonElement[]

    const updateShapes = () => {
      tabs.forEach((tab) => {
        generateShape(tab)
      })
    }

    updateShapes()

    const observer = new ResizeObserver(() => {
      updateShapes()
    })

    tabs.forEach((tab) => observer.observe(tab))

    // Trigger shape update after fonts load
    if (document.fonts) {
      document.fonts.ready.then(() => tabs.forEach(generateShape))
    }

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        .folder-tab {
          --shape: none;
          --shape-on: none;
          --tab-color: #ccc;
        }
        .folder-tab::after {
          content: '';
          position: absolute;
          z-index: -1;
          top: -16px;
          bottom: -16px;
          left: 0;
          right: -7px;
          background-color: var(--tab-color);
          background-image: url("${GRAIN_SVG}");
          background-repeat: repeat;
          background-size: 160px 160px;
          background-attachment: fixed;
          clip-path: var(--shape, none);
          transition: clip-path 200ms cubic-bezier(0.22, 1, 0.36, 1), background-color 0s;
        }
        .folder-tab[data-selected="true"]::after {
          clip-path: var(--shape-on, none);
        }
      `}</style>

      {/* Sidebar background */}
      <div
        className="fixed left-0 top-0 bottom-0 z-30 transition-colors duration-500"
        style={{
          width: '70px',
          backgroundColor: getFolderColor(activeFolder),
          backgroundImage: `url("${GRAIN_SVG}")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '160px 160px',
          boxShadow: '4px 0 14px rgba(0,0,0,.45)',
        }}
      />

      {/* Folder Divider Tabs */}
      <ul
        className="fixed left-0 top-0 bottom-0 z-40 m-0 p-0 list-none flex flex-col justify-center pointer-events-none"
        style={{
          width: '70px',
          gap: '26px',
        }}
      >
        {FOLDER_ITEMS.map((folder, index) => (
          <li key={folder.id} className="relative flex">
            {/* Dot indicator on sidebar */}
            <div
              className="absolute"
              style={{
                left: '31px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '3px',
                height: '3px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0,0,0,.45)',
              }}
            />

            {/* Tab button */}
            <button
              ref={(el) => {
                tabRefs.current[index] = el
              }}
              onClick={() => setActiveFolder(folder.id)}
              className="folder-tab pointer-events-auto relative border-0 focus:outline-none isolation-isolate"
              data-selected={activeFolder === folder.id}
              style={{
                marginLeft: 'calc(100% - 1px)',
                padding: '28px 15px 28px 10px',
                backgroundColor: 'transparent',
                // @ts-ignore
                '--tab-color': folder.bgColor,
                color: '#2a2b29',
                fontSize: '13px',
                fontWeight: 500,
                fontFamily: '"Barlow Condensed", "Arial Narrow", Arial, sans-serif',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                writingMode: 'vertical-rl',
                cursor: 'pointer',
                filter: 'drop-shadow(3px 0 3px rgba(0,0,0,.4))',
                transition: 'filter 200ms',
                zIndex: activeFolder === folder.id ? 50 : 40 - index,
                lineHeight: 1,
              }}
              onMouseEnter={(e) => {
                if (activeFolder !== folder.id) {
                  e.currentTarget.style.filter = 'drop-shadow(3px 0 3px rgba(0,0,0,.4)) brightness(1.05)'
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'drop-shadow(3px 0 3px rgba(0,0,0,.4))'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <span style={{ fontSize: '11px' }}>({folder.number})</span>
                <span style={{ fontSize: '10px' }}>{folder.label}</span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}
