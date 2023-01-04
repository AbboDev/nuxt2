import { Plugin } from '@nuxt/types'
import { AxiosError } from 'axios'
import { useToast } from 'balm-ui'
import { AccountState } from '~/store/account'

const $toast = useToast()

const Axios: Plugin = ({ $axios, store }) => {
  $axios.onRequest((config) => {
    const token: string | null = (store.state.account as AccountState)?.token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    config.headers['Content-Type'] = 'application/json'
  })

  $axios.onError((error: AxiosError) => {
    $toast({
      message: error.message,
      className: 'is-error'
    })
  })
}

export default Axios
