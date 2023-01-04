<template>
  <section class="o-page">
    <div class="o-page__content" :style="{ textAlign: 'center' }">
      <template v-if="error.statusCode === 404">
        <h1>404</h1>
        <h2>Pagina non trovata</h2>
      </template>
      <template v-else>
        <h1>Oh no!</h1>
        <h2>Qualcosa è andato storto :(</h2>
      </template>

      <NuxtLink v-button.raised to="/" class="o-home-button">
        <span>Torna alla Home</span>

        <UiIcon>home</UiIcon>
      </NuxtLink>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'error',
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
})
</script>

<style lang="scss">
.o-home-button {
  .mdc-button__label {
    display: flex;
    align-items: center;

    .material-icons {
      margin-left: 8px;
    }
  }
}
</style>
