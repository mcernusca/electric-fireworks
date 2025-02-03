// Random integer between min and max (inclusive)
export function randomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
}

// Random float between min and max (inclusive)
export function randomFloat(min: number, max: number) {
  return min + Math.random() * (max - min + Number.EPSILON)
}

// Cluster around the middle of the range
export function randomFloatBell(min: number, max: number) {
  return (
    (randomFloat(min, max) + randomFloat(min, max) + randomFloat(min, max)) / 3
  )
}

// Remap a value from one range to another
export function remap(
  value: number,
  min: number,
  max: number,
  newMin: number,
  newMax: number,
) {
  return ((value - min) / (max - min)) * (newMax - newMin) + newMin
}
