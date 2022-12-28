import Vue from 'vue'
import BalmUI from 'balm-ui'
import BalmUIPlus from 'balm-ui/dist/balm-ui-plus'

Vue.use(BalmUI, {
  $theme: {
    primary: '#00dc82',
    'on-primary': '#F2FDF9',
    surface: '#F2FDF9',
    'on-surface': '#001E26',
    background: '#001E26',
    secondary: '#99F1CD',
    'on-secondary': '#F2FDF9',
  },
})
Vue.use(BalmUIPlus)
