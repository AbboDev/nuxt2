export {}

declare global {
  type Account = {
    id: number
    username: string
    email: string
    firstName: string
    lastName: string
    gender: string
    image: string
  }

  type LoginResponse = Account & {
    token: string
  }
}
