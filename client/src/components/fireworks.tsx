import { useMemo, useRef, useEffect, useCallback } from 'react'
import * as PIXI from 'pixi.js'
import { AdvancedBloomFilter } from '@pixi/filter-advanced-bloom'
import { Graphics, useTick } from '@pixi/react'

import Firework from '@/lib/firework'
import { Units } from '@/lib/use-normalized-units'
import Vec2 from '@/lib/vec2'
import {
  ShellParticleRenderer,
  SparkParticleRenderer,
} from '@/lib/particle-renderer'

const Fireworks = (props: {
  units: Units
  gravity: Vec2
  fireworks: Firework[]
}) => {
  const bloomFilter = useMemo(
    () =>
      new AdvancedBloomFilter({
        bloomScale: 1.5,
        brightness: 2,
        threshold: 0.15,
        quality: 4,
      }),
    [],
  )
  const graphicsRef = useRef<PIXI.Graphics | null>(null)
  const shellRendererRef = useRef<ShellParticleRenderer | null>(null)
  const sparkRendererRef = useRef<SparkParticleRenderer | null>(null)

  useEffect(() => {
    if (graphicsRef.current) {
      shellRendererRef.current = new ShellParticleRenderer(
        graphicsRef.current,
        props.units,
      )
      sparkRendererRef.current = new SparkParticleRenderer(
        graphicsRef.current,
        props.units,
      )
    }
  }, [props.units])

  const drawParticles = useCallback((activeFireworks: Firework[]) => {
    const g = graphicsRef.current
    if (g) {
      g.clear()

      activeFireworks.forEach((firework) => {
        if (firework.didExplode) {
          firework.sparks.forEach((spark) =>
            sparkRendererRef.current?.draw(spark),
          )
        } else {
          shellRendererRef.current?.draw(firework.shell)
        }
      })
    }
  }, [])

  useTick((delta) => {
    // The delta value seems to be normalized to represent roughly 1.0 at 60 FPS
    const deltaSeconds = delta / 60
    const activeFireworks = props.fireworks.filter(
      (firework) => !firework.isDone,
    )

    activeFireworks.forEach((firework) => {
      firework.update(deltaSeconds, props.gravity)
    })

    if (graphicsRef.current) {
      drawParticles(activeFireworks)
    }
  })

  return <Graphics ref={graphicsRef} filters={[bloomFilter]} />
}

export default Fireworks
