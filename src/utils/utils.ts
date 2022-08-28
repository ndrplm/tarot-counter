export type SumParam = {
  [index: string]: number
}

export function objSum(obj: SumParam) {
  const values = Object.values(obj)
  return values.reduce((acc, val) => acc + val)
}
