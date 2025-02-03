// Cursor
class Vec2 {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  add(other: Vec2): Vec2 {
    return new Vec2(this.x + other.x, this.y + other.y)
  }

  sub(other: Vec2): Vec2 {
    return new Vec2(this.x - other.x, this.y - other.y)
  }

  mult(scalar: number): Vec2 {
    return new Vec2(this.x * scalar, this.y * scalar)
  }

  div(scalar: number): Vec2 {
    return new Vec2(this.x / scalar, this.y / scalar)
  }

  mag(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  angle(): number {
    return Math.atan2(this.y, this.x)
  }

  rotate(angle: number): Vec2 {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    return new Vec2(this.x * cos - this.y * sin, this.x * sin + this.y * cos)
  }

  normalize(): Vec2 {
    const mag = this.mag()
    return mag === 0 ? new Vec2(0, 0) : this.div(mag)
  }

  limit(max: number): Vec2 {
    if (this.mag() > max) {
      return this.normalize().mult(max)
    }
    return new Vec2(this.x, this.y)
  }

  static rand(): Vec2 {
    return new Vec2(Math.random() * 2 - 1, Math.random() * 2 - 1)
  }

  clone(): Vec2 {
    return new Vec2(this.x, this.y)
  }
}

export default Vec2
