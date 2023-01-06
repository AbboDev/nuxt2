<template>
  <UiSpinner
    active
    :class="{
      'o-spinner': true,
      'is-visible': active,
    }"
  ></UiSpinner>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss" scoped>
.o-spinner {
  position: absolute;
  inset: 50% 0 0 50%;
  transform: translate(-50%, -50%);
  transition-property: opacity, visibility;
  transition-duration: 350ms;
  transition-timing-function: cubic-bezier(.79,.5,1,.46);
  opacity: 0;
  visibility: hidden;

  &.is-visible {
    opacity: 1;
    visibility: visible;
  }
}
</style>
