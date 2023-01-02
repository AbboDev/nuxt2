export function saveLogin(token: string, remember = false): void {
  const storage: Storage = !remember ? sessionStorage : localStorage

  storage.setItem('token', token)
}

export function getLogin(): string | null {
  let token: string | null = sessionStorage.getItem('token')

  if (!token) {
    token = localStorage.getItem('item')
  }

  return token
}

export function logout(): void {
  sessionStorage.removeItem('token')
  localStorage.removeItem('token')
}
