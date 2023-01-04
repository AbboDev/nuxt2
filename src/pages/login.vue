<template>
  <section class="o-page">
    <div class="o-page__content">
      <LoginForm>
        <UiDivider>o</UiDivider>

        <div>
          Non sei ancora registrato?
          <NuxtLink to="/registration">Registrati ora!</NuxtLink>
        </div>
      </LoginForm>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LoginPage',
  middleware: 'onlyGuest',
})
</script>
