'use client'
import { useRef, useCallback } from 'react'

export function useTilt(intensity = 10) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current
      if (!el) return
      const { left, top, width, height } = el.getBoundingClientRect()
      const x = (e.clientX - left) / width  - 0.5  // -0.5 to 0.5
      const y = (e.clientY - top)  / height - 0.5
      el.style.transform = `perspective(1000px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg)`
    },
    [intensity],
  )

  const handleMouseLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)'
    }
  }, [])

  return { ref, handleMouseMove, handleMouseLeave }
}
