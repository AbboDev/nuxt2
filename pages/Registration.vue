<template>
  <section class="o-page">
    <div class="o-page__content">
      <RegisterForm>
        <UiDivider>o</UiDivider>

        <div>
          Hai già un account?
          <NuxtLink to="/login">Effettua il login!</NuxtLink>
        </div>
      </RegisterForm>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: 'RegistrationPage',
}
</script>
