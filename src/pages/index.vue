<template>
  <section class="o-page">
    <div class="o-page__content">
      <NuxtLogo class="o-logo"></NuxtLogo>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
})
</script>

<style lang="scss" scoped>
.o-logo {
  display: block;
  margin: 0 auto;
}
</style>
