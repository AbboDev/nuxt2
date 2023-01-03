<template>
  <NuxtLink :to="href" :class="className" @click="handleClick">
    <span
      v-if="hasRipple"
      :class="deprecatedListClassNameMap['mdc-list-item__ripple']"
    ></span>
    <slot name="before" :icon-class="UI_ITEM.cssClasses.firstTile"></slot>
    <slot>
      <!-- text content -->
    </slot>
    <slot name="after" :icon-class="UI_ITEM.cssClasses.lastTile"></slot>
  </NuxtLink>
</template>

<script>
import UiNavItem from 'balm-ui/src/scripts/components/list/nav-item.vue'
import Vue from 'vue'

export default Vue.extend({
  name: 'NuxtNavItem',
  extends: UiNavItem,
})
</script>
