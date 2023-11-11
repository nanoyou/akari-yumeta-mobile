export const hashStr = (key: string, len: number): number => {
  return (
    key
      .split('')
      .map((ch) => ch.charCodeAt(0))
      .reduce((a, b) => a + b, 0) % len
  )
}
