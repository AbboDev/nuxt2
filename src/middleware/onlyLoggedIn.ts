import { Middleware } from '@nuxt/types'
import { AccountState } from '@/store/account'

const middleware: Middleware = ({ store, redirect }) => {
  // The token is stored in the browser
  const isLoggedIn = (store.state.account as AccountState)?.token

  // If the user is not authenticated
  if (!isLoggedIn) {
    return redirect('/login')
  }
}

export default middleware
