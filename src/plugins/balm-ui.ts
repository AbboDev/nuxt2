import Vue from 'vue'
import BalmUI from 'balm-ui'
import BalmUIPlus from 'balm-ui/dist/balm-ui-plus'

type ToastMessage = string

interface ToastOptions {
  className?: string
  timeoutMs?: number
  message: ToastMessage
  position?: 'bottom' | 'center' | 'top'
}

declare module 'vue/types/vue' {
  interface Vue {
    $toast(options: ToastMessage | ToastOptions): Promise<void>
  }
}

Vue.use(BalmUI, {
  $theme: {
    primary: '#00dc82',
    'on-primary': '#F2FDF9',
    // surface: '#001E26',
    // 'on-surface': '#F2FDF9',
    background: '#001E26',
    secondary: '#99F1CD',
    'on-secondary': '#F2FDF9',
  },
})
Vue.use(BalmUIPlus)
