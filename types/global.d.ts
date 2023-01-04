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

  type LoginAccount = Account & {
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

  type Coordinate = {
    lat: number | null
    lng: number | null
  }

  type ServerAddress = {
    address: string
    city: string
    coordinates: Coordinate
    postalCode: string
    state: string
  }

  type ServerCompany = {
    address: ServerAddress
    department: string
    name: string
    title: string
  }

  type ServerBank = {
    cardExpire: string
    cardNumber: string
    cardType: string
    currency: string
    iban: string
  }

  type ServerHair = {
    color: string
    type: string
  }

  type RegisterResponse = Account & {
    phone: string
    birthplace: string
    // birthplace: Address
    birthDate: string
  }

  type UserResponse = LoginAccount & {
    maidenName: string
    age: null | number
    phone: string
    password: string
    birthDate: string
    bloodGroup: string
    height: null | number
    weight: null | number
    eyeColor: string
    hair: ServerHair
    domain: string
    ip: string
    address: ServerAddress
    macAddress: string
    university: string
    bank: ServerBank
    company: ServerCompany
    ein: string
    ssn: string
    userAgent: string
  }

  type UiSelectValue = {
    value: number | string
    label: string
    meta?: Record<string, any>
  }

  type Region = {
    id: number
    nome: string
    latitudine: number
    longitudine: number
  }

  type Province = {
    nome: string
    sigla: string
    regionId: number
  }

  type ItalyIdentifier = {
    nome: string
    codice: string
  }

  type City = ItalyIdentifier & {
    zona: ItalyIdentifier
    regione: ItalyIdentifier
    provincia: ItalyIdentifier
    sigla: string
    codiceCatastale: string
    cap: string[]
    popolazione: number
  }

  type Post = {
    id: number
    title: string
    body: string
    userId: number
    tags?: string[]
    reactions: number
  }

  type PostsPagination = {
    posts: Post[]
    total: number
    skip: number
    limit: number
  }
}
