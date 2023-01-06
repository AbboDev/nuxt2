import Vue from 'vue'

export default Vue.extend({
  methods: {
    doLogout(): void {
      this.$store.dispatch('account/logout').then(() => {
        this.$router.push('/login')
      })
    },
  },
})
