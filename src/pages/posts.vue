<template>
  <section class="o-page">
    <div class="o-page__content">
      <NuxtChild></NuxtChild>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'PostsPage',
  middleware: 'onlyLoggedIn',
})
</script>
