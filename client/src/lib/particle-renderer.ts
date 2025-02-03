import * as PIXI from 'pixi.js'

import { Units } from '@/lib/use-normalized-units'
import { ShellParticle, SparkParticle, BaseParticle } from '@/lib/particle'
import { generateStarPoints } from '@/lib/shapes'

abstract class BaseParticleRenderer {
  context: PIXI.Graphics
  units: Units

  constructor(context: PIXI.Graphics, units: Units) {
    this.context = context
    this.units = units
  }

  abstract draw(particle: BaseParticle): void
}

export class ShellParticleRenderer extends BaseParticleRenderer {
  draw(particle: ShellParticle): void {
    const g = this.context
    const units = this.units

    // Fade in shell right as it starts
    const fadeInThreshold = 0.99
    const fadeInDuration = 0.2
    const alpha =
      particle.life >= fadeInThreshold
        ? 0
        : Math.min(1, (fadeInThreshold - particle.life) / fadeInDuration)

    // Draw trail
    if (particle.history.length > 1) {
      g.blendMode = PIXI.BLEND_MODES.ADD
      g.lineStyle({
        width: particle.size * 0.5,
        color: 0xffffff,
        alpha: alpha * 0.2,
        join: PIXI.LINE_JOIN.ROUND,
        cap: PIXI.LINE_CAP.ROUND,
      })
      const start = units.toScreen(particle.history[0])
      g.moveTo(start.x, start.y)
      for (let i = 1; i < particle.history.length; i++) {
        const point = units.toScreen(particle.history[i])
        g.lineTo(point.x, point.y)
      }
    }

    // Draw shell
    g.beginFill(0xffffff, alpha)
    const screenPos = units.toScreen(particle.pos)
    g.drawCircle(screenPos.x, screenPos.y, particle.size)
    g.endFill()
  }
}

export class SparkParticleRenderer extends BaseParticleRenderer {
  draw(particle: SparkParticle): void {
    const g = this.context
    const units = this.units

    // Fade out sparks as they die
    const fadeStartLife = 0.8
    const alpha =
      particle.life > fadeStartLife
        ? 1.0
        : Math.pow(particle.life / fadeStartLife, 1.5)

    // Draw trail
    if (particle.history.length > 1) {
      g.blendMode = PIXI.BLEND_MODES.ADD
      g.lineStyle({
        width: particle.size * 0.5,
        color: 0xffffff,
        alpha: alpha * 0.2,
        join: PIXI.LINE_JOIN.ROUND,
        cap: PIXI.LINE_CAP.ROUND,
      })
      const start = units.toScreen(particle.history[0])
      g.moveTo(start.x, start.y)
      for (let i = 1; i < particle.history.length; i++) {
        const point = units.toScreen(particle.history[i])
        g.lineTo(point.x, point.y)
      }
    }

    // Draw star
    g.beginFill(0xffffff, alpha)
    const screenPos = units.toScreen(particle.pos)
    const starPoints = generateStarPoints(
      screenPos.x,
      screenPos.y,
      4,
      particle.size + 0.5,
      particle.size,
      particle.lifetime * 10,
    )
    g.drawPolygon(starPoints)
    g.endFill()
  }
}
