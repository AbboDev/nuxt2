import { Plugin } from '@nuxt/types'

const nuxtClientInit: Plugin = async (context) => {
  await context.store.commit('account/SETUP', context)
}

export default nuxtClientInit
