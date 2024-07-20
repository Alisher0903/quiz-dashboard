export interface Auth {
  email: string
  password: string
  setEmail(val: string): void
  setPassword(val: string): void
}