import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { RootState } from './index'
import {
  saveAccount,
  getToken,
  logout,
  saveToken,
  getAccount,
} from '@/utilities/account'

export const state = () => ({
  account: null as Account | null,
  token: null as string | null,
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
    const token: string = account.token
    const cleanAccount: Account = account

    // NOTE: viene rimosso il token a valle per avere solo i dati necessari dell'account
    // @ts-ignore
    delete cleanAccount.token

    commit('DO_LOGIN', cleanAccount)
    commit('REGISTER_TOKEN', token)

    // salva il token dentro il Web Storage
    saveToken(token, remember)
    saveAccount(cleanAccount, remember)
  },
  logout({ commit }) {
    commit('DO_LOGOUT')
  },
}

export const mutations: MutationTree<AccountState> = {
  REGISTER_TOKEN: (state, token: string) => {
    state.token = token
  },
  DO_LOGIN: (state, account: Account) => {
    state.account = account
  },
  DO_LOGOUT: (state) => {
    state.account = null
    state.token = null

    logout()
  },

  SETUP: (state) => {
    const token: string | null = getToken()
    // Check if the ID exists
    if (token) {
      // Replace the state object with the stored item
      state.token = token
    }

    const account: Account | null = getAccount()
    // Check if the ID exists
    if (account) {
      // Replace the state object with the stored item
      state.account = account
    }
  },
}
