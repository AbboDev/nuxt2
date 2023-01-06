<template>
  <NuxtLink
    :to="href"
    :class="[className, cardActionClassName]"
    @click="handleClick"
  >
    <div class="mdc-icon-button__ripple"></div>
    <!-- Icon -->
    <template v-if="toggleButton">
      <i
        :class="getIconClassName(UI_ICON_BUTTON.cssClasses.off)"
        v-text="toggle.off"
      ></i>
      <i
        :class="getIconClassName(UI_ICON_BUTTON.cssClasses.on)"
        v-text="toggle.on"
      ></i>
    </template>
    <template v-else>
      <slot
        :on-class="UI_ICON_BUTTON.cssClasses.on"
        :off-class="UI_ICON_BUTTON.cssClasses.off"
        >{{ icon }}</slot
      >
    </template>
  </NuxtLink>
</template>

<script>
import UiIconButton from 'balm-ui/src/scripts/components/icon-button/icon-button.vue'
import Vue from 'vue'

export default Vue.extend({
  name: 'NuxtIconButton',
  extends: UiIconButton,
  props: {
    href: {
      type: String,
      required: true,
    },
  },
})
</script>
