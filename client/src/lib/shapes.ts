// Cursor
export function generateStarPoints(
  x: number,
  y: number,
  points: number,
  outerRadius: number,
  innerRadius: number,
  rotation: number = 0,
): number[] {
  const starPoints: number[] = []
  for (let i = 0; i < points * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius
    const angle = (i * Math.PI) / points + rotation
    starPoints.push(x + radius * Math.cos(angle), y + radius * Math.sin(angle))
  }
  return starPoints
}
