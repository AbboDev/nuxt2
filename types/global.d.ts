export {}

declare global {
  enum Gender {
    MALE = 'male',
    FEMALE = 'female',
  }

  type Account = {
    id: number
    username: string
    email: string
    firstName: string
    lastName: string
    gender: Gender
    image: string
  }

  type LoginResponse = Account & {
    token: string
  }
}
