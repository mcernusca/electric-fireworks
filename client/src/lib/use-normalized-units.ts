import { useState, useEffect } from 'react'

import Vec2 from '@/lib/vec2'
import useWindowDimensions from '@/lib/use-window-dimensions'

interface Viewport {
  width: number
  height: number
  aspectRatio: number
  center: { x: number; y: number }
}

const useNormalizedUnits = () => {
  const dimensions = useWindowDimensions()
  const [viewport, setViewport] = useState<Viewport>({
    width: dimensions.width,
    height: dimensions.height,
    aspectRatio: dimensions.width / dimensions.height,
    center: { x: 0, y: 0 },
  })

  useEffect(() => {
    setViewport({
      width: dimensions.width,
      height: dimensions.height,
      aspectRatio: dimensions.width / dimensions.height,
      center: { x: 0, y: 0 },
    })
  }, [dimensions.width, dimensions.height])

  const units = {
    // Convert from normalized space (-1 to 1) to screen pixels
    toScreen: (pos: Vec2) => {
      const scale = Math.min(viewport.width, viewport.height) / 2
      return {
        x: (pos.x + 1) * scale + (viewport.width - scale * 2) / 2,
        y: (-pos.y + 1) * scale + (viewport.height - scale * 2) / 2,
      }
    },

    // Convert from screen pixels to normalized space
    toWorld: (pos: Vec2) => {
      const scale = Math.min(viewport.width, viewport.height) / 2
      return {
        x: (pos.x - (viewport.width - scale * 2) / 2) / scale - 1,
        y: -((pos.y - (viewport.height - scale * 2) / 2) / scale - 1),
      }
    },

    viewport: {
      // Normalized viewport is always square and centered
      width: 2,
      height: 2,
      aspectRatio: viewport.aspectRatio,
      center: { x: 0, y: 0 },
    },

    screen: {
      width: dimensions.width,
      height: dimensions.height,
    },
  }

  return units
}

export type Units = ReturnType<typeof useNormalizedUnits>

export default useNormalizedUnits
