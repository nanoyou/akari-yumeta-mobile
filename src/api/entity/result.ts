export interface Result<T> {
  ok: boolean
  code: number
  message: string
  data: T
}
