import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { RootState } from './index'
import { logout, saveLogin } from '@/utilities/token'

export const state = () => ({
  account: null as Account | null,
})

export type AccountState = ReturnType<typeof state>

export const getters: GetterTree<AccountState, RootState> = {
  isLoggedIn(state): boolean {
    return state.account !== null && state.account?.id !== null
  },
  fullName(state, getters): string | boolean {
    if (!getters.isLoggedIn) {
      return false
    }

    return `${state.account?.firstName} ${state.account?.lastName}`
  },
}

export const actions: ActionTree<AccountState, RootState> = {
  login({ commit }, { account, remember = false }) {
    const cleanAccount: Account = account

    // NOTE: viene rimosso il token a valle per avere solo i dati necessari dell'account
    // @ts-ignore
    delete cleanAccount.token

    commit('DO_LOGIN', cleanAccount)

    // salva il token dentro il Web Storage
    saveLogin(account.token, remember)
  },
  logout({ commit }) {
    commit('DO_LOGOUT')

    logout()
  },
}

export const mutations: MutationTree<AccountState> = {
  DO_LOGIN: (state, account: Account) => {
    state.account = account
  },
  DO_LOGOUT: (state) => {
    state.account = null
  },
}
