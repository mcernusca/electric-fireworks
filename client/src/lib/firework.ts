import Vec2 from '@/lib/vec2'
import { ShellParticle, SparkParticle } from '@/lib/particle'
import { randomInt, randomFloatBell } from '@/lib/util'

const MAX_PARTICLES = 400
const MIN_PARTICLES = 200

class Firework {
  sparks: SparkParticle[]
  shell: ShellParticle
  didExplode: boolean

  constructor(magnitude: number, angle: number) {
    this.sparks = []

    const rad = angle * (Math.PI / 180)

    const velocityX = magnitude * 2 * Math.sin(rad - Math.PI / 2)
    const velocityY = magnitude * 2 * Math.cos(rad - Math.PI / 2)

    this.shell = new ShellParticle(0, -1, 1.5, new Vec2(velocityX, velocityY))
    this.didExplode = false
  }

  get isDone() {
    return this.didExplode && this.sparks.every((spark) => spark.isDone)
  }

  update(deltaSeconds: number, gravity: Vec2) {
    if (this.didExplode) {
      this.sparks.forEach((spark) => spark.update(deltaSeconds, gravity))
    } else {
      this.shell.update(deltaSeconds, gravity)
      const didPeak = this.shell.vel.y <= 0.1
      if (didPeak) {
        this.didExplode = true
        this.sparks = Array.from(
          { length: randomInt(MIN_PARTICLES, MAX_PARTICLES) },
          () =>
            new SparkParticle(
              this.shell.pos.x,
              this.shell.pos.y,
              randomFloatBell(1, 2),
              this.shell.initialVelocity,
            ),
        )
      }
    }
  }
}

export default Firework
