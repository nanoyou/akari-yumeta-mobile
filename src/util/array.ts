export const arrayEquals = <T>(a: T[], b: T[]): boolean => {
  if (a.length !== b.length) return false
  return a.every((v, i) => v === b[i])
}
