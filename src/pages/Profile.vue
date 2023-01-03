<template>
  <section class="o-page">
    <div class="o-page__content">
      <LoginCard></LoginCard>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ProfilePage',
  middleware: 'onlyLoggedIn',
})
</script>
