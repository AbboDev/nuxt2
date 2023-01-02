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
export default {
  name: 'LoginPage',
}
</script>
