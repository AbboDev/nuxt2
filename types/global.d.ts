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
  }

  type LoginAccount =
    | Account
    | {
        image: string
      }

  type LoginResponse = Account & {
    token: string
  }

  type Address = {
    address: string
    civic: null | number
    region: string
    province: string
    city: string
    zip: number
  }

  type RegisterResponse = Account & {
    age: number
    phone: string
    birthplace: string
    // birthplace: Address
    birthDate: string
  }
}
