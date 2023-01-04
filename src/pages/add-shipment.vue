<template>
  <section class="o-page">
    <div class="o-page__content">
      <ShipmentForm></ShipmentForm>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ShipmentPage',
  middleware: 'onlyLoggedIn',
})
</script>
