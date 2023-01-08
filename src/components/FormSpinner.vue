<template>
  <UiSpinner
    active
    :class="{
      'o-spinner': true,
      'is-visible': active,
    }"
    :style="{
      '--spinner-position': spinnerPosition,
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
    position: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      spinnerPosition: this.position,
    }
  },
})
</script>

<style lang="scss" scoped>
.o-spinner {
  position: var(--spinner-position, absolute);
  inset: 50% 0 0 50%;
  z-index: 10;
  transform: translate(-50%, -50%);
  transition-property: opacity, visibility;
  transition-duration: 350ms;
  transition-timing-function: cubic-bezier(0.79, 0.5, 1, 0.46);
  opacity: 0;
  visibility: hidden;

  &.is-visible {
    opacity: 1;
    visibility: visible;
  }
}
</style>
