<template>
  <section class="o-page">
    <div class="o-page__content">
      <LoginForm v-if="!isLoggedIn"></LoginForm>
      <LoginCard v-else></LoginCard>
    </div>
  </section>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'

export default {
  name: 'LoginPage',
  computed: {
    ...mapGetters('account', ['isLoggedIn']),
  },
}
</script>
