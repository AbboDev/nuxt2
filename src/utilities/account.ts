const getStorage = (remember = false): Storage => {
  return !remember ? sessionStorage : localStorage
}

const STORAGE_TOKEN = 'token'
const STORAGE_ACCOUNT = 'account'

export function saveToken(token: string, remember = false): void {
  const storage: Storage = getStorage(remember)

  storage.setItem(STORAGE_TOKEN, token)
}

export function saveAccount(account: Account, remember = false): void {
  const storage: Storage = getStorage(remember)

  storage.setItem(STORAGE_ACCOUNT, JSON.stringify(account))
}

export function getToken(): string | null {
  let token: string | null = sessionStorage.getItem(STORAGE_TOKEN)

  if (!token) {
    token = localStorage.getItem(STORAGE_TOKEN)
  }

  return token
}

export function getAccount(): Account | null {
  let account: string | null = sessionStorage.getItem(STORAGE_ACCOUNT)

  if (!account) {
    account = localStorage.getItem(STORAGE_ACCOUNT)
  }

  if (!account) {
    return null
  }

  return JSON.parse(account) as Account
}

export function logout(): void {
  sessionStorage.removeItem(STORAGE_TOKEN)
  localStorage.removeItem(STORAGE_TOKEN)

  sessionStorage.removeItem(STORAGE_ACCOUNT)
  localStorage.removeItem(STORAGE_ACCOUNT)
}
