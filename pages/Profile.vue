<template>
  <section class="o-page">
    <div class="o-page__content">
      <LoginCard></LoginCard>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: 'ProfilePage',
  middleware: 'onlyLoggedIn',
}
</script>
