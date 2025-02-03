import Vec2 from '@/lib/vec2'
import { randomFloat } from '@/lib/util'

const TRAIL_LENGTH = 40

export abstract class BaseParticle {
  pos: Vec2
  vel: Vec2
  acc: Vec2
  size: number
  lifetime: number
  maxLifetime: number
  history: Vec2[]

  constructor(
    x: number,
    y: number,
    size: number,
    vel: Vec2,
    maxLifetime: number,
  ) {
    this.pos = new Vec2(x, y)
    this.vel = vel
    this.acc = new Vec2(0, 0)
    this.size = size
    this.maxLifetime = maxLifetime
    this.lifetime = this.maxLifetime
    this.history = []
  }

  accelerate(acceleration: Vec2) {
    this.acc = this.acc.add(acceleration)
  }

  update(deltaSeconds: number, gravity: Vec2) {
    this.lifetime -= deltaSeconds
    this.accelerate(gravity)
    this.vel = this.vel.add(this.acc.mult(deltaSeconds))
    this.pos = this.pos.add(this.vel.mult(deltaSeconds))
    this.acc = this.acc.mult(0)

    this.history.unshift(this.pos.clone())
    if (this.history.length > TRAIL_LENGTH) {
      this.history.pop()
    }
  }

  get life(): number {
    return this.lifetime / this.maxLifetime
  }

  get isDone() {
    return this.lifetime <= 0
  }
}

export class ShellParticle extends BaseParticle {
  initialVelocity: Vec2

  constructor(x: number, y: number, size: number, vel: Vec2) {
    super(x, y, size, vel, 10) // 0 , 1.8
    this.initialVelocity = vel
  }

  update(deltaSeconds: number, gravity: Vec2) {
    super.update(deltaSeconds, gravity)
  }
}

export class SparkParticle extends BaseParticle {
  private originalSize: number

  // Cursor assisted
  constructor(x: number, y: number, size: number, initialVelocity: Vec2) {
    // Scale based on velocity ranges
    const normalizedVel = Math.max(
      (initialVelocity.mag() - 1.5) / (2.0 - 1.5),
      0.2,
    )
    const minSpeed = 0.15 + 0.25 * normalizedVel
    const maxSpeed = 0.3 + 0.5 * normalizedVel
    const baseSpeed =
      (randomFloat(minSpeed, maxSpeed) + randomFloat(minSpeed, maxSpeed)) *
      (2 + randomFloat(-0.1, 0.1))
    const angleJitter = 0.9 * normalizedVel

    const angle = initialVelocity.angle()
    const shouldRotate = Math.abs(Math.abs(angle) - Math.PI / 2) > 0.1

    // Base horizontal angle around the velocity direction
    const horizontalAngle =
      Math.random() * Math.PI * 2 + randomFloat(-angleJitter, angleJitter)

    // Vertical angle only in upper hemisphere with scaled jitter
    const verticalAngle =
      Math.acos(randomFloat(-1, 0)) + randomFloat(-angleJitter, angleJitter)

    const verticalBias =
      0.3 *
      (1 - Math.abs(verticalAngle) / Math.PI) *
      (1 + randomFloat(-0.1, 0.1))

    const vel = new Vec2(
      Math.cos(horizontalAngle) *
        Math.sin(verticalAngle) *
        baseSpeed *
        (1 + randomFloat(-angleJitter, angleJitter)),
      -Math.cos(verticalAngle) * baseSpeed -
        verticalBias * (1 + randomFloat(-angleJitter, angleJitter)),
    )

    // Rotate based on initial velocity direction
    const finalVel = shouldRotate ? vel.rotate(angle - Math.PI / 2) : vel

    super(x, y, size, finalVel, randomFloat(1, 2))
    this.originalSize = size
  }

  update(deltaSeconds: number, gravity: Vec2) {
    // Add air resistance - particles slow down over time
    const drag = 0.95
    this.vel = this.vel.mult(Math.pow(drag, deltaSeconds * 60))

    super.update(deltaSeconds, gravity.mult(0.6))

    // Reduce particle size as it burns out
    this.size = this.originalSize * (0.3 + 0.7 * this.life)
  }
}
