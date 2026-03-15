'use client'
import dynamic from 'next/dynamic'
import { Loader2 } from 'lucide-react'

const BuildingScene = dynamic(() => import('./BuildingScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loader2 size={28} className="text-brand-coral animate-spin" />
        <p className="font-body text-white/30 text-xs">Loading 3D scene...</p>
      </div>
    </div>
  ),
})

export default function BuildingSceneLoader() {
  return <BuildingScene />
}
