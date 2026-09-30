'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface FolderContextType {
  activeFolder: string
  setActiveFolder: (id: string) => void
  getFolderColor: (id: string) => string
}

const FolderContext = createContext<FolderContextType | undefined>(undefined)

export const folderColors: Record<string, string> = {
  about: '#c9b3a0',
  photography: '#d4a8a0',
  postcards: '#c9a8a8',
  projects: '#d4a878',
  contact: '#c9a090',
}

export function FolderProvider({ children }: { children: ReactNode }) {
  const [activeFolder, setActiveFolder] = useState('about')

  const getFolderColor = (id: string) => folderColors[id] || '#000000'

  return (
    <FolderContext.Provider value={{ activeFolder, setActiveFolder, getFolderColor }}>
      {children}
    </FolderContext.Provider>
  )
}

export function useFolderContext() {
  const context = useContext(FolderContext)
  if (context === undefined) {
    throw new Error('useFolderContext must be used within a FolderProvider')
  }
  return context
}
